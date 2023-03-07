import Head from "next/head";
import styles from "styles/home.module.css";
import Image from "next/image";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Finmanager</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1 className="animate-bounce">Welcome to FinManager!!!</h1>
                    <p className="w-96 px-8 pb-4 text-center -mt-4">
                        Are you looking to know your daily life financial
                        routine? aren't you curious to analyse how much you
                        spent on average each day? Would you like to manage your
                        finance to utilize your money in the best way? If yes,
                        you are at the right place!!!
                    </p>
                </div>
                <div>
                    <Image
                        src="/images/receipt.svg"
                        width={200}
                        height={200}
                        alt="money"
                    />
                    <Image
                        src="/images/foot.svg"
                        width={150}
                        height={200}
                        alt="money"
                    />
                </div>
            </div>
        </>
    );
}
