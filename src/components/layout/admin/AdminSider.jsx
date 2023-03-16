import {
  // FileOutlined,
  // PieChartOutlined,
  UserOutlined,
  // DesktopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
const { Sider } = Layout;

const AdminSider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
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
