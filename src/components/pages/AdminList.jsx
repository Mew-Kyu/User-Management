import { Space, Table, Tag, Input, message, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_USER } from "../../utils/api";
import { headers } from "../../utils/headers";
import {
  DeleteOutlined,
  UserSwitchOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

const { Search } = Input;
const { confirm } = Modal;

const AdminList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

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
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <UserSwitchOutlined
            checked={record.isAdmin}
            onClick={() => showConfirmRole(record)}
          />
          <DeleteOutlined
            onClick={() => showConfirmDelete(record)}
            style={{ color: "red" }}
          />
        </Space>
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

  // delete user
  const handleRemoveUser = async (userId) => {
    try {
      const { data: res } = await axios.delete(
        `${BASE_URL_USER}/${userId}/delete`,
        {
          headers,
        }
      );
      messageApi.success(res);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      throw new Error(error);
    }
  };

  // confirm delete modal
  const showConfirmDelete = (record) => {
    confirm({
      title: "Do you want to delete this user?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleRemoveUser(record._id);
      },
    });
  };
  // confirm change role modal
  const showConfirmRole = (record) => {
    confirm({
      title: "Do you want to change the role of this user?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleRoleUpdate(record);
      },
    });
  };

  // update role
  const handleRoleUpdate = async (record) => {
    const isAdmin = !record.isAdmin;
    try {
      const { data: res } = await axios.put(
        `${BASE_URL_USER}/${record._id}/update-role`,
        { isAdmin },
        {
          headers,
        }
      );
      messageApi.success(res);
      handleGetUsers();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      {contextHolder}
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

export default AdminList;
