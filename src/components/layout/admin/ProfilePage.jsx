import { Breadcrumb, Layout, theme } from "antd";
import UserProfile from "../../pages/UserProfile";
import { AdminSider } from "./AdminSider";
const { Header, Content } = Layout;

const ProfilePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <AdminSider />
      <Layout className="site-layout">
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
            items={[{ title: "User" }, { title: "Bill" }]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <UserProfile />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default ProfilePage;
