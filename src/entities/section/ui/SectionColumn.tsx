// src/entities/section/ui/SectionColumn.tsx
import { TaskCard } from '@/entities/task'; 
import type { Task } from '@/entities/task'; 

interface SectionColumnProps {
  sectionId: number;
  name: string;
  tasks: Task[];
  onAddTask?: (sectionId: number) => void;
}

export const SectionColumn = ({ sectionId, name, tasks, onAddTask }: SectionColumnProps) => {
  return (
    <div style={columnStyle}>
      {/* 💡 섹션 헤더 */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>{name}</h2>
        <span style={countStyle}>{tasks.length}</span>
      </div>

      {/* 💡 태스크 카드 목록 */}
      <div style={taskListStyle}>
        {tasks.map(task => (
          <TaskCard key={task.taskId} task={task} />
        ))}
      </div>

      {/* 💡 추가 버튼 (간단히 UI만) */}
      <button style={addButtonStyle} onClick={() => onAddTask?.(sectionId)}>
        + 카드 추가
      </button>
    </div>
  );
};

const columnStyle: React.CSSProperties = {
  width: '320px',
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #e2e8f0',
  height: '80vh',
  maxHeight: '100%',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: '700',
  height:'50px',
  color: '#334155',
  margin: 0,
};

const countStyle: React.CSSProperties = {
  backgroundColor: '#e2e8f0',
  color: '#64748b',
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '0.875rem',
  fontWeight: '600',
};

const taskListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  overflowY: 'auto', 
  paddingRight: '4px',
};

const addButtonStyle: React.CSSProperties = {
  marginTop: '16px',
  padding: '16px',
  minHeight: '100px', 
  
  backgroundColor: '#f1f5f9', 
  border: '2px dashed #cbd5e1',
  borderRadius: '8px',
  color: '#64748b',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'all 0.2s',
  
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};