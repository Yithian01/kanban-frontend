// src/features/auth/ui/SignupForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupApi, checkEmailApi, checkNicknameApi } from '../api/authApi';
import { Modal } from '@/shared/ui/Modal';

export const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', nickname: '' });
  
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  
  // 버튼 호버 상태 관리
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({ isOpen: false, title: '', message: '' });

  // 유효성 검사 함수
  const validateField = (type: 'email' | 'nickname' | 'password', value: string) => {
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || '올바른 이메일 형식이 아닙니다.';
    }
    if (type === 'nickname') {
      return (value.length >= 2 && value.length <= 10) || '닉네임은 2~10자 사이여야 합니다.';
    }
    if (type === 'password') {
        return value.length >= 8 || '비밀번호는 최소 8자 이상이어야 합니다.';
    }
    return true;
  };

  const openAlert = (title: string, message: string, onConfirm?: () => void) => {
    setModalConfig({ isOpen: true, title, message, onConfirm });
  };

  const closeAlert = () => {
    if (modalConfig.onConfirm) modalConfig.onConfirm();
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    const validation = validateField('email', formData.email);
    if (validation !== true) return openAlert('알림', validation as string);

    try {
      const res = await checkEmailApi(formData.email);
      if (res.data) {
        openAlert('확인', '이미 사용 중인 이메일입니다.');
        setIsEmailChecked(false);
      } else {
        openAlert('성공', '사용 가능한 이메일입니다.');
        setIsEmailChecked(true);
      }
    } catch (e) {
      openAlert('오류', '이메일 확인 중 문제가 발생했습니다.');
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    const validation = validateField('nickname', formData.nickname);
    if (validation !== true) return openAlert('알림', validation as string);

    try {
      const res = await checkNicknameApi(formData.nickname);
      if (res.data) {
        openAlert('확인', '이미 사용 중인 닉네임입니다.');
        setIsNicknameChecked(false);
      } else {
        openAlert('성공', '사용 가능한 닉네임입니다.');
        setIsNicknameChecked(true);
      }
    } catch (e) {
      openAlert('오류', '닉네임 확인 중 문제가 발생했습니다.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailChecked || !isNicknameChecked) {
      return openAlert('알림', '중복 확인을 먼저 완료해주세요.');
    }

    const pwdValidation = validateField('password', formData.password);
    if (pwdValidation !== true) return openAlert('알림', pwdValidation as string);
    
    try {
      const res = await signupApi(formData);
      if (res.success) {
        openAlert('축하합니다!', '회원가입이 완료되었습니다.', () => navigate('/login'));
      }
    } catch (error: any) {
      const errorData = error.response?.data; 
      if (error.response?.status === 400 && errorData.data) {
        const errorMessages = Object.values(errorData.data).join('\n');
        openAlert('입력 형식이 맞지 않습니다', errorMessages);
      } else {
        openAlert('오류', errorData?.message || '회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  // 호버 스타일 헬퍼
  const getCheckBtnStyle = (id: string): React.CSSProperties => ({
    ...checkButtonStyle,
    backgroundColor: hoveredBtn === id ? '#4A90E2' : '#fff',
    color: hoveredBtn === id ? '#fff' : '#4A90E2',
    transition: 'all 0.2s ease'
  });

  return (
    <>
      <form onSubmit={handleSignup} style={formContainerStyle}>
        <div style={inputGroupStyle}>
          <input 
            placeholder="이메일" 
            value={formData.email}
            onChange={(e) => { setFormData({...formData, email: e.target.value}); setIsEmailChecked(false); }}
            style={inputStyle}
          />
          <button 
            type="button" 
            onClick={handleCheckEmail} 
            onMouseEnter={() => setHoveredBtn('email')}
            onMouseLeave={() => setHoveredBtn(null)}
            style={getCheckBtnStyle('email')}
          >
            중복확인
          </button>
        </div>

        <div style={inputGroupStyle}>
          <input 
            placeholder="닉네임" 
            value={formData.nickname}
            onChange={(e) => { setFormData({...formData, nickname: e.target.value}); setIsNicknameChecked(false); }}
            style={inputStyle}
          />
          <button 
            type="button" 
            onClick={handleCheckNickname} 
            onMouseEnter={() => setHoveredBtn('nickname')}
            onMouseLeave={() => setHoveredBtn(null)}
            style={getCheckBtnStyle('nickname')}
          >
            중복확인
          </button>
        </div>

        <input 
          type="password" 
          placeholder="비밀번호" 
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          style={inputStyle}
        />

        <button 
          type="submit" 
          style={{
            ...submitButtonStyle, 
            backgroundColor: (isEmailChecked && isNicknameChecked) ? '#4A90E2' : '#ccc',
            cursor: (isEmailChecked && isNicknameChecked) ? 'pointer' : 'default',
            opacity: (isEmailChecked && isNicknameChecked) ? 1 : 0.8
          }}
        >
          가입하기
        </button>
      </form>

      <Modal isOpen={modalConfig.isOpen} onClose={closeAlert} title={modalConfig.title} footer={
          <button onClick={closeAlert} style={modalButtonStyle}>확인</button>
      }>
        <p style={modalMessageStyle}>{modalConfig.message}</p>
      </Modal>
    </>
  );
};

// 스타일 객체 (가독성을 위해 일부 정리)
const formContainerStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto' };
const inputGroupStyle: React.CSSProperties = { display: 'flex', gap: '8px' };
const inputStyle: React.CSSProperties = { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' };
const checkButtonStyle: React.CSSProperties = { padding: '0 15px', borderRadius: '8px', border: '1px solid #4A90E2', fontSize: '0.85rem', fontWeight: '500' };
const submitButtonStyle: React.CSSProperties = { padding: '15px', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', marginTop: '10px' };
const modalButtonStyle: React.CSSProperties = { padding: '8px 20px', backgroundColor: '#4A90E2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' };
const modalMessageStyle: React.CSSProperties = { fontSize: '1rem', color: '#444', lineHeight: '1.6', whiteSpace: 'pre-line' };