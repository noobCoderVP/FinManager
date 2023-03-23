import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "styles/profile.module.css";
import Card from "components/utils/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

import dateFormatter from "components/utils/DateFormatter";

export default function Profile() {
    const [details, setdetails] = useState<any>({
        name: "",
        gender: "",
        joinedAt: "",
    });
    const [wallet, setwallet] = useState<any>({
        limit: 0,
        balance: 1000,
        debt: 0,
    });

    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("email") && !localStorage.getItem("token")) {
            toast("Please register/login first!");
            router.push("/");
        }
        axios
            .get(
                `${process.env.BASE_URL}/user/${localStorage.getItem(
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
                setdetails(result.data.data[0]);
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
                setwallet(result.data.data[0]);
            });
    }, []);
    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <div className={styles.container}>
                <div className="flex flex-row flex-grow-0 flex-wrap flex-shrink-0 min">
                    {details.gender ? (
                        <Image
                            src="/images/male.jpg"
                            width={200}
                            height={150}
                            alt="human image"></Image>
                    ) : (
                        <Image
                            src="/images/female.jpg"
                            width={200}
                            height={150}
                            alt="human image"></Image>
                    )}
                    <section className={styles.details}>
                        <div>
                            <label htmlFor="" className="block">
                                Name
                            </label>
                            <input
                                type="text"
                                disabled
                                value={details.name}
                                onChange={() => {}}
                            />
                        </div>
                        <div>
                            <label htmlFor="" className="block">
                                Email
                            </label>
                            <input
                                type="email"
                                disabled
                                value={details.email}
                                onChange={() => {}}
                            />
                        </div>
                        <div>
                            <label htmlFor="" className="block">
                                Joined At
                            </label>
                            <input
                                type="text"
                                value={dateFormatter(details.joinedAt)}
                                onChange={e => {
                                    setdetails(prev => {
                                        return {
                                            ...prev,
                                            joinedAt: dateFormatter(
                                                prev.joinedAt,
                                            ),
                                        };
                                    });
                                }}
                                disabled
                            />
                        </div>
                    </section>
                </div>
                <section className={styles.wallet}>
                    <h1 className="text-3xl underline underline-offset-2">
                        Wallet
                    </h1>
                    <div className="p-4 border-2 border-black">
                        <Card heading={"Balance"} amount={wallet.balance} />
                        <Card heading={"Debt"} amount={wallet.debt} />
                        <Card heading={"Limit"} amount={wallet.limit} />
                    </div>
                </section>
            </div>
        </>
    );
}
