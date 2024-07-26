import { LIST_SEARCH_PARAM_KEY } from "@/constant";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const { Search } = Input;

const ListSearch = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState("");

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    setValue(curVal);
  }, [searchParams]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSearch = () => {
    nav({ pathname, search: `${LIST_SEARCH_PARAM_KEY}=${value}` });
  };
  return (
    <Search
      size="large"
      allowClear
      placeholder="输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: "260px" }}
    />
  );
};

export default ListSearch;
