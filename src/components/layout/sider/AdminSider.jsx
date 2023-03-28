import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_AUTH } from "../../../utils/api";
import { headers } from "../../../utils/headers";
import { LogoutOutlined } from "@ant-design/icons";
import "./sider.css";

const { Sider } = Layout;

export const AdminSider = () => {
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
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sider>
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
      <nav className="menu">
        <ul>
          <li>
            <Link to="/" className="menu-item">
              <TeamOutlined />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="menu-item">
              <UserOutlined />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </Sider>
  );
};
