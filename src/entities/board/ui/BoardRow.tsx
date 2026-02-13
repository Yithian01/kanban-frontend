// src/entities/board/ui/BoardRow.tsx
import type { BoardSummary } from '@/entities/board';

interface BoardRowProps {
  board: BoardSummary;
  onClick: (id: number) => void;
}

export const BoardRow = ({ board, onClick }: BoardRowProps) => {
  return (
    <tr 
      style={rowStyle} 
      onClick={() => onClick(board.boardId)}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      <td style={tdStyle}>{board.title}</td>
      <td style={tdStyle}>{board.creatorEmail}</td>
      <td style={tdStyle}>{new Date(board.createdAt).toLocaleDateString()}</td>
      <td style={tdStyle}>{new Date(board.updateAt).toLocaleDateString()}</td>
      <td style={{...tdStyle, textAlign: 'left', color: '#94a3b8'}}>이동하기 ➜</td>
    </tr>
  );
};

const rowStyle: React.CSSProperties = {
  cursor: 'pointer',
  borderBottom: '1px solid #e2e8f0',
  transition: 'background-color 0.2s',
};

const tdStyle: React.CSSProperties = {
  padding: '16px',
  color: '#334155',
};