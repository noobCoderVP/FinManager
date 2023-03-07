import React from "react";
import { GetServerSideProps } from "next";
import Transaction from "components/utils/Transaction";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import styles from "styles/manage.module.css";

export default function Manage(props) {
    return (
        <div className={styles.container}>
            <div className="flex justify-evenly">
                <div>
                    <button className="px-2 py-1 text-lg bg-green-600 text-white">
                        Balance
                    </button>
                    <span
                        className="p-2 px-4 bg-white
                    ">
                        {100}
                    </span>
                    <CurrencyRupeeIcon />
                </div>
                <div>
                    <button className="px-2 py-1 text-lg bg-red-700 text-white">
                        Debt
                    </button>
                    <span className="p-2 px-4 bg-white">{200}</span>
                    <CurrencyRupeeIcon />
                </div>
            </div>
            <div></div>
            <section>
                <h2 className="font-bold">Add Transaction</h2>
                <div>
                    <div className="w-3/5">
                        <form
                            action=""
                            onClick={e => e.preventDefault()}
                            className="flex flex-col gap-1">
                            <label htmlFor="">Description</label>
                            <input type="text" name="description" />
                            <label htmlFor="">Amount</label>
                            <input type="number" className="self-start" />
                            <button className="bg-blue-600 text-white self-start p-2 mt-4">
                                Execute
                            </button>
                        </form>
                    </div>
                    <div></div>
                </div>
            </section>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            transactions: [
                {
                    description: "Hair cut",
                    date: Date.now().toString(),
                    amount: 200,
                },
                {
                    description: "Something else",
                    date: Date.now().toString(),
                    amount: 200,
                },
            ],
            balance: 200,
            debt: 100,
        },
    };
};
