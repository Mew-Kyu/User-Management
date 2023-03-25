import { Space, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_USER } from "../../utils/api";
import { headers } from "../../utils/headers";
import { DeleteOutlined } from "@ant-design/icons";

const AdminList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => (
        <Tag color={isAdmin ? "green" : "volcano"}>
          {isAdmin ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <DeleteOutlined
            onClick={() => handleRemoveUser(record._id)}
            style={{ color: "red" }}
          />
        </Space>
      ),
    },
  ];

  const handleGetUsers = async () => {
    setIsLoading(true);
    try {
      const { data: res } = await axios.get(`${BASE_URL_USER}`, {
        headers,
      });
      setUsers(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  // delete
  const handleRemoveUser = async (userId) => {
    try {
      const { data: res } = await axios.delete(
        `${BASE_URL_USER}/${userId}/delete`,
        {
          headers,
        }
      );
      // console.log(res);
      alert(res);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={isLoading}
      rowKey="_id"
    />
  );
};

export default AdminList;
