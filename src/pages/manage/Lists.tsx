import styled from "styled-components";
import { Typography } from "antd";
import ListSearch from "@/components/ListSearch";
import { useRequest, useTitle } from "ahooks";
import { useEffect, useState } from "react";
import QuestionCard from "@/components/QuestionCard";
import { getQuestionListService } from "@/service/question";

const { Title } = Typography;

const StyledHeader = styled.div`
  display: flex;
  margin-bottom: 20px;

  .left {
    flex: 1;
  }

  .right {
    flex: 1;
    text-align: right;
  }
`;
const StyledContent = styled.div`
  margin-bottom: 20px;
`;
const StyledFooter = styled.div`
  text-align: center;
`;
const List = () => {
  useTitle("问卷-我的问卷");

  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  console.log(total);
  const [page, setPage] = useState(1);

  const { run: load } = useRequest(
    async () => await getQuestionListService({}),
    {
      manual: true,
      onSuccess(res) {
        const { list: l = [], total = 0 } = res;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    },
  );
  useEffect(() => {
    load();
  }, []);
  return (
    <>
      <StyledHeader>
        <div className="left">
          <Title level={3}>我的问卷</Title>
        </div>
        <div className="right">
          <ListSearch />
        </div>
      </StyledHeader>
      <StyledContent>
        {list.length &&
          list.map((q: Record<string, any>) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </StyledContent>
      <StyledFooter>load more</StyledFooter>
    </>
  );
};
export default List;
