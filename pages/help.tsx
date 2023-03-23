import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { Button, Form, Input } from "antd";

function Help() {
    const router = useRouter();
    const onFinish = async (values: any) => {
        const d = new Date();
        const timing = d.toISOString();
        const email = localStorage.getItem("email");

        const result = await axios.post(`${process.env.BASE_URL}/query/`, {
            ...values,
            timing,
            email,
        });
        console.log(result);

        if (result.data.code == 200) {
            toast("query sent!!");
        } else {
            toast("Error occured!");
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("email") && !localStorage.getItem("token")) {
            toast("Please register/login first!");
            router.push("/");
        }
    }, []);
    return (
        <>
            <Head>
                <title>help</title>
            </Head>
            <ToastContainer />
            <div className="flex flex-col items-center m-2">
                <section className="bg-white text-black dark:bg-purple-900 dark:text-white w-max p-4">
                    <h2 className="font-bold text-3xl mb-4">
                        Frequently asked questions(FAQs)
                    </h2>
                    <dl>
                        <dt className="font-bold">How to use our website?</dt>
                        <dd>
                            You can add your daily life expenses as transactions
                            and understand how are your expenses as compared to
                            ideal expenses.
                        </dd>

                        <dt className="font-bold mt-4">
                            Who can use our website?
                        </dt>
                        <dd>
                            anybody with age greater than 12 can use our
                            website, childs can also manage their expense on the
                            basis of their pocketmoney.
                        </dd>

                        <dt className="font-bold mt-4">
                            Why to use our website?
                        </dt>
                        <dd>
                            It will help you manage your expenses in the best
                            way, save money for any emergency and for future
                            planing.
                        </dd>
                    </dl>
                </section>
                <section className="mt-8 text-black bg-blue-200 p-4 rounded-xl">
                    <h2 className="text-3xl underline font-bold">Contact Us</h2>
                    <div className="flex flex-wrap">
                        <Image
                            className="m-4"
                            src="/images/receipt.svg"
                            width={200}
                            height={200}
                            alt="money"
                        />
                        <Form
                            className="m-auto mt-4 p-4 pt-8 rounded-xl dark:bg-gray-400 bg-gray-300"
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 400 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off">
                            <Form.Item
                                className="dark:text-white"
                                label="Title"
                                name="title"
                                style={{ color: "white" }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter your query!",
                                    },
                                ]}>
                                <Input
                                    type="text"
                                    placeholder="Title of query"
                                />
                            </Form.Item>
                            <Form.Item
                                className="dark:text-white"
                                label="Description"
                                name="description"
                                style={{ color: "white" }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter description!!",
                                    },
                                ]}>
                                <Input.TextArea
                                    placeholder="description"
                                    rows={4}
                                />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button
                                    type="primary"
                                    className="bg-gray-700 dark:bg-slate-900 mt-4 rounded-lg"
                                    htmlType="submit">
                                    Send Query
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Help;
