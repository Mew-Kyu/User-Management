import { Form, Input, Button, message, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL_USER } from "../../../utils/api";
import { headers } from "../../../utils/headers";
import "./userprofile.css";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);

  // get user logged
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: res } = await axios.get(
          `${BASE_URL_USER}/user/${userId}`,
          {
            headers,
          }
        );
        setCurrentUser(res);
        setLoading(false);
      } catch (error) {}
    };
    getCurrentUser();
  }, [userId]);

  if (loading) {
    return <Spin />;
  }

  // update info user
  const handleUpdateUser = async (values) => {
    try {
      const { data: res } = await axios.put(
        `${BASE_URL_USER}/${userId}/update`,
        values,
        {
          headers,
        }
      );
      messageApi.success(res);
    } catch (error) {
      messageApi.error(error.message);
    }
  };

  // format time create
  const timestampCreate = currentUser.createdAt;
  const dateCreate = new Date(timestampCreate);
  const formattedDateCreate = `${dateCreate.getFullYear()}-${(
    "0" +
    (dateCreate.getMonth() + 1)
  ).slice(-2)}-${("0" + dateCreate.getDate()).slice(-2)} ${(
    "0" + dateCreate.getHours()
  ).slice(-2)}:${("0" + dateCreate.getMinutes()).slice(-2)}:${(
    "0" + dateCreate.getSeconds()
  ).slice(-2)}`;
  // format time update
  const timestampUpdate = currentUser.updatedAt;
  const dateUpdate = new Date(timestampUpdate);
  const formattedDateUpdate = `${dateUpdate.getFullYear()}-${(
    "0" +
    (dateUpdate.getMonth() + 1)
  ).slice(-2)}-${("0" + dateUpdate.getDate()).slice(-2)} ${(
    "0" + dateUpdate.getHours()
  ).slice(-2)}:${("0" + dateUpdate.getMinutes()).slice(-2)}:${(
    "0" + dateUpdate.getSeconds()
  ).slice(-2)}`;

  return (
    <>
      {contextHolder}
      <div className="user-profile-container">
        <h1
          className="user-profile-title"
          style={{ marginBottom: "20px", fontSize: 25, color: "#4169E1" }}
        >
          Change Information
        </h1>
        <Form
          className="user-form"
          onFinish={handleUpdateUser}
          initialValues={{
            email: currentUser.email,
            username: currentUser.username,
          }}
          style={{ border: "1px solid #ccc", padding: "20px" }}
        >
          <Form.Item
            label="My Email"
            name="email"
            style={{ marginBottom: "10px" }}
          >
            <Input style={{ float: "right", width: "172vh" }} />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            style={{ marginBottom: "10px" }}
          >
            <Input style={{ float: "right", width: "172vh" }} />
          </Form.Item>
          <Form.Item label="Created At" style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "16px", fontWeight: "bold" }}>
              {formattedDateCreate}
            </label>
          </Form.Item>
          <Form.Item label="Updated At" style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "16px", fontWeight: "bold" }}>
              {formattedDateUpdate}
            </label>
          </Form.Item>
          <Form.Item style={{ marginTop: "20px" }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UserProfile;
