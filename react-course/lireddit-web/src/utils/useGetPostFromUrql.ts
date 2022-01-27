import router, { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetPostFromUrql = () => {
  const intId = useGetIntId();
  return usePostQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
};
