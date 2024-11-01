import { CommentData } from "@/lib/types";
import { useDeleteCommentMutation } from "./mutations";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";


interface DeleteCommentDialogProps {
    comment: CommentData,
    open: boolean;
    onClose: () => void;
}

export default function DeleteCommentDialog({
    comment,
    onClose,
    open,
}: DeleteCommentDialogProps) {
    const mutation = useDeleteCommentMutation();

    function handleOpenChange(open: boolean) {
        if(!open || !mutation.isPending) {
            onClose();
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent>
            <DialogHeader>
            <DialogTitle>ต้องการลบความคิดเห็นใช่ไหม</DialogTitle>
            <DialogDescription>เมื่อลบความติดเห็นแล้วจะไม่สามารถกู้คืนรายการที่คุณลบได้</DialogDescription>
            </DialogHeader>
          
          <DialogFooter>
            <LoadingButton
              variant="destructive"
              onClick={() => mutation.mutate(comment.id, { onSuccess: onClose })}
              loading={mutation.isPending}
            >
                ลบ
            </LoadingButton>
            <Button variant="outline" onClick={onClose} disabled={mutation.isPending}>
                ยกเลิก
            </Button>
          </DialogFooter>
          </DialogContent>
        </Dialog>
      );
}