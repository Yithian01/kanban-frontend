// src/pages/board-detail/ui/BoardDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBoardDetail } from '@/entities/board';
import type { BoardDetail } from '@/entities/board';
import { BoardCanvas } from '@/widgets/board-canvas';
import { EditableBoardName } from '@/features/rename-board';

export const BoardDetailPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadBoard = async () => {
    if (!boardId) return;
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

  useEffect(() => {
    loadBoard();
  }, [boardId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!board) return <div>보드를 찾을 수 없습니다.</div>;

  return (
    <div style={containerStyle}>
    <header style={headerStyle}>
      <button onClick={() => navigate('/board')} style={backButtonStyle}>
        ← 목록으로
      </button>

      <EditableBoardName 
        boardId={Number(boardId)} 
        initialName={board.title} 
        onUpdateSuccess={loadBoard} 
        />

    </header>

      <main style={canvasAreaStyle}>
        {/* 💡 boardId와 새로고침 함수를 Props로 전달 */}
        <BoardCanvas 
          boardId={Number(boardId)} 
          sections={board.sections} 
          onRefresh={loadBoard}
        />
      </main>
    </div>
  );
};

const containerStyle: React.CSSProperties = { height: '100vh', display: 'flex', flexDirection: 'column' };
const headerStyle: React.CSSProperties = { padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' };
const backButtonStyle: React.CSSProperties = { cursor: 'pointer', background: 'none', border: 'none', color: '#64748b' };
const canvasAreaStyle: React.CSSProperties = { flex: 1, overflow: 'hidden' };