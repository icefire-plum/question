import { useAppSelector } from "@/store";

function useGetPageInfo() {
  return useAppSelector((state) => state.pageInfo);
}

export default useGetPageInfo;
