// src/entities/section/ui/SectionColumn.tsx
import { TaskCard } from '@/entities/task'; 
import type { Task } from '@/entities/task'; 
import { DeleteSectionButton } from '@/features/delete-section'
import { EditableSectionName } from '@/features/update-section';
import { CreateTaskForm } from '@/features/create-task';

interface SectionColumnProps {
  boardId: number; 
  sectionId: number;
  name: string;
  tasks: Task[];  
  onRefreshBoard: () => void;
  onDeleteSuccess: () => void;
}

export const SectionColumn = ({ 
  boardId, 
  sectionId, 
  name, 
  tasks, 
  onRefreshBoard, 
  onDeleteSuccess 
}: SectionColumnProps) => {
  console.log(`Section [${name}]의 Tasks:`, tasks);

  return (
    <div style={columnStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <EditableSectionName 
            boardId={boardId} 
            sectionId={sectionId} 
            initialName={name}
            onUpdateSuccess={onRefreshBoard}
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
          <TaskCard 
            key={task.taskId} 
            task={task}
            boardId={boardId}
            sectionId={sectionId}
            onDeleteSuccess={onRefreshBoard}
          />
        ))}
      </div>

      <CreateTaskForm 
        boardId={boardId} 
        sectionId={sectionId} 
        onSuccess={onRefreshBoard}
      />
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