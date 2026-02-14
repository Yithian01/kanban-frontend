// src/features/update-section/ui/EditableSectionName.tsx
import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { renameSection } from '@/entities/section/api/sectionApi';

interface Props {
  boardId: number;
  sectionId: number;
  initialName: string;
  onUpdateSuccess?: (newName: string) => void;
}

export const EditableSectionName = ({ boardId, sectionId, initialName, onUpdateSuccess }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleUpdate = async () => {
    const trimmedValue = value.trim();
    
    // 값이 비어있거나 기존과 같으면 취소
    if (!trimmedValue || trimmedValue === initialName) {
      setValue(initialName);
      setIsEditing(false);
      return;
    }

    try {
      await renameSection(boardId, sectionId, trimmedValue);
      setIsEditing(false);
      onUpdateSuccess?.(trimmedValue);
    } catch (error) {
      alert('이름 수정에 실패했습니다.');
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
    <h2 style={clickableTitleStyle} onClick={() => setIsEditing(true)}>
      {value}
    </h2>
  );
};

// 기존 titleStyle을 확장한 스타일
const clickableTitleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: '700',
  color: '#334155',
  margin: 0,
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
  // 호버 시 시각적 피드백
  backgroundColor: 'transparent',
};

const editInputStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: '700',
  color: '#334155',
  border: '2px solid #3b82f6',
  borderRadius: '4px',
  outline: 'none',
  padding: '2px 6px',
  width: '100%',
  backgroundColor: '#fff',
};