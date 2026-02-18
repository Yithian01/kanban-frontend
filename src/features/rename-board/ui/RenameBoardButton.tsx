import { useState } from 'react';
import { renameBoard } from '@/features/rename-board';

interface Props {
  boardId: number;
  currentTitle: string;
  onSuccess: () => void;
}

export const RenameBoardButton = ({ boardId, currentTitle, onSuccess }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(currentTitle);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);
      await renameBoard(boardId, title);
      setIsEditing(false);
      onSuccess(); 
    } catch {
      alert('보드 이름 변경 실패');
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <button onClick={() => setIsEditing(true)}>
        ✏️ 이름 변경
      </button>
    );
  }

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleSubmit} disabled={loading}>저장</button>
      <button onClick={() => setIsEditing(false)}>취소</button>
    </div>
  );
};