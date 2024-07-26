import { Layout, Spin } from "antd";
import styled from "styled-components";
import Logo from "@/components/Logo";
import UserInfo from "@/components/UserInfo";
import useLoadUserData from "@/hooks/useLoadUserData";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const StyleHeader = styled(Header)`
  padding: 0 24px;
`;
const LeftDiv = styled.div`
  float: left;
`;
const RightDiv = styled.div`
  float: right;
`;
const ContentLayout = styled(Layout)`
  min-height: calc(100vh - 64px - 70px);
`;
const StyleFooter = styled(Footer)`
  text-align: center;
  background-color: #f7f7f7;
  border-top: 1px solid #e8e8e8;
`;
const MainLayout = () => {
  const { waitingUserData } = useLoadUserData();
  return (
    <Layout>
      <StyleHeader>
        <LeftDiv>
          <Logo />
        </LeftDiv>
        <RightDiv>
          <UserInfo />
        </RightDiv>
      </StyleHeader>
      <ContentLayout>
        <Content>
          {waitingUserData ? (
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              {" "}
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </ContentLayout>
      <StyleFooter>question</StyleFooter>
    </Layout>
  );
};

export default MainLayout;
