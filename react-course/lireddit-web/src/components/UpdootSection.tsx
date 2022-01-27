import { ApolloCache } from "@apollo/client";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton, useWhyDidYouUpdate } from "@chakra-ui/react";
import React, { useState } from "react";
import { gql } from "urql";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    console.log("newPoints: ", data.points, " value: ", value);
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { id: postId, points: newPoints, voteStatus: value } as any,
    });
  }
};

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [vote] = useVoteMutation();

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        w={7}
        h={7}
        aria-label="updoot post"
        icon={<ChevronUpIcon />}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        onClick={async () => {
          setLoadingState("updoot-loading");
          await vote({
            variables: {
              postId: post.id,
              value: 1,
            },
            update: (cache, { data }) => {
              updateAfterVote(1, post.id, cache);
            },
          }),
            setLoadingState("not-loading");
        }}
        isLoading={loadingState === "updoot-loading"}
      />
      {post.points}

      <IconButton
        w={7}
        h={7}
        aria-label="downdoot post"
        icon={<ChevronDownIcon />}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        onClick={async () => {
          setLoadingState("downdoot-loading");
          await vote({
            variables: {
              postId: post.id,
              value: -1,
            },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downdoot-loading"}
      />
    </Flex>
  );
};

export default UpdootSection;
