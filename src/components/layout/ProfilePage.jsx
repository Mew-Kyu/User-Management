import { Breadcrumb, Layout, theme } from "antd";
import UserProfile from "../pages/profile/UserProfile";
import { AdminSider } from "./sider/AdminSider";
import ChangePassword from "../pages/profile/ChangePassword";

const { Header, Content } = Layout;

const ProfilePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
        minWidth: "100vh",
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
            items={[{ title: "User" }, { title: "Update" }]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <UserProfile />
            <ChangePassword />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
