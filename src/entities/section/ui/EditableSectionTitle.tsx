// src/features/update-section/ui/EditableSectionTitle.tsx
import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { renameSection } from '@/entities/section/api/sectionApi';

interface Props {
  boardId: number;
  sectionId: number;
  initialName: string;
  onSuccess?: () => void;
}

export const EditableSectionTitle = ({ boardId, sectionId, initialName, onSuccess }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  // 수정 모드 진입 시 자동 포커스
  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleUpdate = async () => {
    // 변경사항이 없거나 빈 값이면 무시
    if (title.trim() === '' || title === initialName) {
      setTitle(initialName);
      setIsEditing(false);
      return;
    }

    try {
      await renameSection(boardId, sectionId, title);
      setIsEditing(false);
      onSuccess?.(); 
    } catch (error) {
      console.error('Failed to rename section', error);
      alert('섹션 이름 변경에 실패했습니다.');
      setTitle(initialName);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleUpdate();
    if (e.key === 'Escape') {
      setTitle(initialName);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleUpdate}
        onKeyDown={handleKeyDown}
        style={editInputStyle}
      />
    );
  }

  return (
    <h2 style={titleStyle} onClick={() => setIsEditing(true)} title="클릭하여 수정">
      {title}
    </h2>
  );
};

// 스타일 정의 (기존 스타일 확장)
const titleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: '700',
  color: '#334155',
  margin: 0,
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
  flex: 1, // 공간 채우기
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const editInputStyle: React.CSSProperties = {
  ...titleStyle,
  outline: 'none',
  border: '2px solid #3b82f6',
  backgroundColor: 'white',
  padding: '2px 6px',
};