import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space, Spin, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { BASE_URL_AUTH } from "../../../utils/api";
import "./login.css";
import { Register } from "./Register";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [rememberMe, setRememberMe] = useState(true);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Logged in successfully",
    });
  };

  // handle login
  const onFinish = async (e) => {
    setLoading(true);
    const user = {
      username: e.username,
      password: e.password,
    };
    try {
      const { data: res } = await axios.post(`${BASE_URL_AUTH}/login`, user);
      if (rememberMe) {
        // send token to local storage
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("userId", res._id);
      } else {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("userId", res._id);
      }
      window.location.href = "/";
      success();
    } catch (error) {
      const errorMessage = error.response.data;
      messageApi.open({
        type: "error",
        content: errorMessage,
      });
    }
    setLoading(false);
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <>
      {contextHolder}
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
                  <Checkbox
                    style={{ color: "white" }}
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  >
                    Remember me
                  </Checkbox>
                </Form.Item>
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
    </>
  );
};

export default Login;
