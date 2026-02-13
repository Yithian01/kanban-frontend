// src/pages/board-detail/ui/BoardDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBoardDetail } from '@/entities/board';
import type { BoardDetail } from '@/entities/board';
import { BoardCanvas } from '@/widgets/board-canvas';

export const BoardDetailPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!boardId) return;

    const loadBoard = async () => {
      try {
        const data = await fetchBoardDetail(Number(boardId));
        setBoard(data);
      } catch (error) {
        alert('보드를 불러오지 못했습니다.');
        navigate('/board');
      } finally {
        setIsLoading(false);
      }
    };

    loadBoard();
  }, [boardId, navigate]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!board) return <div>보드를 찾을 수 없습니다.</div>;

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <button onClick={() => navigate('/board')} style={backButtonStyle}>← 목록으로</button>
        <h1 style={titleStyle}>{board.title}</h1>
      </header>

      {/* 💡 핵심: 캔버스 위젯 배치 */}
      <main style={canvasAreaStyle}>
        <BoardCanvas sections={board.sections} />
      </main>
    </div>
  );
};

const containerStyle: React.CSSProperties = { height: '100vh', display: 'flex', flexDirection: 'column' };
const headerStyle: React.CSSProperties = { padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' };
const titleStyle: React.CSSProperties = { fontSize: '1.5rem', fontWeight: 'bold' };
const backButtonStyle: React.CSSProperties = { cursor: 'pointer', background: 'none', border: 'none', color: '#64748b' };
const canvasAreaStyle: React.CSSProperties = { flex: 1, overflow: 'hidden' };