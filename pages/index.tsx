import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import Head from 'next/head';
import Board from '@/components/board';
import Score from '@/components/score';
import styles from '@/styles/index.module.css';
import { GameContext } from '@/context/game-context';
import gameshiftService from '@/shared/services/gameshift.service';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const { isAuthenticated, email } = useAuth();
  const router = useRouter();
  const { score, resetGame } = useContext(GameContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const submitScore = async () => {
    setLoading(true);
    try {
      const res = await gameshiftService.submitToLeaderBoard(score, email!);
      console.log('res: ', res);
      toast.success('Score submitted successfully!');
      resetGame()
    } catch (error) {
      console.log('error: ', error);
      toast.error('Failed to submit score.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.twenty48}>
      <Head>
        <title>Play 2048</title>
        <meta
          name="description"
          content="Fully-functional 2048 game built in NextJS and TypeScript. Including animations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon16.png" />
      </Head>
      <header>
        <h1>2048</h1>
        <Score />
      </header>
      <main>
        <Board />
        <div className={styles.submitAction}>
        <button onClick={submitScore} className={styles.submitButton} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit to Leaderboard'}
        </button>
        <Link href="/leaderboard">
          <div className={styles.leaderboardLink}>View Leaderboard</div>
        </Link>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Home;
