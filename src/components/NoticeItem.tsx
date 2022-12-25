import { FC, useEffect, useState } from 'react';
import { supabase } from 'src/utils/supabase';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import useStore from 'store';
import { useMutateNotice } from 'src/hooks/useMutateNotice';
import { Notice } from 'src/types/types';

export const NoticeItem: FC<Omit<Notice, 'created_at'>> = ({
  id,
  content,
  user_id,
}) => {
  const [userId, setUserId] = useState<string | undefined>('');
  const update = useStore((state) => state.updateEditedNotice);
  const { deleteNoticeMutation } = useMutateNotice();
  useEffect(() => {
    setUserId(supabase.auth.user()?.id);
  }, []);
  return (
    <li className="my-3 text-lg font-extrabold">
      <span>{content}</span>
      {userId === user_id && (
        <div className="floar-right ml-20 flex">
          <PencilIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({
                id: id,
                content: content,
              });
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              deleteNoticeMutation.mutate(id);
            }}
          />
        </div>
      )}
    </li>
  );
};
