import { createQuestionService } from "@/service/question";
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, message, Space } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 24px 0;
  /* width: 1200px; */
  margin: 0 auto;
  display: flex;
  .left {
    width: 120px;
  }
  .right {
    flex: 1;
    margin-left: 60px;
  }
`;
const ManageLayout = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const { run: handleCreateClick, loading } = useRequest(
    createQuestionService,
    {
      manual: true,
      onSuccess(res) {
        nav(`/question/edit/${res.id}`);
        message.success("创建成功");
      },
    },
  );
  return (
    <StyledContainer>
      <div className="left">
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav("/manage/list")}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav("/manage/star")}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav("/manage/trash")}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </StyledContainer>
  );
};

export default ManageLayout;
