import { useAppSelector } from "@/store";

function useGetUserInfo() {
  const { username, nickname } = useAppSelector((state) => state.user);
  return { username, nickname };
}
export default useGetUserInfo;
