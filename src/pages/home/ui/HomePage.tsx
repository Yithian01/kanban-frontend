// src/pages/home/ui/HomePage.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const HomePage = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Service Admin Dashboard</h1>
      <p style={subtitleStyle}>프로젝트의 관리를 위한 통합 대시보드입니다.</p>
      
<div style={buttonContainerStyle}>
        
  {/* 1. 마이페이지 버튼 */}
  <button 
    style={{
      ...unifiedButtonStyle,
      backgroundColor: hoveredButton === 'mypage' ? '#334155' : '#2563eb',
      borderColor: hoveredButton === 'mypage' ? '#334155' : '#2563eb',
      transform: hoveredButton === 'mypage' ? 'translateY(-2px)' : 'translateY(0)',
    }}
    onMouseEnter={() => setHoveredButton('mypage')}
    onMouseLeave={() => setHoveredButton(null)}
    onClick={() => navigate('/mypage')}
  >
    👤 마이페이지 입장
  </button>

  {/* 2. 칸반 보드 버튼 */}
  <button
    style={{
      ...unifiedButtonStyle,
      backgroundColor: hoveredButton === 'kanban' ? '#334155' : '#2563eb',
      borderColor: hoveredButton === 'kanban' ? '#334155' : '#2563eb',
      transform: hoveredButton === 'kanban' ? 'translateY(-2px)' : 'translateY(0)',
    }}
    onMouseEnter={() => setHoveredButton('kanban')}
    onMouseLeave={() => setHoveredButton(null)}
    onClick={() => navigate('/board')}
  >
    📋 내 칸반 보드 목록
  </button>

  {/* 3. 시스템 설정 버튼 */}
  <button 
    style={{
      ...unifiedButtonStyle,
      backgroundColor: hoveredButton === 'settings' ? '#334155' : '#2563eb',
      borderColor: hoveredButton === 'settings' ? '#334155' : '#2563eb',
      transform: hoveredButton === 'settings' ? 'translateY(-2px)' : 'translateY(0)',
    }}
    onMouseEnter={() => setHoveredButton('settings')}
    onMouseLeave={() => setHoveredButton(null)}
    onClick={() => navigate('/settings')}
  >
    ⚙️ 시스템 설정
  </button>

  {/* 4. 준비중 버튼 (비활성화 상태 유지) */}
  <button style={disabledButtonStyle} disabled>
    🔒 보안 모니터링 (준비중)
  </button>
      </div>
    </div>
  );
};

// --- 스타일 정의 (보일러플레이트용) ---
const containerStyle: React.CSSProperties = {
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  justifyContent: 'center', 
  height: 'calc(100vh - 64px)', // 헤더 높이를 제외한 중앙 배치
  backgroundColor: '#f8fafc',
  textAlign: 'center'
};

const titleStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: '800',
  color: '#1e293b',
  marginBottom: '10px'
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  color: '#64748b',
  marginBottom: '40px'
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

const baseButtonStyle: React.CSSProperties = {
  width: '280px',
  padding: '16px',
  fontSize: '1rem',
  fontWeight: '600',
  borderRadius: '10px',
  cursor: 'pointer',
  border: 'none',
  transition: 'transform 0.1s, opacity 0.1s',
};

const primaryButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: '#2563eb',
  color: '#fff',
  boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)',
};

const secondaryButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: '#fff',
  border: '1px solid #e2e8f0',
  color: '#475569',
};

const disabledButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: '#f1f5f9',
  color: '#94a3b8',
  cursor: 'not-allowed',
};

const unifiedButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: '#1e293b',
  color: '#fff',
  border: '1px solid #1e293b',
  transition: 'all 0.25s ease', // 색상과 위치 변화를 부드럽게
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};