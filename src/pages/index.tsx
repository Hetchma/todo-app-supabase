import { Inter } from '@next/font/google';
import { NextPage } from 'next';
import { Layout } from 'src/components/Layout';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = () => {
  return <Layout title="Home">{'hello'}</Layout>;
};

export default Home;
