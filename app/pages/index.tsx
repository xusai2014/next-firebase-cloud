import Head from 'next/head'
// @ts-ignore
import styles from '../styles/Home.module.css';
import useSWR from "swr";
import Link from "next/link";
import {generatePosts} from "../helpers";

const FirestoreBlogPostsURL = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts?mask.fieldPaths=blurb&mask.fieldPaths=title`;
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
    const {data, error} = useSWR(FirestoreBlogPostsURL, fetcher);
    const posts = generatePosts(data);

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <div className="grid">
                    {error && <div>Failed to load</div>}
                    {!data && <div>Loading Blog Posts...</div>}
                    {data &&
                    posts.map((post) => (
                        <Link
                            href="blog/[pid]"
                            as={`/blog/${post.pid}`}
                            key={`${post.pid}`}
                        >
                            <a className="card">
                                <h3>{post.title} &rarr;</h3>
                                <p>{post.blurb}</p>
                            </a>
                        </Link>
                    ))}
                </div>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className={styles.description}>
                    Get started by editing{' '}
                    <code className={styles.code}>pages/index.js</code>
                </p>

                <div className={styles.grid}>
                    <a href="https://nextjs.org/docs" className={styles.card}>
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h3>Learn &rarr;</h3>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/master/examples"
                        className={styles.card}
                    >
                        <h3>Examples &rarr;</h3>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                    >
                        <h3>Deploy &rarr;</h3>
                        <p>
                            Instantly deploy your Next.js site to a public URL with Vercel.
                        </p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo}/>
                </a>
            </footer>
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {},
    };
}
