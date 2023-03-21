import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { useState } from "react";
import axios from "axios";
import { BASE_URL_AUTH } from "../../utils/api";
import "./login.css";
const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (e) => {
    setLoading(true);
    const user = {
      email: e.email,
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
    <Space
      className="bg"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Form
        style={{}}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </Space>
  );
};
export default Login;
