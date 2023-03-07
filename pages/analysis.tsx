import React from "react";
import styles from "styles/analysis.module.css";
import Chart from "../components/utils/Chart";

function Analysis() {
    return (
        <div className={styles.container}>
            <h1>Finance Analysis</h1>
            <div className={styles.analysis}>
                <div className="bg-white w-96 m-auto mt-4">
                    <Chart />
                </div>
                <div className="flex flex-wrap flex-row flex-grow-0 justify-center gap-1 p-2 flex-shrink-0">
                    <div className={styles.card}>
                        <h3>Number of transactions</h3>
                        <span>10</span>
                    </div>
                    <div className={styles.card}>
                        <h2>Maximum value transaction</h2>
                        <span>100.00</span>
                    </div>
                    <div className={styles.card}>
                        <h2>Last transaction amount</h2>
                        <span>98</span>
                    </div>
                    <div className={styles.card}>
                        <h2>Average daily spent</h2>
                        <span>12.35</span>
                    </div>
                    <div className={styles.card}>
                        <h2>Credit score</h2>
                        <span>98.00</span>
                    </div>
                    <div className={styles.card}>
                        <h2>Credit score</h2>
                        <span>98.00</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analysis;
