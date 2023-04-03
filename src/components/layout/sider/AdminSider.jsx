import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_AUTH } from "../../../utils/api";
import { headers } from "../../../utils/headers";
import { LogoutOutlined } from "@ant-design/icons";
import "./sider.css";
import { useState } from "react";

const { Sider } = Layout;

export const AdminSider = () => {
  const userId = localStorage.getItem("userId");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // log out
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
      localStorage.clear();
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  // handle when click to sidebar collapse
  const handleSidebarCollapse = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={isSidebarCollapsed}
      onCollapse={handleSidebarCollapse}
      breakpoint="sm"
    >
      <LogoutOutlined
        className="logout-item"
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          margin: 16,
          fontSize: "26px",
        }}
        onClick={handleLogout}
      />
      <nav className="menu">
        <ul>
          <li>
            <Link to="/" className="menu-item">
              <TeamOutlined />
              <span className={isSidebarCollapsed ? "hidden" : ""}>Manage</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="menu-item">
              <UserOutlined />
              <span className={isSidebarCollapsed ? "hidden" : ""}>
                Profile
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </Sider>
  );
};
