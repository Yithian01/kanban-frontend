// src/shared/ui/Modal/tsx
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  if (!isOpen) return null;

  // 화면 전체를 덮는 Overlay와 중앙의 Content Box
  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }} onClick={onClose}>
      <div 
        style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          width: '90%',
          maxWidth: '450px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          animation: 'modalFadeIn 0.3s ease-out'
        }} 
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록
      >
        {/* 모달 헤더 */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{title}</span>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>
        </div>

        {/* 모달 본문 */}
        <div style={{ padding: '24px' }}>
          {children}
        </div>

        {/* 모달 하단 버튼 영역 */}
        {footer && (
          <div style={{ padding: '16px 24px', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};