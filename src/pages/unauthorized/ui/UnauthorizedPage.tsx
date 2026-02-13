import { useNavigate } from 'react-router-dom';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={iconStyle}>🚫</div>
        <h1 style={titleStyle}>접근 권한이 없습니다</h1>
        <p style={descriptionStyle}>
          해당 페이지에 접근할 수 있는 권한이 없습니다.<br />
          권한이 필요하시다면 관리자에게 문의해 주세요.
        </p>
        
        <div style={buttonContainerStyle}>
          <button 
            onClick={() => navigate('/')} 
            style={{ ...buttonStyle, backgroundColor: '#4A90E2' }}
          >
            홈으로 이동
          </button>
          <button 
            onClick={() => navigate(-1)} 
            style={{ ...buttonStyle, backgroundColor: '#fff', color: '#333', border: '1px solid #ddd' }}
          >
            뒤로 가기
          </button>
        </div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  height: '80vh', backgroundColor: '#f9f9f9',
};

const cardStyle: React.CSSProperties = {
  textAlign: 'center', padding: '40px', backgroundColor: '#fff',
  borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  maxWidth: '400px', width: '100%',
};

const iconStyle: React.CSSProperties = { fontSize: '50px', marginBottom: '20px' };
const titleStyle: React.CSSProperties = { fontSize: '24px', fontWeight: 'bold', color: '#e53e3e', marginBottom: '10px' }; // 경고 의미의 붉은색
const descriptionStyle: React.CSSProperties = { fontSize: '16px', color: '#666', lineHeight: '1.5', marginBottom: '30px' };
const buttonContainerStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '10px' };
const buttonStyle: React.CSSProperties = {
  padding: '12px', border: 'none', borderRadius: '8px',
  fontSize: '16px', fontWeight: '600', color: '#fff', cursor: 'pointer',
};