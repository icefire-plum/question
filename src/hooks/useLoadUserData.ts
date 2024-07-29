import { getUserInfoService } from "@/service/user";
import { useAppDispatch } from "@/store";
import { loginReducer } from "@/store/userReducer";
import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUserInfo";

function useLoadUserData() {
  const dispath = useAppDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true);
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: (res) => {
      const { username, nickname } = res.data.data;
      dispath(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });
  const { username } = useGetUserInfo();
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    }
    run();
  }, []);
  return { waitingUserData };
}
export default useLoadUserData;
