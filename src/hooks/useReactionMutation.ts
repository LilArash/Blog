import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { reactionIncrement } from "../api/posts";
import type { Post, ReactionPayload } from "../types";

export const useReactionMutation = (): UseMutationResult<
  Post,
  Error,
  ReactionPayload
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, reaction, reactions }: ReactionPayload) =>
      reactionIncrement(postId, reaction, reactions),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
};
