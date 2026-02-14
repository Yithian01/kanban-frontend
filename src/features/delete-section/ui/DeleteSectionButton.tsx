import { useState } from 'react';
import { deleteSection } from '@/entities/section/';

interface DeleteSectionButtonProps {
  boardId: number;
  sectionId: number; 
  sectionName: string;
  onSuccess: () => void;
}

export const DeleteSectionButton = ({ boardId, sectionId, sectionName, onSuccess }: DeleteSectionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 💡 호버 상태 관리를 위한 state들
  const [isTriggerHover, setIsTriggerHover] = useState(false);
  const [isConfirmHover, setIsConfirmHover] = useState(false);
  const [isCancelHover, setIsCancelHover] = useState(false);

  const handleDelete = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await deleteSection(boardId, sectionId);
      onSuccess();
      handleClose();
    } catch (error) {
      alert('섹션 삭제에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsConfirmHover(false);
    setIsCancelHover(false);
  };

  return (
    <>
      <button
        style={{
          ...deleteTriggerButtonStyle,
          backgroundColor: isTriggerHover ? '#fef2f2' : 'transparent', 
        }}
        onMouseEnter={() => setIsTriggerHover(true)}
        onMouseLeave={() => setIsTriggerHover(false)}
        onClick={() => setIsOpen(true)}
      >
        삭제
      </button>

      {isOpen && (
        <div style={modalOverlayStyle} onClick={handleClose}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <h3 style={modalTitleStyle}>섹션 삭제</h3>
            
            <p style={descriptionStyle}>
              <strong>{sectionName}</strong> 섹션을 삭제하시겠습니까?<br />
              이 작업은 되돌릴 수 없습니다.
            </p>

            <div style={buttonGroupStyle}>
              {/* 취소 버튼 호버 */}
              <button 
                onMouseEnter={() => setIsCancelHover(true)}
                onMouseLeave={() => setIsCancelHover(false)}
                onClick={handleClose} 
                style={{
                  ...cancelButtonStyle,
                  backgroundColor: isCancelHover ? '#e2e8f0' : '#f1f5f9',
                }}
              >
                취소
              </button>

              {/* 삭제 확인 버튼 호버 */}
              <button 
                onMouseEnter={() => setIsConfirmHover(true)}
                onMouseLeave={() => setIsConfirmHover(false)}
                onClick={handleDelete} 
                style={{
                  ...confirmDeleteButtonStyle,
                  backgroundColor: isConfirmHover ? '#dc2626' : '#ef4444',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? '삭제 중...' : '확인'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- 스타일 정의 (변경 및 추가된 부분) ---

const deleteTriggerButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  backgroundColor: 'transparent',
  color: '#ef4444',
  border: '1px solid #ef4444',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.875rem',
  transition: 'all 0.2s ease',
};

const confirmDeleteButtonStyle: React.CSSProperties = { 
  padding: '10px 20px', 
  backgroundColor: '#ef4444',
  color: 'white', 
  border: 'none', 
  borderRadius: '6px', 
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'background-color 0.2s ease',
};

const descriptionStyle: React.CSSProperties = {
  marginBottom: '24px',
  color: '#475569',
  lineHeight: '1.5',
};

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

const buttonGroupStyle: React.CSSProperties = { 
  display: 'flex', 
  justifyContent: 'flex-end',
  gap: '12px' 
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