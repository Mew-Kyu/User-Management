import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space, Spin } from "antd";
import { useState } from "react";
import axios from "axios";
import { BASE_URL_AUTH } from "../../../utils/api";
import "./login.css";
import { Register } from "./Register";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (e) => {
    setLoading(true);
    const user = {
      username: e.username,
      password: e.password,
    };
    try {
      const { data: res } = await axios.post(`${BASE_URL_AUTH}/login`, user);
      // send token to local storage
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("userId", res._id);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="bg">
      <Space
        className="space"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Spin spinning={loading}>
          <Form
            style={{}}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <h1 className="login-label">Login</h1>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
              </Form.Item>

              {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
            </Form.Item>

            <Form.Item style={{ color: "white" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginBottom: 10 }}
              >
                Log in
              </Button>
              <Register />
            </Form.Item>
          </Form>
        </Spin>
      </Space>
    </div>
  );
};

export default Login;
