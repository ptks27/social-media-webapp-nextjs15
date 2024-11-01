import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { deleteComment, submitComment } from "./action";
import { CommentData, CommentsPage } from "@/lib/types";
import { pages } from "next/dist/build/templates/app-page";

export function useSubmitCommentMutation(postId: string) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitComment,
    onSuccess: async (newComment) => {
      const queryKey: QueryKey = ["comments", postId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  previousCursor: firstPage.previousCursor,
                  comments: [...firstPage.comments, newComment],
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );
      queryClient.invalidateQueries({
        queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });
      toast({
        description: "แสดงความคิดเห็นแล้ว",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "แสดงความคิดเห็นไม่สำเร็จ กรุณาลองใหม่อีกครั้ง!",
      });
    },
  });
  return mutation;
}

export function useDeleteCommentMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async (deletedComment) => {
      const queryKey: QueryKey = ["comments",deletedComment.postId]

      await queryClient.cancelQueries({queryKey})

      queryClient.setQueryData<InfiniteData<CommentsPage,string|null>>(
        queryKey,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              previousCursor: page.previousCursor,
              comments:page.comments.filter(c => c.id !== deletedComment.id)
            }))
          }
        }
      )
      toast({
        description: "ลบความคิดเห็นแล้ว"
      })
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "ลบความคิดเห็นไม่สำเร็จ! กรุณาลองใหม่อีกครั้ง",
      });
    },
  });
  return mutation;
}