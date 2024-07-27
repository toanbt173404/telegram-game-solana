// src/pages/_app.tsx
import { AppProps } from 'next/app';
import { AuthProvider } from '@/context/auth-context';
import '@/styles/globals.css';
import GameProvider from '@/context/game-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </AuthProvider>
  );
}

export default MyApp;
