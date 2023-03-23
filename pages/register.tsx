import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Radio } from "antd";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";

const App: React.FC = () => {
    const [gender, setgender] = useState(true);
    const router = useRouter();

    const onFinish = async (values: any) => {
        const date = new Date();
        const joinedAt = date.toISOString();
        const email = values.email.toLowerCase();
        const data = { ...values, gender, joinedAt, email };

        const result = await axios.post(
            `${process.env.BASE_URL}/user/register`,
            data,
        );

        if (result.data.code == 403) {
            toast("Email already registered!!");
        } else {
            const wallet = await axios.post(`${process.env.BASE_URL}/wallet/`, {
                email,
                balance: 0,
                debt: 0,
                limit: 1000,
            });
            localStorage.setItem("email", values.email);
            localStorage.setItem("token", result.data.data[0]["access token"]);
            router.push("/");
            toast("Registered Successsfully!");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        toast("Please fill the information!");
    };

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <main className="bg-transparent h-min-72">
                <ToastContainer />
                <Form
                    className="m-auto mt-4 p-4 pt-8 rounded-xl dark:bg-gray-400 bg-gray-300"
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
                        label="Name"
                        name="name"
                        style={{ color: "white" }}
                        rules={[
                            { required: true, message: "Enter your name!" },
                        ]}>
                        <Input type="text" placeholder="Your name" />
                    </Form.Item>
                    <Form.Item
                        className="dark:text-white"
                        label="Email"
                        name="email"
                        style={{ color: "white" }}
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}>
                        <Input type="email" placeholder="email" />
                    </Form.Item>
                    <Form.Item
                        className="dark:text-white"
                        label="Profession"
                        name="profession"
                        style={{ color: "white" }}
                        rules={[
                            {
                                required: true,
                                message: "Please input your profession!",
                            },
                        ]}>
                        <Input type="text" placeholder="profession" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}>
                        <Input.Password placeholder="password" />
                    </Form.Item>

                    <Radio.Group
                        className="ml-24"
                        onChange={e => setgender(e.target.value)}
                        value={gender}>
                        <Radio value={true}>Male</Radio>
                        <Radio value={false}>Female</Radio>
                    </Radio.Group>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            className="bg-gray-700 dark:bg-slate-900 mt-4 rounded-lg"
                            htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </main>
        </>
    );
};

export default App;
