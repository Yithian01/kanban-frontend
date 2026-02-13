// src/features/create-board/ui/CreateBoardButton.tsx
import { useState } from 'react';
import { createBoard } from '@/entities/board';

interface CreateBoardButtonProps {
  onSuccess: () => void; 
}

export const CreateBoardButton = ({ onSuccess }: CreateBoardButtonProps) => {
  const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createBoard(title);
      alert('보드가 생성되었습니다!');
      setTitle('');
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      alert('보드 생성에 실패했습니다.');
    }
  };

  return (
    <>
      <button style={addButtonStyle} onClick={() => setIsOpen(true)}>
        + 새 보드 만들기
      </button>

      {isOpen && (
        <div style={modalOverlayStyle}>
          <form style={modalContentStyle} onSubmit={handleCreate}>
            <h2 style={{margin: '0 0 16px 0'}}>새 보드 생성</h2>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="보드 제목을 입력하세요"
              style={inputStyle}
              autoFocus
            />
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '8px'}}>
              <button type="button" style={cancelButtonStyle} onClick={() => setIsOpen(false)}>취소</button>
              <button type="submit" style={addButtonStyle}>생성</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const addButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#1e293b',
  color: '#fff',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: '600',
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
  zIndex: 1000
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: '#fff', padding: '24px', borderRadius: '12px',
  width: '400px', display: 'flex', flexDirection: 'column', gap: '16px'
};

const inputStyle: React.CSSProperties = {
  padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1'
};

const cancelButtonStyle: React.CSSProperties = {
  ...addButtonStyle, backgroundColor: '#f1f5f9', color: '#334155'
};