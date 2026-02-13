// src/entities/task/ui/TaskCard.tsx
import type { Task } from '@/entities/task/model/types'; 

interface TaskCardProps {
  task: Task;
  onClick?: () => void; 
}

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  return (
    <div style={cardStyle} onClick={onClick}>
      <h4 style={titleStyle}>{task.title}</h4>
      <p style={contentStyle}>{task.content}</p>
      
      {/* 카드 하단에 추가 정보(예: 담당자, 태그)가 들어갈 공간 */}
      <div style={footerStyle}>
        {/* <span style={tagStyle}>기획</span> */}
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  padding: '16px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
  marginBottom: '12px',
  border: '1px solid #e2e8f0',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: '600',
  color: '#1e293b',
  margin: '0 0 8px 0',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis', 
};

const contentStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: '#64748b',
  margin: 0,
  lineHeight: '1.4',
  display: '-webkit-box',
  WebkitLineClamp: 2, 
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};

const footerStyle: React.CSSProperties = {
  marginTop: '12px',
  display: 'flex',
  justifyContent: 'flex-end',
};