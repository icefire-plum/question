import { LOGIN_PATHNAME } from "@/router";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const { username, nickname } = { username: "", nickname: "" };

  function logout() {}
  const UserInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}></Button>
    </>
  );
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;
  return <div>{username ? UserInfo : Login}</div>;
};
export default UserInfo;
