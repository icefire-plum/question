import ListSearch from "@/components/ListSearch";
import { StyledContent, StyledFooter, StyledHeader } from "./StyledComponents";
import {
  Button,
  Empty,
  message,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import ListPage from "@/components/ListPage";
import { useRequest, useTitle } from "ahooks";
import useLoadQuestionListData from "@/hooks/useLoadQuestionListData";
import { useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteQuestionsService } from "@/service/question";

const { Title } = Typography;
const { confirm } = Modal;

const Trash = () => {
  useTitle("回收站");

  const {
    data = {},
    loading,
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { run: recover } = useRequest(async () => {}, {
    manual: true,
    debounceWait: 500,
    onSuccess() {
      message.success("恢复成功");
      refresh();
      setSelectedIds([]);
    },
  });

  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionsService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        refresh();
        setSelectedIds([]);
      },
    },
  );

  function del() {
    confirm({
      title: "确认彻底删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "删除以后不可以找回",
      onOk: deleteQuestion,
    });
  }

  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
      // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
  ];
  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            onClick={recover}
          >
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <div style={{ border: "1px solid #e8e8e8" }}>
        <Table
          dataSource={list}
          columns={tableColumns}
          pagination={false}
          rowKey={(q) => q._id}
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys) => {
              setSelectedIds(selectedRowKeys as string[]);
            },
          }}
        />
      </div>
    </>
  );
  return (
    <>
      <StyledHeader>
        <div className="left">
          <Title level={3}>回收站</Title>
        </div>
        <div className="right">
          <ListSearch />
        </div>
      </StyledHeader>
      <StyledContent>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </StyledContent>
      <StyledFooter>
        <ListPage total={total} />
      </StyledFooter>
    </>
  );
};
export default Trash;
