import { useState } from 'react';
import { supabase } from 'src/utils/supabase';
import { useMutation } from 'react-query';

export const useMutateAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const reset = () => {
    setEmail('');
    setPassword('');
  };
  // signIn
  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw new Error(error.message);
    },
    // 成功したらonSuccessに処理を書く

    // 失敗したらonErrorに処理を書く
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  // signUp
  const registerMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );
  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  };
};
