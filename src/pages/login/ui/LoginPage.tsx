// src/pages/login/ui/LoginPage.tsx
import { Link } from 'react-router-dom';
import { LoginForm } from '@/features/auth';

export const LoginPage = () => {
  return (
    <div style={pageWrapperStyle}>
      <div style={loginCardStyle}>
        {/* 서비스 로고나 타이틀 */}
        <div style={headerStyle}>
          <h1 style={logoStyle}>🚀 My Service</h1>
          <p style={subTitleStyle}>다시 오신 것을 환영합니다!</p>
        </div>

        {/* 우리가 만든 로그인 폼 (Feature) */}
        <LoginForm />

        {/* 하단 링크 (가입 유도 등) */}
        <div style={footerLinkStyle}>
          <span>계정이 없으신가요? </span>
          <Link to="/signup" style={signupLinkStyle}>회원가입 하기</Link>
        </div>
        
        <div style={findPasswordStyle}>
          <Link to="/find-password" style={secondaryLinkStyle}>비밀번호를 잊으셨나요?</Link>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const pageWrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh', // 헤더 높이를 고려한 설정
  backgroundColor: '#f5f7fa',
};

const loginCardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '400px',
  padding: '40px',
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '32px',
};

const logoStyle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#333',
  margin: '0 0 8px 0',
};

const subTitleStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#888',
};

const footerLinkStyle: React.CSSProperties = {
  marginTop: '24px',
  textAlign: 'center',
  fontSize: '14px',
  color: '#666',
};

const signupLinkStyle: React.CSSProperties = {
  color: '#4A90E2',
  fontWeight: '600',
  textDecoration: 'none',
};

const findPasswordStyle: React.CSSProperties = {
  marginTop: '16px',
  textAlign: 'center',
};

const secondaryLinkStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#aaa',
  textDecoration: 'none',
};