// src/widgets/header/ui/Header.tsx
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  
  // 인증 정보 확인
  const accessToken = localStorage.getItem('accessToken');
  const nickname = localStorage.getItem('nickname') || '사용자';

  const handleLogout = () => {
    // 템플릿의 일관성을 위해 추후 shared/api의 logout 함수로 통합 권장
    localStorage.removeItem('accessToken');
    localStorage.removeItem('nickname');
    window.location.href = '/'; 
  };

  return (
    <header style={headerStyle}>
      {/* 로고 영역: 프로젝트에 따라 이름만 변경 */}
      <div onClick={() => navigate('/')} style={logoContainerStyle}>
        <span style={{ fontSize: '1.5rem' }}>💎</span> 
        <span className="logo-text">PROJ_TEMPLATE</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* 네비게이션: 가장 자주 쓰이는 메뉴 구성 */}
        <nav style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => navigate('/dashboard')} style={navButtonStyle}>대시보드</button>
          <button onClick={() => navigate('/settings')} style={navButtonStyle}>설정</button>
        </nav>

        {/* 사용자 섹션 */}
        <div style={userSectionStyle}>
          {accessToken ? (
            <>
              <div style={userInfoStyle}>
                <span className="welcome-text">안녕하세요, </span>
                <strong style={{ color: '#2563eb' }}>{nickname}</strong>님
              </div>
              <button onClick={handleLogout} style={logoutButtonStyle}>
                로그아웃
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} style={loginButtonStyle}>
              시작하기
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

// --- 범용적인 Modern 스타일 정의 ---
const headerStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '0 5%', height: '64px', backgroundColor: '#ffffff',
  borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 1000,
};

const logoContainerStyle: React.CSSProperties = {
  fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer',
  display: 'flex', alignItems: 'center', gap: '10px', color: '#1a1a1a',
  letterSpacing: '-0.5px'
};

const navButtonStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer',
  fontSize: '0.9rem', color: '#666', fontWeight: '500',
  transition: 'color 0.2s'
};

const userSectionStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '12px', 
  paddingLeft: '20px', borderLeft: '1px solid #f0f0f0'
};

const userInfoStyle: React.CSSProperties = {
  fontSize: '0.85rem', color: '#444'
};

const logoutButtonStyle: React.CSSProperties = {
  background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px',
  padding: '6px 12px', cursor: 'pointer', fontSize: '0.8rem', color: '#64748b',
  fontWeight: '600'
};

const loginButtonStyle: React.CSSProperties = {
  background: '#2563eb', border: 'none', borderRadius: '6px',
  padding: '8px 16px', cursor: 'pointer', fontSize: '0.85rem', color: '#fff',
  fontWeight: '600', transition: 'background 0.2s'
};