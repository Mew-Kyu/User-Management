import { Table, Tag, Input, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_USER } from "../../utils/api";
import { headers } from "../../utils/headers";
const { Search } = Input;

const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // table structure
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <p style={{ color: "#007BA7" }}>{text}</p>,
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

  // get user to table
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

  // search user
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "center" }}>
        <Search
          placeholder="Search by username or email"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginBottom: "16px", width: 800 }}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        loading={isLoading}
        rowKey="_id"
      />
    </>
  );
};

export default UserList;
