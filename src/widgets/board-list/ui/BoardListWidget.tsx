// src/widgets/board-list/ui/BoardListWidget.tsx
import { useEffect, useState } from 'react';
import { BoardRow, fetchMyBoards, type BoardSummary } from '@/entities/board';

interface BoardListWidgetProps {
  onRowClick: (id: number) => void;
}

export const BoardListWidget = ({ onRowClick }: BoardListWidgetProps) => {
  const [boards, setBoards] = useState<BoardSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyBoards()
      .then((data) => {
        setBoards(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('보드 목록을 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div style={statusMessageStyle}>데이터 로딩 중...</div>;
  if (error) return <div style={{ ...statusMessageStyle, color: '#ef4444' }}>{error}</div>;

  return (
    <div style={widgetWrapperStyle}>
      <table style={tableStyle}>
        <thead>
          <tr style={theadRowStyle}>
            <th style={thStyle}>프로젝트명</th>
            <th style={thStyle}>소유자</th>
            <th style={thStyle}>생성일</th>
            <th style={thStyle}>수정일</th>
            <th style={thStyle}>이동하기</th>
          </tr>
        </thead>
        <tbody>
          {boards.length > 0 ? (
            boards.map((board) => (
              <BoardRow 
                key={board.boardId} 
                board={board} 
                onClick={onRowClick} 
              />
            ))
          ) : (
            <tr>
              <td colSpan={4} style={emptyMessageStyle}>생성된 보드가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const widgetWrapperStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
};

const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', textAlign: 'left' };
const theadRowStyle: React.CSSProperties = { backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' };
const thStyle: React.CSSProperties = { padding: '16px', fontSize: '0.85rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' };
const statusMessageStyle: React.CSSProperties = { padding: '40px', textAlign: 'center', color: '#64748b' };
const emptyMessageStyle: React.CSSProperties = { ...statusMessageStyle, padding: '60px' };