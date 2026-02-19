// src/entities/task/ui/TaskCard.tsx
import { useState } from 'react';
import type { Task } from '@/entities/task/model/types'; 
import { deleteTask, updateTask } from '@/entities/task'; // updateTask 추가 임포트

interface TaskCardProps {
  task: Task;
  boardId: number;
  sectionId: number;
  onDeleteSuccess: () => void;
  onUpdateSuccess: () => void; // 🌟 수정 성공 콜백 추가
}

export const TaskCard = ({ task, boardId, sectionId, onDeleteSuccess, onUpdateSuccess }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editContent, setEditContent] = useState(task.content || '');

  // 삭제 로직 (기존과 동일)
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('이 카드를 삭제하시겠습니까?')) return;
    try {
      await deleteTask(boardId, sectionId, task.taskId);
      onDeleteSuccess();
    } catch (error) {
      alert('카드 삭제에 실패했습니다.');
    }
  };

  // 🌟 수정 저장 로직
  const handleUpdate = async (e: React.FormEvent) => {
    e.stopPropagation();
    if (!editTitle.trim()) return alert('제목을 입력해주세요.');

    try {
      await updateTask(boardId, sectionId, task.taskId, editTitle, editContent);
      setIsEditing(false);
      onUpdateSuccess();
    } catch (error) {
      alert('카드 수정에 실패했습니다.');
    }
  };

  // 편집 모드 UI
  if (isEditing) {
    return (
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        <input
          style={{ ...titleStyle, width: '100%', marginBottom: '8px', border: '1px solid #cbd5e1', padding: '4px' }}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          autoFocus
        />
        <textarea
          style={{ ...contentStyle, width: '100%', minHeight: '60px', border: '1px solid #cbd5e1', padding: '4px', resize: 'none' }}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '4px', marginTop: '8px', justifyContent: 'flex-end' }}>
          <button onClick={handleUpdate} style={saveButtonStyle}>저장</button>
          <button onClick={() => setIsEditing(false)} style={cancelButtonStyle}>취소</button>
        </div>
      </div>
    );
  }

  // 기본 보기 모드 UI (기존 코드에서 onClick 시 편집모드 전환만 추가)
  return (
    <div style={cardStyle} onClick={() => setIsEditing(true)}>
      <div style={headerWrapperStyle}>
        <h4 style={titleStyle}>{task.title}</h4>
        <button onClick={handleDelete} style={deleteButtonStyle} title="삭제">
          &times;
        </button>
      </div>
      {task.content && <p style={contentStyle}>{task.content}</p>}
      <div style={footerStyle}></div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  padding: '16px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginBottom: '12px',
  border: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px', 
};

const titleStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  fontWeight: '600',
  color: '#1e293b',
  margin: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis', 
};

const contentStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: '#64748b',
  margin: '4px 0 0 0',
  lineHeight: '1.5',
  display: '-webkit-box',
  WebkitLineClamp: 3, 
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  wordBreak: 'break-all',
};

const footerStyle: React.CSSProperties = {
  marginTop: '8px',
  display: 'flex',
  justifyContent: 'flex-end',
  minHeight: '4px', 
};

const headerWrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '8px'
};

const deleteButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#94a3b8',
  fontSize: '1.25rem',
  cursor: 'pointer',
  lineHeight: '1',
  padding: '0 4px',
  transition: 'color 0.2s',
};

const saveButtonStyle: React.CSSProperties = {
  padding: '4px 8px',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '0.75rem',
  cursor: 'pointer'
};

const cancelButtonStyle: React.CSSProperties = {
  padding: '4px 8px',
  backgroundColor: '#f1f5f9',
  color: '#475569',
  border: 'none',
  borderRadius: '4px',
  fontSize: '0.75rem',
  cursor: 'pointer'
};