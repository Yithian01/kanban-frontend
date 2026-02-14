import { useState } from 'react';
import { createSection } from '@/entities/section/';

interface CreateSectionButtonProps {
  boardId: number;
  onSuccess: () => void;
}

export const CreateSectionButton = ({ boardId, onSuccess }: CreateSectionButtonProps) => {
  // 💡 상태 이름을 isOpen으로 변경
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // 💡 백엔드 API 호출
      await createSection(boardId, name);
      
      // 💡 성공 후 처리
      onSuccess(); // 전체 데이터 다시 불러오기
      handleClose();
    } catch (error) {
      alert('섹션 생성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setName('');
  };

  return (
    <>
      {/* 💡 트리거 버튼 */}
      <button style={addSectionButtonStyle} onClick={() => setIsOpen(true)}>
        + 새 섹션 추가
      </button>

      {/* 💡 모달 오버레이 (배경 어둡게) */}
      {isOpen && (
        <div style={modalOverlayStyle} onClick={handleClose}>
          {/* 💡 모달 창 (클릭 이벤트 전파 방지) */}
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <h3 style={modalTitleStyle}>새 섹션 추가</h3>
            <input 
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              placeholder="섹션 이름 입력..."
              style={inputStyle}
            />
            <div style={buttonGroupStyle}>
              <button onClick={handleClose} style={cancelButtonStyle}>취소</button>
              <button onClick={handleCreate} style={confirmButtonStyle}>추가</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- 스타일 정의 ---

const addSectionButtonStyle: React.CSSProperties = {
  minWidth: '320px',
  height: '200px',
  backgroundColor: '#f1f5f9',
  border: '2px dashed #cbd5e1',
  borderRadius: '12px',
  cursor: 'pointer',
  color: '#64748b',
  fontWeight: '600',
  transition: 'all 0.2s',
};

// 💡 모달 배경 스타일
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 어두운 배경
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

// 💡 모달 컨텐츠 스타일
const modalContentStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '12px',
  width: '400px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

const modalTitleStyle: React.CSSProperties = {
  margin: '0 0 16px 0',
  fontSize: '1.25rem',
  color: '#1e293b'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '1rem',
  marginBottom: '20px',
  boxSizing: 'border-box' // 패딩이 너비에 포함되도록
};

const buttonGroupStyle: React.CSSProperties = { 
  display: 'flex', 
  justifyContent: 'flex-end',
  gap: '12px' 
};

const confirmButtonStyle: React.CSSProperties = { 
  padding: '10px 20px', 
  backgroundColor: '#3b82f6', 
  color: 'white', 
  border: 'none', 
  borderRadius: '6px', 
  cursor: 'pointer',
  fontWeight: '600'
};

const cancelButtonStyle: React.CSSProperties = { 
  padding: '10px 20px', 
  backgroundColor: '#f1f5f9', 
  color: '#64748b', 
  border: 'none', 
  borderRadius: '6px', 
  cursor: 'pointer',
  fontWeight: '600'
};