// src/entities/section/ui/SectionColumn.tsx
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Task } from '@/entities/task'; 
import { DeleteSectionButton } from '@/features/delete-section'
import { EditableSectionName } from '@/features/update-section';
import { CreateTaskForm } from '@/features/create-task';
import { SortableTask } from '@/entities/task';

interface SectionColumnProps {
  boardId: number; 
  sectionId: number;
  name: string;
  tasks: Task[];  
  onRefreshBoard: () => void;
  onDeleteSuccess: () => void;
  dragHandleProps?: any; 
}

export const SectionColumn = ({ 
  boardId, 
  sectionId, 
  name, 
  tasks, 
  onRefreshBoard, 
  onDeleteSuccess,
  dragHandleProps // 🌟 추가
}: SectionColumnProps) => {

  return (
    <div style={columnStyle}>
      {/* 🌟 헤더 부분에만 드래그 핸들을 적용하여 섹션 이동을 제한함 */}
      <div style={headerStyle} {...dragHandleProps}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, cursor: 'grab' }}>
          <EditableSectionName 
            boardId={boardId} 
            sectionId={sectionId} 
            initialName={name}
            onUpdateSuccess={onRefreshBoard}
          />
          <span style={countStyle}>{tasks.length}</span>
        </div>

        <DeleteSectionButton 
          boardId={boardId}
          sectionId={sectionId}
          sectionName={name}
          onSuccess={onDeleteSuccess} 
        />
      </div>

      <div style={taskListStyle}>
        <SortableContext 
          id={String(sectionId)} 
          items={tasks.map(t => t.taskId)} 
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <SortableTask 
              key={task.taskId} 
              task={task}
              boardId={boardId}
              sectionId={sectionId}
              onRefreshBoard={onRefreshBoard}
            />
          ))}
        </SortableContext>
      </div>

      <CreateTaskForm 
        boardId={boardId} 
        sectionId={sectionId} 
        onSuccess={onRefreshBoard}
      />
    </div>
  );
};

// --- 스타일 정의 (기존과 동일) ---

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
  // 핸들 영역임을 시각적으로 보여주기 위해 커서 추가 가능
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
  flex: 1, // 리스트가 영역을 꽉 채우도록 설정
};