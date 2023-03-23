import React from "react";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

const App: React.FC = () => {
    const router = useRouter();
    const onFinish = async (values: any) => {
        const email = values.email.toLowerCase();

        const result = await axios.post(`${process.env.BASE_URL}/user/login`, {
            ...values,
            email,
        });

        if (result.data.code == 403) {
            toast("Invalid email or password!!");
        } else {
            router.push(`/`);
            localStorage.setItem("email", values.email);
            localStorage.setItem("token", result.data.data[0]["access token"]);
            location.href = process.env.WEB_URL + "/";
            toast("Logged Successsfully!");
        }
    };
    return (
        <>
            <Head>
                <title>login</title>
            </Head>
            <Form
                className="m-auto mt-8 p-4 pt-8 rounded-xl dark:bg-gray-400 bg-gray-300"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item
                    className="dark:text-white"
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                    ]}>
                    <Input type="email" placeholder="email" />
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

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        className="bg-gray-700 dark:bg-slate-900 mt-4 rounded-lg"
                        htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default App;
