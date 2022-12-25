import { FC } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import useStore from 'store';
import { useMutateTask } from 'src/hooks/useMutateTask';
import { Task } from 'src/types/types';

export const TaskItem: FC<Omit<Task, 'created_at' | 'user_id'>> = ({
  id,
  title,
}) => {
  const update = useStore((state) => state.updateEditedTask);
  const { deleteTaskMutation } = useMutateTask();

  return (
    <li className="my-3 text-lg font-extrabold">
      <span>{title}</span>
      <div className="floar-right ml-20 flex">
        <PencilIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            update({
              id: id,
              title: title,
            });
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteTaskMutation.mutate(id);
          }}
        />
      </div>
    </li>
  );
};
