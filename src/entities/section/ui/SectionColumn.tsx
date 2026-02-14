// src/entities/section/ui/SectionColumn.tsx
import { TaskCard } from '@/entities/task'; 
import type { Task } from '@/entities/task'; 
import { DeleteSectionButton } from '@/features/delete-section'
import { EditableSectionName } from '@/features/update-section';

interface SectionColumnProps {
  boardId: number; 
  sectionId: number;
  name: string;
  tasks: Task[];  
  onAddTask?: (sectionId: number) => void;
  onDeleteSuccess: () => void;
}

export const SectionColumn = ({ 
  boardId, 
  sectionId, 
  name, 
  tasks, 
  onAddTask, 
  onDeleteSuccess 
}: SectionColumnProps) => {
  return (
    <div style={columnStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <EditableSectionName 
            boardId={boardId} 
            sectionId={sectionId} 
            initialName={name}
            onUpdateSuccess={(newName) => console.log(`${newName}으로 변경됨`)}
          />
          <span style={countStyle}>{tasks.length}</span>
        </div>

        {/* 2. 기존 버튼 대신 커스텀 삭제 버튼 컴포넌트 삽입 */}
        <DeleteSectionButton 
          boardId={boardId}
          sectionId={sectionId}
          sectionName={name}
          onSuccess={onDeleteSuccess} 
        />
      </div>

      <div style={taskListStyle}>
        {tasks.map(task => (
          <TaskCard key={task.taskId} task={task} />
        ))}
      </div>

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