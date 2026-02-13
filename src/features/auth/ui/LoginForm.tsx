// src/features/auth/ui/LoginForm.tsx
import { useState } from 'react';
import { loginApi } from '../api/authApi';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginApi({ email, password });
      
      if (result.success) {
        // 데이터 구조: result.data.accessToken, result.data.nickname 등
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('nickname', result.data.nickname); // 닉네임 저장 추가
  
        alert(`${result.data.nickname}님 환영합니다!`);
  
        window.location.href = '/';
      }
    } catch (error: any) {
      // 서버에서 보낸 에러 메시지가 있으면 출력
      const message = error.response?.data?.message || '로그인 실패';
      alert(message);
    }
  };

  return (
    <form onSubmit={handleLogin} style={formStyle}>
      <input 
        type="email" 
        placeholder="이메일" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        style={inputStyle}
        required 
      />
      <input 
        type="password" 
        placeholder="비밀번호" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        style={inputStyle}
        required 
      />
      <button type="submit" style={buttonStyle}>로그인</button>
    </form>
  );
};

// 스타일 (동일)
const formStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '12px' };
const inputStyle: React.CSSProperties = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd' };
const buttonStyle: React.CSSProperties = { padding: '12px', backgroundColor: '#4A90E2', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' };