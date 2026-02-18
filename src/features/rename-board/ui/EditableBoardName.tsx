// src/features/rename-board/ui/EditableBoardName.tsx
import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { renameBoard } from '@/entities/board';

interface Props {
  boardId: number;
  initialName: string;
  onUpdateSuccess?: () => void;
}

export const EditableBoardName = ({ boardId, initialName, onUpdateSuccess }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleUpdate = async () => {
    const trimmedValue = value.trim();
    if (!trimmedValue || trimmedValue === initialName) {
      setValue(initialName);
      setIsEditing(false);
      return;
    }

    try {
      await renameBoard(boardId, trimmedValue);
      setIsEditing(false);
      onUpdateSuccess?.(); 
    } catch (error) {
      alert('보드 이름 수정에 실패했습니다.');
      setValue(initialName);
      setIsEditing(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleUpdate();
    if (e.key === 'Escape') {
      setValue(initialName);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleUpdate}
        onKeyDown={onKeyDown}
        style={editInputStyle}
      />
    );
  }

  return (
    <h1 
      style={titleStyle} 
      onDoubleClick={() => setIsEditing(true)} 
      title="더블 클릭하여 수정"
    >
      {value}
    </h1>
  );
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
};

const editInputStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  border: '2px solid #3b82f6',
  borderRadius: '4px',
  outline: 'none',
  padding: '2px 6px',
};