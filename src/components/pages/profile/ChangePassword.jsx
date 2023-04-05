import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { BASE_URL_USER } from "../../../utils/api";
import { headers } from "../../../utils/headers";
import "./userprofile.css";

const ChangePassword = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const userId = localStorage.getItem("userId");

  // change user password
  const handleChangePassword = async (values) => {
    try {
      const { data: res } = await axios.put(
        `${BASE_URL_USER}/${userId}/change-password`,
        values,
        {
          headers,
        }
      );
      messageApi.success(res);
    } catch (error) {
      messageApi.error(error.response.data);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="user-profile-container">
        <Form
          onFinish={handleChangePassword}
          style={{ border: "1px solid #ccc", padding: "20px" }}
        >
          <h2 style={{ marginBottom: "10px", fontSize: 20, color: "#4169E1" }}>
            Change Password
          </h2>
          <Form.Item
            label="Current Password"
            name="currentPassword"
            labelCol={{ span: 3 }}
            rules={[
              { required: true, message: "Please enter your current password" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            labelCol={{ span: 3 }}
            rules={[
              { required: true, message: "Please enter your new password" },
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
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password:"
            labelCol={{ span: 3 }}
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;
