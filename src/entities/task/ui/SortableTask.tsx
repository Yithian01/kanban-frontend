import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from './TaskCard';
import type { Task } from '@/entities/task/model/types';

interface SortableTaskProps {
  task: Task;
  boardId: number;
  sectionId: number;
  onRefreshBoard: () => void;
}

export const SortableTask = (props: SortableTaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: props.task.taskId,
    data: {
      type: 'Task',
      task: props.task,
      sectionId: props.sectionId,
    }
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    position: 'relative',
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard 
        {...props} 
        onUpdateSuccess={props.onRefreshBoard} 
        onDeleteSuccess={props.onRefreshBoard} 
      />
    </div>
  );
};