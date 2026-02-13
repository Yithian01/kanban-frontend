// entities/user/ui/ProfileCard.tsx
import type { UserProfile } from '@/entities/user';

export const ProfileCard = ({ nickname, email, role }: UserProfile) => {
  return (
    <div style={profileCardStyle}>
      <div style={infoRowStyle}><strong>닉네임:</strong> {nickname}</div>
      <div style={infoRowStyle}><strong>이메일:</strong> {email}</div>
      <div style={infoRowStyle}><strong>권한:</strong> {role}</div>
    </div>
  );
};

const profileCardStyle: React.CSSProperties = { 
  padding: '24px', 
  backgroundColor: '#fff', 
  borderRadius: '12px', 
  border: '1px solid #eee', 
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
};

const infoRowStyle: React.CSSProperties = { 
  marginBottom: '12px', 
  fontSize: '1.1rem' 
};