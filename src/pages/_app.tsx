import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { supabase } from 'src/utils/supabase';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      console.log(`FCP: ${Math.round(metric.value * 10) / 10}`);
      break;
    case 'LCP':
      console.log(`LCP: ${Math.round(metric.value * 10) / 10}`);
      break;
    case 'TTFB':
      console.log(`TTFB: ${Math.round(metric.value * 10) / 10}`);
      break;
    case 'Next.js-hydration':
      console.log(
        `Hydration: ${Math.round(metric.value * 10) / 10} -> ${
          Math.round((metric.startTime + metric.value) * 10) / 10
        }`
      );
      break;
    default:
      break;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // fetchに失敗した場合自動再fetchするか
      refetchOnWindowFocus: false, // ブラウザにカーソルが乗った時、自動でfetchするか
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter();
  const validateSession = async () => {
    const user = supabase.auth.user(); // 現在ログインしているユーザ
    if (user && pathname === '/') {
      push('/dashboard');
    } else if (!user && pathname !== '/') {
      await push('/');
    }
  };

  // sessionの状態を検知（ログイン、ログアウトしたかどうか）
  supabase.auth.onAuthStateChange((event, _) => {
    if (event === 'SIGNED_IN' && pathname === '/') {
      push('/dashboard');
    }
    if (event === 'SIGNED_OUT') {
      push('/');
    }
  });

  // ページ遷移した時も確実に処理を通す
  useEffect(() => {
    validateSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
