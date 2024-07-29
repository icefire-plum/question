import ListSearch from "@/components/ListSearch";
import { StyledContent, StyledFooter, StyledHeader } from "./StyledComponents";
import { Empty, Spin, Typography } from "antd";
import QuestionCard from "@/components/QuestionCard";
import { useTitle } from "ahooks";
import useLoadQuestionListData from "@/hooks/useLoadQuestionListData";
import ListPage from "@/components/ListPage";

const { Title } = Typography;

const Star = () => {
  useTitle("星标问卷");
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;
  return (
    <>
      <StyledHeader>
        <div className="left">
          <Title level={3}>星标问卷</Title>
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
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </StyledContent>
      <StyledFooter>
        <ListPage total={total} />
      </StyledFooter>
    </>
  );
};
export default Star;
