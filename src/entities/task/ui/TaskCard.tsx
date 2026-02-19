// src/entities/task/ui/TaskCard.tsx
import type { Task } from '@/entities/task/model/types'; 
import { deleteTask } from '@/entities/task'; 

interface TaskCardProps {
  task: Task;
  boardId: number;
  sectionId: number;
  onDeleteSuccess: () => void;
  onClick?: () => void; 
}

export const TaskCard = ({ task, boardId, sectionId, onDeleteSuccess, onClick }: TaskCardProps) => {
  
  /**
   * 카드 삭제 핸들러
   */
  const handleDelete = async (e: React.MouseEvent) => {
    // 🌟 카드 클릭 이벤트가 부모로 퍼지는 것을 막음 (카드 상세 열림 방지)
    e.stopPropagation();

    if (!window.confirm('이 카드를 삭제하시겠습니까?')) return;

    try {
      await deleteTask(boardId, sectionId, task.taskId);
      onDeleteSuccess(); // 성공 시 부모(SectionColumn)에게 알림
    } catch (error) {
      console.error('Task 삭제 실패:', error);
      alert('카드 삭제에 실패했습니다.');
    }
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      <div style={headerWrapperStyle}>
        <h4 style={titleStyle}>{task.title}</h4>
        {/* 🌟 삭제 버튼 추가 */}
        <button 
          onClick={handleDelete} 
          style={deleteButtonStyle}
          title="삭제"
        >
          &times;
        </button>
      </div>

      {task.content && <p style={contentStyle}>{task.content}</p>}
      
      <div style={footerStyle}></div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  padding: '16px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginBottom: '12px',
  border: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px', 
};

const titleStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  fontWeight: '600',
  color: '#1e293b',
  margin: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis', 
};

const contentStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: '#64748b',
  margin: '4px 0 0 0',
  lineHeight: '1.5',
  display: '-webkit-box',
  WebkitLineClamp: 3, 
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  wordBreak: 'break-all',
};

const footerStyle: React.CSSProperties = {
  marginTop: '8px',
  display: 'flex',
  justifyContent: 'flex-end',
  minHeight: '4px', 
};

const headerWrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '8px'
};

const deleteButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#94a3b8',
  fontSize: '1.25rem',
  cursor: 'pointer',
  lineHeight: '1',
  padding: '0 4px',
  transition: 'color 0.2s',
};