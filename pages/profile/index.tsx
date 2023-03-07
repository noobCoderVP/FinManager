import React from "react";
import Image from "next/image";
import styles from "styles/profile.module.css";
import type { GetServerSideProps } from "next";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import Card from "components/utils/Card";

interface Details {
    name: string;
    email: string;
    gender: boolean;
}

export default function Profile(props: Details) {
    console.log(props);
    return (
        <div className={styles.container}>
            <div className="flex flex-row flex-grow-0 flex-wrap flex-shrink-0 min">
                <Image
                    src="/images/man.jpg"
                    width={200}
                    height={150}
                    alt="human image"></Image>
                <section className={styles.details}>
                    <div>
                        <label htmlFor="" className="block">
                            Name
                        </label>
                        <input type="text" disabled value={props.name} />
                    </div>
                    <div>
                        <label htmlFor="" className="block">
                            Email
                        </label>
                        <a href="">
                            <input type="email" disabled value={props.email} />
                        </a>
                    </div>
                    <div>
                        <label htmlFor="">Gender</label>
                        {props.gender ? (
                            <MaleIcon
                                style={{ color: "lightgoldenrodyellow" }}
                            />
                        ) : (
                            <FemaleIcon />
                        )}
                    </div>
                    <button className="px-4 py-1 bg-blue-600 text-white hover:bg-blue-500 self-end">
                        Edit
                    </button>
                </section>
            </div>
            <section className={styles.wallet}>
                <h1>Wallet</h1>
                <div>
                    <Card heading={"Balance"} amount={100} />
                    <Card heading={"Debt"} amount={200} />
                    <Card heading={"Limit"} amount={80} />
                </div>
            </section>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            name: "Vaibhav patel",
            email: "vaibhavpatel02892@gmail.com",
            gender: true,
        },
    };
};
