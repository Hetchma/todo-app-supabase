import React, { FC } from 'react';
import { useQueryTasks } from 'src/hooks/useQueryTasks';
import { Spiner } from 'src/components/Spiner';
import { TaskItem } from 'src/components/TaskItem';

export const TaskList: FC = () => {
  const { data: tasks, status } = useQueryTasks();
  if (status === 'loading') return <Spiner />;
  if (status === 'error') return <p>{'Error'}</p>;
  return (
    <ul className="my-2">
      {tasks?.map((task) => (
        <TaskItem key={task.id} id={task.id} title={task.title} />
      ))}
    </ul>
  );
};
