import "./layout.css";
import { Breadcrumb, Layout, theme } from "antd";
import AdminList from "../pages/AdminList";
import axios from "axios";
import { AdminSider } from "../layout/sider/AdminSider";
import { headers } from "../../utils/headers";
import { BASE_URL_USER } from "../../utils/api";
import { useState, useEffect } from "react";
import UserList from "../pages/UserList";
const { Header, Content } = Layout;

const ManagePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isAdmin, setIsAdmin] = useState(false);
  const userId = localStorage.getItem("userId");

  // check admin rights
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: res } = await axios.get(
          `${BASE_URL_USER}/user/${userId}`,
          {
            headers,
          }
        );
        setIsAdmin(res.isAdmin);
      } catch (error) {
        throw new Error(error);
      }
    };

    checkAdmin();
  }, [userId]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        minWidth: "110vh",
      }}
    >
      <AdminSider />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
            items={[{ title: "User" }, { title: "Manage" }]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {isAdmin ? <AdminList /> : <UserList />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagePage;
