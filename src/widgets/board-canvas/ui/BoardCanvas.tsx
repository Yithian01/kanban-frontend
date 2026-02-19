// src/widgets/board-canvas/ui/BoardCanvas.tsx
import { SectionColumn } from '@/entities/section';
import type { Section } from '@/entities/section';
import { CreateSectionButton } from '@/features/create-section';

interface BoardCanvasProps {
  boardId: number;
  sections: Section[];
  onRefresh: () => void;
}

export const BoardCanvas = ({ boardId, sections, onRefresh }: BoardCanvasProps) => {
  return (
    <div style={canvasStyle}>
      <div style={sectionsWrapperStyle}>
        {sections.map(section => (
          <SectionColumn
            key={section.sectionId}
            boardId = {boardId}
            sectionId={section.sectionId}
            name={section.name}
            tasks={section.tasks}
            onRefreshBoard={onRefresh} 
            onDeleteSuccess={onRefresh}
          />
        ))}

        {/* 💡 전달받은 props를 적용 */}
        <CreateSectionButton 
          boardId={boardId} 
          onSuccess={onRefresh} 
        />
      </div>
    </div>
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