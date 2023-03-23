import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import styles from "styles/manage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Form, Input, InputNumber } from "antd";
import dateFormatter from "components/utils/DateFormatter";
import Head from "next/head";

import { Collapse } from "antd";

const { Panel } = Collapse;

export default function Manage() {
    const router = useRouter();
    const [amount, setamount] = useState(0);
    const [balance, setbalance] = useState(0);
    const [date, setdate] = useState("");
    const [t, sett] = useState({ completed: [], incomplete: [] });
    const [w, setw] = useState({ wallet: { debt: 0, balance: 0 } });

    // execute scheduled transaction
    const executeTransaction = async (id: string, amount: number) => {
        if (w.wallet.balance >= amount) {
            updateBalance(-amount);
            await axios.put(
                `${process.env.BASE_URL}/transaction/${id}/`,
                { isComplete: true },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token",
                        )}`,
                    },
                },
            );
            toast("Transaction Executed successfully!!");
            router.reload();
        } else {
            toast("Insufficient balance!");
        }
    };

    const onFinish = async (values: any) => {
        if (w.wallet.balance < values.amount) {
            toast("Insufficient Balance!");
        }
        const d = new Date(date);
        const currentDate = new Date();
        const timing = d.toISOString();
        const email = localStorage.getItem("email");

        let isComplete = true;
        if (d > currentDate) {
            isComplete = false;
            updateDebt(values.amount);
        } else {
            updateBalance(-values.amount);
        }

        const data = { ...values, timing, isComplete, amount, email };
        const result = await axios.post(
            `${process.env.BASE_URL}/transaction/`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );

        if (result.data.code == 200) {
            toast("Transaction added successfully!!");
            router.reload();
        } else {
            toast("Transaction unsuccessful");
        }
    };
    const onFinishFailed = () => {
        toast("Invalid data!");
    };

    const updateBalance = async (balance: number) => {
        const wallet = await axios.get(
            `${process.env.BASE_URL}/wallet/${localStorage.getItem("email")}/`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        const bal = wallet.data.data[0].balance;
        const result = await axios.put(
            `${process.env.BASE_URL}/wallet/${localStorage.getItem("email")}/`,
            { balance: balance + bal },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
    };

    const updateDebt = async (debt: number) => {
        const wallet = await axios.get(
            `${process.env.BASE_URL}/wallet/${localStorage.getItem("email")}/`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        const bal = wallet.data.data[0].debt;
        const result = await axios.put(
            `${process.env.BASE_URL}/wallet/${localStorage.getItem("email")}/`,
            { debt: debt + bal },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
    };
    // transactions
    const addBalance = async () => {
        const con = confirm(
            `do you really want to add ${balance} rupees to your account?`,
        );
        if (con) {
            await updateBalance(balance);
            toast("Updated Balance Successfully!!");
            router.reload();
        }
    };

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
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token",
                            )}`,
                        },
                    },
                )
                .then(result => {
                    const transactions = result.data.data[0];
                    const completed = transactions.filter((elem: any) => {
                        return elem.isComplete === true;
                    });
                    const incomplete = transactions.filter((elem: any) => {
                        return elem.isComplete === false;
                    });
                    sett({
                        completed,
                        incomplete,
                    });
                });
            axios
                .get(
                    `${process.env.BASE_URL}/wallet/${localStorage.getItem(
                        "email",
                    )}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token",
                            )}`,
                        },
                    },
                )
                .then(result => {
                    setw({ wallet: result.data.data[0] });
                });
        }
    }, []);
    return (
        <>
            <Head>
                <title>Manage</title>
            </Head>
            <div className={styles.container}>
                <ToastContainer />
                <div className="flex justify-evenly">
                    <div>
                        <button className="px-2 py-1 text-lg bg-green-600 text-white">
                            Balance
                        </button>
                        <span
                            className="p-2 px-4 bg-white
                    ">
                            {w.wallet.balance}
                        </span>
                        <CurrencyRupeeIcon />
                    </div>
                    <div>
                        <button className="px-2 py-1 text-lg bg-red-700 text-white">
                            Debt
                        </button>
                        <span className="p-2 px-4 bg-white">
                            {w.wallet.debt}
                        </span>
                        <CurrencyRupeeIcon />
                    </div>
                </div>
                <div></div>
                <section>
                    <h2 className="font-bold">Add Transaction</h2>
                    <p className="text-red-600 bg-white border-2 border-black p-2">
                        Transactions having past date will reduce your balance
                        and transactions scheduled in future will increase your
                        debt, which you will have to pay!!!
                    </p>
                    <div>
                        <div className="">
                            <Form
                                className="m-auto pt-4 rounded-xl bg-transparent"
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 400 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off">
                                <Form.Item
                                    className="dark:text-white"
                                    label="Description"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter description!!",
                                        },
                                    ]}>
                                    <Input
                                        type="text"
                                        placeholder="description"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Amount"
                                    name="amount"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter the amount!",
                                        },
                                    ]}>
                                    <InputNumber
                                        placeholder="amount"
                                        max={1000000}
                                        min={1}
                                        value={0}
                                        onChange={value => setamount(value)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Date"
                                    name="timing"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter the date!",
                                        },
                                    ]}>
                                    <input
                                        type="date"
                                        placeholder="date"
                                        required
                                        onChange={e => setdate(e.target.value)}
                                        className="focus:border-none"
                                    />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button
                                        type="primary"
                                        className="bg-red-400 dark:bg-red-700 mt-4 rounded-lg"
                                        htmlType="submit">
                                        Execute
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <div></div>
                    </div>
                </section>
                <section>
                    <h2 className="font-bold">Completed Transactions</h2>
                    <div className="border-2 border-black my-4">
                        <Collapse>
                            {t.completed.length == 0 ? (
                                <p className="text-2xl m-2 p-2">
                                    No transactions
                                </p>
                            ) : (
                                t.completed.map(elem => {
                                    return (
                                        <Panel
                                            header={elem.description}
                                            key={elem._id}
                                            className="border-b-2 border-b-black">
                                            <div>
                                                <button className="p-2 bg-blue-600 text-white m-2">
                                                    Amount
                                                </button>
                                                <span>{elem.amount}</span>
                                            </div>
                                            <div>
                                                <button className="p-2 bg-blue-600 text-white m-2">
                                                    Date
                                                </button>
                                                <span>
                                                    {dateFormatter(elem.timing)}
                                                </span>
                                            </div>
                                        </Panel>
                                    );
                                })
                            )}
                        </Collapse>
                    </div>
                </section>
                <section>
                    <h2 className="font-bold">Scheduled Transactions</h2>
                    <div>
                        <Collapse defaultActiveKey={["0"]}>
                            {t.incomplete.length == 0 ? (
                                <p className="text-2xl m-2 p-2 b-2">
                                    No transactions
                                </p>
                            ) : (
                                t.incomplete.map((elem, index) => {
                                    return (
                                        <Panel
                                            header={elem.description}
                                            key={index}
                                            className="m-2 font-bold border-2 border-red-600">
                                            <div>
                                                <button className="p-2 bg-blue-600 text-white m-2">
                                                    Amount
                                                </button>
                                                <span>{elem.amount}</span>
                                            </div>
                                            <div>
                                                <button className="p-2 bg-blue-600 text-white m-2">
                                                    Date
                                                </button>
                                                <span>
                                                    {dateFormatter(elem.timing)}
                                                </span>
                                            </div>
                                            <div>
                                                <button
                                                    className="p-2 rounded-xl bg-red-600 ml-64 text-white m-2"
                                                    onClick={() =>
                                                        executeTransaction(
                                                            elem._id,
                                                            elem.amount,
                                                        )
                                                    }>
                                                    Execute
                                                </button>
                                            </div>
                                        </Panel>
                                    );
                                })
                            )}
                        </Collapse>
                    </div>
                </section>
                <section>
                    <h2 className="font-bold">Add Balance</h2>
                    <div className="flex justify-center gap-4 items-center">
                        <label htmlFor="balance">Amount</label>
                        <InputNumber
                            id="balance"
                            placeholder="add balance"
                            max={1000000}
                            min={1}
                            value={balance}
                            onChange={value => setbalance(value)}
                        />
                    </div>
                    <button
                        className="bg-green-700 text-white p-2 m-2"
                        onClick={addBalance}>
                        Add Balance
                    </button>
                </section>
            </div>
        </>
    );
}
