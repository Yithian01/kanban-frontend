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

      <div style={nameAreaStyle}>
          <EditableBoardName 
            boardId={Number(boardId)} 
            initialName={board.title} 
            onUpdateSuccess={loadBoard} 
          />
          {/* 🌟 회색 반투명 가이드 라인 추가 */}
          <span style={guideTextStyle}>
            변경 시 더블클릭
          </span>
        </div>
        

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



const guideTextStyle: React.CSSProperties = { fontSize: '0.75rem', color: '#94a3b8', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '12px', opacity: 0.8, userSelect: 'none',fontWeight: '400'};
const nameAreaStyle: React.CSSProperties = { display: 'flex', alignItems: 'baseline', gap: '12px'};
const headerStyle: React.CSSProperties = { padding: '20px 40px', display: 'flex', alignItems: 'center', gap: '24px', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white'};
const containerStyle: React.CSSProperties = { height: '100vh', display: 'flex', flexDirection: 'column' };
const backButtonStyle: React.CSSProperties = { cursor: 'pointer', background: 'none', border: 'none', color: '#64748b' };
const canvasAreaStyle: React.CSSProperties = { flex: 1, overflow: 'hidden' };