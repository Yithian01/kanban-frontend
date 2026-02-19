import { useState } from 'react';
import { 
  DndContext, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  closestCenter, 
  DragOverlay,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { 
  SortableContext, 
  horizontalListSortingStrategy 
} from '@dnd-kit/sortable';
import { SortableSection } from '@/entities/section/ui/SortableSection';
import { updatePositionSection } from '@/entities/section'; 
import { CreateSectionButton } from '@/features/create-section';
import type { Section } from '@/entities/section';
import { moveTask, TaskCard } from '@/entities/task';

interface BoardCanvasProps {
  boardId: number;
  sections: Section[];
  onRefresh: () => void;
}

export const BoardCanvas = ({ boardId, sections, onRefresh }: BoardCanvasProps) => {
  const [activeTask, setActiveTask] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === 'Task') {
      setActiveTask(active.data.current.task);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = Number(active.id);
    const overId = over.id;

    if (active.data.current?.type === 'Task') {
      let targetSectionId: number | null = null;
      let targetIndex: number = 0;

      const targetSection = sections.find(s => 
        s.tasks.some(t => t.taskId === Number(overId)) || 
        s.sectionId === Number(overId)
      );

      if (targetSection) {
        targetSectionId = targetSection.sectionId;
        const taskIndex = targetSection.tasks.findIndex(t => t.taskId === Number(overId));
        
        if (taskIndex !== -1) {
          targetIndex = taskIndex;
        } else {
          targetIndex = targetSection.tasks.length;
        }

        try {
          await moveTask(boardId, activeId, targetSectionId, targetIndex);
          onRefresh();
        } catch (error) {
          console.error('태스크 이동 실패:', error);
        }
      }
      return;
    }

    if (active.id !== over.id) {
      const targetIndex = sections.findIndex((s) => s.sectionId === Number(overId));
      if (targetIndex !== -1) {
        try {
          await updatePositionSection(boardId, activeId, targetIndex);
          onRefresh();
        } catch (error) {
          console.error('섹션 순서 변경 실패:', error);
          alert('순서 변경에 실패했습니다.');
        }
      }
    }
  };

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={canvasStyle}>
        <div style={sectionsWrapperStyle}>
          <SortableContext 
            items={sections.map(s => s.sectionId)} 
            strategy={horizontalListSortingStrategy}
          >
            {sections.map(section => (
              <SortableSection
                key={section.sectionId}
                boardId={boardId}
                sectionId={section.sectionId}
                name={section.name}
                tasks={section.tasks}
                onRefreshBoard={onRefresh} 
                onDeleteSuccess={onRefresh}
              />
            ))}
          </SortableContext>
          <CreateSectionButton boardId={boardId} onSuccess={onRefresh} />
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <div style={{ width: '320px', opacity: 0.8 }}>
            <TaskCard 
              task={activeTask} 
              boardId={boardId} 
              sectionId={0} 
              onDeleteSuccess={() => {}} 
              onUpdateSuccess={() => {}} 
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const canvasStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px',
  padding: '24px',
  overflowX: 'auto',
  alignItems: 'flex-start',
  height: 'calc(100vh - 100px)',
};

const sectionsWrapperStyle: React.CSSProperties = {
  display: 'flex',
  gap: '24px',
  alignItems: 'flex-start',
  padding: '0 20px',
  minWidth: 'min-content', 
};