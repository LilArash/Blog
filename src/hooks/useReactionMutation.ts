import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../api/posts";
import type { PostReactions } from "../types";

export const useReactionMutation() => {
    // const queryClient = useQueryClient()

    // return useMutation(
    //     async ({
    //   postId,
    //   reaction,
    //   reactions,
    // }: {
    //   postId: string
    //   reaction: keyof PostReactions
    //   reactions: PostReactions
    // }) => {
    //   const updatedReactions = { ...reactions, [reaction]: reactions[reaction] + 1 }
    //   return updatePost(postId, { reactions: updatedReactions })
    // },
    // )
        
    
}