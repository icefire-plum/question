import useGetPageInfo from "@/hooks/useGetPageInfo";
import { useAppDispatch } from "@/store";
import { changePageTitle } from "@/store/pageInfoReducer";
import { EditOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Input, Space, Typography } from "antd";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Title } = Typography;

const TitleElem = () => {
  const { title } = useGetPageInfo();
  const dispatch = useAppDispatch();
  const [editState, setEditState] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTitle(newTitle));
  };

  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      />
    );
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => setEditState(true)}
      />
    </Space>
  );
};

const EditToolbar = () => {
  return <div>工具栏</div>;
};

const SaveButton = () => {
  // const { id } = useParams();
  return <Button>保存</Button>;
};

const PublishButton = () => {
  return <Button>发布</Button>;
};

const StyledHeaderWrapper = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  padding: 12px 0;
`;
const StyledHeader = styled.div`
  display: flex;
  margin: 0 24px;

  h1 {
    font-size: 18px;
    margin-bottom: 0;
    line-height: 1;
  }

  .left {
    flex: 1;
  }

  .main {
    flex: 1;
    text-align: center;
  }

  .right {
    flex: 1;
    text-align: right;
  }
`;
const EditHeader = () => {
  const nav = useNavigate();
  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <div className="left">
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className="main">
          <EditToolbar />
        </div>
        <div className="right">
          {" "}
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </StyledHeader>
    </StyledHeaderWrapper>
  );
};

export default EditHeader;
