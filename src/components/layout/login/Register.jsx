import { Button, Checkbox, Form, Input, Modal, Spin, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { BASE_URL_AUTH } from "../../../utils/api";
import { Link } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const Register = () => {
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setOpen(true);
  };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // handle register
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const newUser = {
        username: values.username,
        password: values.password,
        email: values.email,
      };
      await axios.post(`${BASE_URL_AUTH}/register`, newUser);
      messageApi.open({
        type: "success",
        content: "Sign up success",
      });
      setOpen(false);
    } catch (error) {
      const errorMessage = error.response.data;
      messageApi.open({
        type: "error",
        content: errorMessage,
      });
    }
    setLoading(false);
    form.resetFields(); // Clear the form
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <p
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Don't have an account?
        <Link type="primary" onClick={showModal} style={{ marginLeft: 5 }}>
          Register here
        </Link>
      </p>
      <Modal title="Register" open={open} onCancel={handleCancel} footer={[]}>
        <Spin spinning={loading}>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                min: 6,
                message: "Password must be at least 8 characters long",
                },
                {
                  max: 15,
                  message: "Password cannot be more than 30 characters long",
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Pass:"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>Agree to register an account</Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};
