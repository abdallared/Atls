import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, ListOrdered, Heading2, Table } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  dir?: 'rtl' | 'ltr';
}

const RichTextEditor = ({ content, onChange, placeholder, dir = 'rtl' }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isUpdatingRef.current && content !== editorRef.current.innerHTML) {
      const selection = window.getSelection();
      const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
      const startOffset = range?.startOffset;
      const startContainer = range?.startContainer;

      editorRef.current.innerHTML = content || '';

      // Restore cursor position
      if (startContainer && startOffset !== undefined) {
        try {
          const newRange = document.createRange();
          newRange.setStart(startContainer, startOffset);
          newRange.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(newRange);
        } catch (e) {
          // Ignore errors in cursor restoration
        }
      }
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      isUpdatingRef.current = true;
      onChange(editorRef.current.innerHTML);
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 0);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertTable = () => {
    if (!editorRef.current) return;

    const rows = prompt('عدد الصفوف:', '3');
    const cols = prompt('عدد الأعمدة:', '3');
    
    if (!rows || !cols) return;

    const numRows = parseInt(rows);
    const numCols = parseInt(cols);

    if (isNaN(numRows) || isNaN(numCols) || numRows < 1 || numCols < 1) {
      alert('الرجاء إدخال أرقام صحيحة');
      return;
    }

    let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%; margin: 1em 0;"><tbody>';
    
    for (let i = 0; i < numRows; i++) {
      tableHTML += '<tr>';
      for (let j = 0; j < numCols; j++) {
        if (i === 0) {
          tableHTML += '<th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5; font-weight: bold;">عنوان</th>';
        } else {
          tableHTML += '<td style="border: 1px solid #ddd; padding: 8px;">خلية</td>';
        }
      }
      tableHTML += '</tr>';
    }
    
    tableHTML += '</tbody></table><p><br></p>';

    // Insert at the end
    const currentContent = editorRef.current.innerHTML;
    editorRef.current.innerHTML = currentContent + tableHTML;
    handleInput();
    editorRef.current?.focus();
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-muted/50 border-b p-2 flex flex-wrap gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('bold')}
          className="h-8 w-8 p-0"
          title="Bold"
        >
          <Bold size={16} />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('italic')}
          className="h-8 w-8 p-0"
          title="Italic"
        >
          <Italic size={16} />
        </Button>

        <div className="w-px h-8 bg-border mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('formatBlock', '<h2>')}
          className="h-8 w-8 p-0"
          title="Heading"
        >
          <Heading2 size={16} />
        </Button>

        <div className="w-px h-8 bg-border mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('insertUnorderedList')}
          className="h-8 w-8 p-0"
          title="Bullet List"
        >
          <List size={16} />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('insertOrderedList')}
          className="h-8 w-8 p-0"
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </Button>

        <div className="w-px h-8 bg-border mx-1" />

        {/* Table Button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertTable}
          className="h-8 w-8 p-0"
          title="Insert Table"
        >
          <Table size={16} />
        </Button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        suppressContentEditableWarning
        className="min-h-[150px] p-3 focus:outline-none bg-background"
        dir={dir}
        data-placeholder={placeholder}
        style={{
          whiteSpace: 'pre-wrap',
        }}
      />
    </div>
  );
};

export default RichTextEditor;
