import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SectionColumn } from './SectionColumn';

export const SortableSection = (props: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: props.sectionId,
    data: {
      type: 'Section', // 🌟 데이터 타입 명시
    }
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1, 
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* 🌟 중요: listeners와 attributes를 SectionColumn 내부의 '헤더'로 전달합니다 */}
      <SectionColumn 
        {...props} 
        dragHandleProps={{ ...attributes, ...listeners }} 
      />
    </div>
  );
};