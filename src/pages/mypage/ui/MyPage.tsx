// src/pages/mypage/ui/MyPage.tsx
import { useEffect, useState } from 'react';
import { apiInstance } from '@/shared';
import type { ApiResponse } from '@/shared'; 
import type { UserProfile } from '@/entities/user'; 
import { ProfileCard } from '@/entities/user'; 

export const MyPage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiInstance.get<ApiResponse<UserProfile>>('/auth/me')
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        console.error('내 정보 로드 실패:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={centerStyle}>로딩 중...</div>;

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '20px' }}>👤 마이페이지</h2>
      {user ? (
        <ProfileCard {...user} />
      ) : (
        <div style={profileCardStyle}>사용자 정보를 불러올 수 없습니다.</div>
      )}
      
      <div style={{ marginTop: '20px', color: '#666', fontSize: '0.85rem' }}>
        * 이 페이지는 인증된 사용자만 접근 가능합니다.
      </div>
    </div>
  );
};

// --- 스타일 정의 ---
const containerStyle: React.CSSProperties = { 
  padding: '40px', 
  maxWidth: '600px', 
  margin: '0 auto' 
};

const profileCardStyle: React.CSSProperties = { 
  padding: '24px', 
  backgroundColor: '#fff', 
  borderRadius: '12px', 
  border: '1px solid #eee', 
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
};

const centerStyle: React.CSSProperties = { 
  display: 'flex', 
  justifyContent: 'center', 
  marginTop: '100px',
  fontSize: '1.1rem',
  color: '#666'
};