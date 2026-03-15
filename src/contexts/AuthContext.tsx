import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; reason?: "invalid_credentials" | "email_not_confirmed" | "not_admin"; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; isAdmin: boolean; needsEmailConfirmation: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdmin = useCallback(async (userId: string) => {
    const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    setIsAdmin(!!data);
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Restore session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      if (session?.user) {
        // Fire and forget - don't block
        supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" }).then(({ data }) => {
          if (isMounted) {
            setIsAdmin(!!data);
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes - NO async operations here
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session: Session | null) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      if (!session?.user) {
        setIsAdmin(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      const message = error?.message || "";
      if (message.toLowerCase().includes("email not confirmed")) {
        return { success: false, reason: "email_not_confirmed", error: message };
      }
      return { success: false, reason: "invalid_credentials", error: message };
    }

    const { data: adminData, error: adminError } = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
    if (adminError || !adminData) {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      return { success: false, reason: "not_admin" };
    }

    setUser(data.user);
    setIsAdmin(true);
    return { success: true };
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return { success: false, isAdmin: false, needsEmailConfirmation: false, error: error.message };
    }

    const createdUser = data.user;
    if (!createdUser) {
      return { success: true, isAdmin: false, needsEmailConfirmation: true };
    }

    const { data: adminData } = await supabase.rpc("has_role", { _user_id: createdUser.id, _role: "admin" });
    const isAdminUser = !!adminData;

    if (data.session?.user) {
      setUser(data.session.user);
      setIsAdmin(isAdminUser);
    }

    return {
      success: true,
      isAdmin: isAdminUser,
      needsEmailConfirmation: !data.session,
    };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, isAdmin, user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
