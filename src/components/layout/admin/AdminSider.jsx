import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL_AUTH } from "../../../utils/api";
import { headers } from "../../../utils/headers";
import { LogoutOutlined } from "@ant-design/icons";
const { Sider } = Layout;

const AdminSider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userId = localStorage.getItem("userId");
  const removeItem = (item) => {
    localStorage.removeItem(item);
  };

  const handleLogout = async () => {
    try {
      const { data: res } = await axios.post(
        `${BASE_URL_AUTH}/logout`,
        userId,
        {
          headers,
        }
      );
      console.log(res);
      removeItem("accessToken");
      removeItem("userId");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <LogoutOutlined
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          margin: 16,
          fontSize: "26px",
        }}
        onClick={handleLogout}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={[
          {
            key: "1",
            icon: <TeamOutlined />,
            label: <Link to="/">Home</Link>,
          },
          {
            key: "2",
            icon: <UserOutlined />,
            label: <Link to="/profile">Profile</Link>,
          },
        ]}
      />
    </Sider>
  );
};
export { AdminSider };
