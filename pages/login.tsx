import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Head from "next/head";

const onFinish = (values: any) => {
    console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

const App: React.FC = () => (
    <>
        <Head>
            <title>Finmanager</title>
        </Head>
        <Form
            className="m-auto mt-8 p-4 pt-8 rounded-xl dark:bg-gray-400 bg-gray-300"
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

export default App;
