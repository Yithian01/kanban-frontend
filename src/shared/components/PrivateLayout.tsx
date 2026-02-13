// src/shared/components/PrivateLayout.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateLayout = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const location = useLocation();

  if (!isAuthenticated) {
    // 로그인 안 된 경우 로그인 페이지로 보내고, 
    // 로그인 성공 시 원래 페이지로 돌아올 수 있게 현재 위치(from)를 전달합니다.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 인증 됐으면 보호된 경로의 자식 컴포넌트들을 렌더링
  return <Outlet />;
};