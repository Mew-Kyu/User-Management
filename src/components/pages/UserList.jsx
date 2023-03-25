import { Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_USER } from "../../utils/api";
import { headers } from "../../utils/headers";

const UserList = () => {
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

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={isLoading}
      rowKey="_id"
    />
  );
};

export default UserList;
