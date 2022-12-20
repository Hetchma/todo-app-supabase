import { NextPage } from 'next';
import { LogoutIcon } from '@heroicons/react/solid';
import { supabase } from 'src/utils/supabase';
import { Layout } from 'src/components/Layout';

const Dashboard: NextPage = () => {
  const signout = () => {
    supabase.auth.signOut();
  };

  return (
    <Layout title="Dashboard">
      <LogoutIcon
        className="mb06 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signout}
      />
    </Layout>
  );
};

export default Dashboard;
