import styled from "styled-components";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { MANAGE_INDEX_PATHNAME } from "@/router";

const { Paragraph, Title } = Typography;

const Container = styled.div`
  height: calc(100vh - 64px - 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
`;
const Info = styled.div`
  text-align: center;
`;
const Home = () => {
  const nav = useNavigate();
  return (
    <Container>
      <Info>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
        </Paragraph>
        <div>
          <Button
            type="primary"
            style={{ height: "60px", fontSize: "24px" }}
            onClick={() => nav(MANAGE_INDEX_PATHNAME)}
          >
            开始使用
          </Button>
        </div>
      </Info>
    </Container>
  );
};
export default Home;
