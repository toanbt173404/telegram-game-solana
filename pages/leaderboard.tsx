import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GameShiftService from '@/shared/services/gameshift.service';
import Head from 'next/head';
import styles from '@/styles/leaderboard.module.css';

type UniqueAsset = {
    id: string;
    collection: {
        id: string;
        name: string;
        description: string;
        environment: string;
        imageUrl: string;
        imported: boolean;
        mintAddress: string;
        created: number;
    };
    created: number;
    attributes: Array<{
        value: string;
        traitType: string;
    }>;
    name: string;
    description: string;
    environment: string;
    escrow: boolean;
    imageUrl: string;
    imported: boolean;
    priceCents: number | null;
    status: string;
    mintAddress: string;
    owner: {
        address: string;
        referenceId: string;
    };
};

const Leaderboard = () => {
    const [uniqueAssets, setUniqueAssets] = useState<UniqueAsset[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const data = await GameShiftService.fetchLeaderBoard();
                const filteredAssets = data.data.data.filter((item: any) => item.type === 'UniqueAsset');
                setUniqueAssets(filteredAssets.map((item: any) => item.item));
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
                setError('Failed to fetch items');
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
    }, []);

    const handleBackToGame = () => {
        router.push('/');
    };

    return (
        <div className={styles.leaderboard}>
            <Head>
                <title>Leaderboard</title>
                <meta name="description" content="Leaderboard for the 2048 game built in NextJS and TypeScript." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <h1>Leaderboard</h1>
            </header>

            <button onClick={handleBackToGame} className={styles.backButton}>Back to Game</button>
            <main>
                {loading ? (
                    <div className={styles.spinner}></div>
                ) : (
                    <>
                        {error && <p className={styles.error}>{error}</p>}
                        <table className={styles.lbTable}>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>User ID</th>
                                    <th>Mint Address</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uniqueAssets
                                    .sort((a, b) => {
                                        const scoreA = parseInt(a.attributes?.find(attr => attr.traitType === 'score')?.value || '0', 10);
                                        const scoreB = parseInt(b.attributes?.find(attr => attr.traitType === 'score')?.value || '0', 10);
                                        return scoreB - scoreA;
                                    })
                                    .map((asset, index) => (
                                        <tr key={asset.id}>
                                            <td>{index + 1}</td>
                                            <td
                                              style={{
                                                textOverflow: 'ellipsis',
                                                maxWidth: '150px',
                                                overflow: 'hidden'
                                              }}
                                            >
                                              {asset.owner.referenceId}
                                            </td>
                                            <td>
                                                <a
                                                    href={`https://explorer.solana.com/address/${asset.mintAddress}?cluster=devnet`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {asset.mintAddress.slice(0, 6) + '...'}
                                                </a>
                                            </td>
                                            <td>{asset.attributes?.find(attr => attr.traitType === 'score')?.value}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </>
                )}
            </main>
        </div>
    );
};

export default Leaderboard;
