import React, { useEffect, useState } from "react";
import styles from "styles/analysis.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

function Analysis() {
    const router = useRouter();
    const [data, setdata] = useState({ completed: [], incomplete: [] });
    const [analysis, setanalysis] = useState({
        numbertrans: 0,
        max: 0,
        min: 0,
        average: 0,
        last: 0,
        scheduled: 0,
    });

    useEffect(() => {
        if (!localStorage.getItem("email") && !localStorage.getItem("token")) {
            toast("Please register/login first!");
            router.push("/");
        } else {
            axios
                .get(
                    `${process.env.BASE_URL}/transaction/${localStorage.getItem(
                        "email",
                    )}/`,
                )
                .then(result => {
                    const transactions = result.data.data[0];
                    const completed = transactions.filter((elem: any) => {
                        return elem.isComplete === true;
                    });
                    const incomplete = transactions.filter((elem: any) => {
                        return elem.isComplete === false;
                    });
                    setdata({
                        completed,
                        incomplete,
                    });

                    const scheduled = incomplete.length;
                    const numbertrans = transactions.length;

                    let max = 0;
                    let min = 1000000000;
                    let sum = 0;
                    if (transactions.length == 0) {
                        max = 0;
                        min = 0;
                        sum = 0;
                    } else {
                        for (let i of transactions) {
                            sum += i.amount;
                            max = Math.max(max, i.amount);
                            min = Math.min(min, i.amount);
                        }
                    }
                    let average = Math.round(sum / transactions.length);
                    let last = transactions[0].amount;

                    setanalysis({
                        numbertrans,
                        scheduled,
                        max,
                        min,
                        average,
                        last,
                    });

                    max += data.incomplete.length;
                });
        }
    }, []);
    return (
        <>
            <Head>
                <title>analysis</title>
            </Head>
            <div className={styles.container}>
                <h1>Finance Analysis</h1>
                <div className={styles.analysis}>
                    <div className="flex flex-wrap flex-row flex-grow-0 justify-center gap-4 m-2 p-2 flex-shrink-0">
                        <div className={styles.card}>
                            <h2>Number of transactions</h2>
                            <span>{analysis.numbertrans}</span>
                        </div>
                        <div className={styles.card}>
                            <h2>Maximum value transaction</h2>
                            <span>{analysis.max}</span>
                        </div>
                        <div className={styles.card}>
                            <h2>Minimum value transaction</h2>
                            <span>{analysis.min}</span>
                        </div>
                        <div className={styles.card}>
                            <h2>Last transaction amount</h2>
                            <span>{analysis.last}</span>
                        </div>
                        <div className={styles.card}>
                            <h2>Average transaction value</h2>
                            <span>{analysis.average}</span>
                        </div>
                        <div className={styles.card}>
                            <h2>Number of scheduled transaction</h2>
                            <span>{analysis.scheduled}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Analysis;
