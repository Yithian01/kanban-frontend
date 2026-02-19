// src/features/create-task/ui/CreateTaskForm.tsx
import { useState } from 'react';
import { createTask } from '@/entities/task'; 

interface Props {
  boardId: number;
  sectionId: number;
  onSuccess: () => void; 
}

export const CreateTaskForm = ({ boardId, sectionId, onSuccess }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCancel = () => {
    setIsEditing(false);
    setTitle('');
    setContent('');
  };

  const handleSubmit = async () => {
    if (!title.trim()) return handleCancel();

    try {
      await createTask(boardId, sectionId, title.trim(), content.trim());
      
      handleCancel(); 
      
      onSuccess(); 
      
    } catch (error: any) {
      console.error('Task 생성 에러:', error);
      alert('카드 생성에 실패했습니다.');
    }
  };

  if (!isEditing) {
    return (
      <button style={addButtonStyle} onClick={() => setIsEditing(true)}>
        + 카드 추가
      </button>
    );
  }

  return (
    <div style={formContainerStyle}>
      <input
        autoFocus
        placeholder="카드 제목..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={titleInputStyle}
        onKeyDown={(e) => e.key === 'Escape' && handleCancel()}
      />
      <textarea
        placeholder="내용을 입력하세요 (선택)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={contentInputStyle}
      />
      <div style={buttonGroupStyle}>
        <button onClick={handleSubmit} style={saveButtonStyle}>추가</button>
        <button onClick={handleCancel} style={cancelButtonStyle}>취소</button>
      </div>
    </div>
  );
};

// --- 스타일 정의 (기존 addButtonStyle과 조화롭게) ---
const formContainerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '12px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginTop: '16px', // SectionColumn의 여백과 맞춤
};

const titleInputStyle: React.CSSProperties = {
  border: 'none',
  outline: 'none',
  fontWeight: '600',
  fontSize: '1rem',
  width: '100%',
  padding: '4px 0',
};

const contentInputStyle: React.CSSProperties = {
  border: 'none',
  outline: 'none',
  fontSize: '0.875rem',
  resize: 'none',
  minHeight: '60px',
  fontFamily: 'inherit',
  color: '#64748b',
};

const buttonGroupStyle: React.CSSProperties = { display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' };
const saveButtonStyle: React.CSSProperties = { backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' };
const cancelButtonStyle: React.CSSProperties = { backgroundColor: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer', padding: '6px 12px' };
const addButtonStyle: React.CSSProperties = { marginTop: '16px', padding: '16px', minHeight: '80px', backgroundColor: '#f1f5f9', border: '2px dashed #cbd5e1', borderRadius: '8px', color: '#64748b', cursor: 'pointer', fontWeight: '600', width: '100%' };