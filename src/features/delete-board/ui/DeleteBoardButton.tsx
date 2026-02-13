// src/features/delete-board/ui/DeleteBoardButton.tsx
import { deleteBoard } from '@/entities/board';

interface Props {
  boardId: number;
  onSuccess: () => void;
}

export const DeleteBoardButton = ({ boardId, onSuccess }: Props) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!confirm('보드를 삭제하시겠습니까? 관련 데이터가 모두 삭제됩니다.')) return;

    try {
      await deleteBoard(boardId);
      onSuccess(); 
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <button onClick={handleDelete} style={deleteButtonStyle}>
      삭제
    </button>
  );
};

const deleteButtonStyle: React.CSSProperties = {
  padding: '4px 8px',
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};