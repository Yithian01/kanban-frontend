// src/widgets/board-canvas/ui/BoardCanvas.tsx
import { SectionColumn } from '@/entities/section';
import type { Section } from '@/entities/section';

interface BoardCanvasProps {
  sections: Section[];
}

export const BoardCanvas = ({ sections }: BoardCanvasProps) => {
  return (
    <div style={canvasStyle}>
      {/* 💡 섹션들을 가로로 나열 */}
      <div style={sectionsWrapperStyle}>
        {sections.map(section => (
          <SectionColumn
            key={section.sectionId}
            sectionId={section.sectionId}
            name={section.name}
            tasks={section.tasks}
          />
        ))}

        {/* 💡 새 섹션 추가 버튼 */}
        <button style={addSectionButtonStyle}>
          + 새 섹션 추가
        </button>
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

const addSectionButtonStyle: React.CSSProperties = {
  minWidth: '320px',
  height: '500px',
  backgroundColor: '#f1f5f9',
  border: '2px dashed #cbd5e1',
  borderRadius: '12px',
  cursor: 'pointer',
  color: '#64748b',
  fontWeight: '600',
  fontSize: '1rem',
  transition: 'all 0.2s',
};