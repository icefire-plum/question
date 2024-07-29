import { Empty, Spin, Typography } from "antd";
import ListSearch from "@/components/ListSearch";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { useEffect, useMemo, useRef, useState } from "react";
import QuestionCard from "@/components/QuestionCard";
import { getQuestionListService } from "@/service/question";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "@/constant";
import { useSearchParams } from "react-router-dom";
import { StyledContent, StyledFooter, StyledHeader } from "./StyledComponents";

const { Title } = Typography;

const List = () => {
  useTitle("问卷-我的问卷");

  const [started, setStarted] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const haveMoreData = total > list.length;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  const { run: load, loading } = useRequest(
    async () =>
      await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      }),
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

  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) {
        return;
      }
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        load();
        setStarted(true);
      }
    },
    { wait: 1000 },
  );

  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }
    return () => window.removeEventListener("scroll", tryLoadMore);
  }, [searchParams, haveMoreData]);

  const LoadMoreCotentElem = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多数据</span>;
    return <span>开始加载下一页</span>;
  }, [started, loading, haveMoreData]);
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
      <StyledFooter>
        <div ref={containerRef}>{LoadMoreCotentElem}</div>
      </StyledFooter>
    </>
  );
};
export default List;
