// src/pages/board-list/ui/BoardListPage.tsx
import { useNavigate } from 'react-router-dom';
import { BoardListWidget } from '@/widgets/board-list';

export const BoardListPage = () => {
  const navigate = useNavigate();

  const handleBoardClick = (id: number) => {
    navigate(`/board/${id}`); 
  };

  return (
    <div style={pageContainerStyle}>
      {/* 헤더 섹션 */}
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>프로젝트 보드</h1>
          <p style={subtitleStyle}>관리 중인 모든 칸반 보드 리스트입니다.</p>
        </div>
        <button 
          style={addButtonStyle}
          onClick={() => alert('새 보드 생성 기능 준비 중!')}
        >
          + 새 보드 만들기
        </button>
      </header>

      {/* 조립된 위젯 배치 */}
      <main>
        <BoardListWidget onRowClick={handleBoardClick} />
      </main>
    </div>
  );
};

const pageContainerStyle: React.CSSProperties = {
  padding: '40px 20px',
  maxWidth: '1000px',
  margin: '0 auto',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginBottom: '32px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: '800',
  color: '#1e293b',
  margin: 0,
};

const subtitleStyle: React.CSSProperties = {
  color: '#64748b',
  marginTop: '8px',
  fontSize: '1rem',
};

const addButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#1e293b', // 홈 화면과 통일된 네이비
  color: '#fff',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'background-color 0.2s',
};