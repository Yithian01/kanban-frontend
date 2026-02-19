// src/widgets/board-canvas/ui/BoardCanvas.tsx
import { 
  DndContext, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  closestCorners,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { 
  SortableContext, 
  horizontalListSortingStrategy 
} from '@dnd-kit/sortable';
import { SortableSection } from '@/entities/section/ui/SortableSection';
import { updatePositionSection } from '@/entities/section'; 
import { CreateSectionButton } from '@/features/create-section';
import type { Section } from '@/entities/section';

interface BoardCanvasProps {
  boardId: number;
  sections: Section[];
  onRefresh: () => void;
}

export const BoardCanvas = ({ boardId, sections, onRefresh }: BoardCanvasProps) => {
  // 마우스 클릭 시에만 드래그가 작동하도록 센서 설정 (입력창 클릭 방해 방지)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // active.id를 number로 캐스팅하거나 타입을 맞춤
    const activeId = Number(active.id);
    const overId = Number(over.id);

    const targetIndex = sections.findIndex((s) => s.sectionId === overId);

    if (targetIndex !== -1) {
      try {
        await updatePositionSection(boardId, activeId, targetIndex);
        onRefresh();
      } catch (error) {
        console.error('순서 변경 실패:', error);
        alert('순서 변경에 실패했습니다.');
      }
    }
  };

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCorners} 
      onDragEnd={handleDragEnd}
    >
      <div style={canvasStyle}>
        <div style={sectionsWrapperStyle}>
          {/* SortableContext가 아이템들을 관리 */}
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