// src/app/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { HomePage } from '@/pages/home';
import { UnauthorizedPage } from '@/pages/unauthorized';
import { PrivateLayout } from '@/shared/index';
import { LoginPage } from '@/pages/login/ui/LoginPage';
import { SignupPage } from '@/pages/signup/ui/SignupPage';
import { MyPage } from '@/pages/mypage';
import { BoardListPage } from '@/pages/board-list';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* 누구나 접근 가능한 페이지 (Public) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* 로그인한 사용자만 접근 가능한 페이지 그룹 (Private) */}
        <Route element={<PrivateLayout />}>
          {/* 앞으로 추가될 마이페이지, 장바구니 등등은 여기 한 줄만 추가하면 끝! */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/board" element={<BoardListPage />} />
        </Route>

        {/* 404 페이지 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}