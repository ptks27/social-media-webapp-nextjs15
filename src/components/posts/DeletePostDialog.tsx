import { PostData } from "@/lib/types";
import { useDeletePostMutation } from "./mutations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";

interface DeletePostDialogPops {
  post: PostData;
  open: boolean;
  onClose: () => void;
}

export default function DeletePostDialog({
  post,
  open,
  onClose,
}: DeletePostDialogPops) {
  const mutation = useDeletePostMutation();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
        <DialogTitle>ต้องการลบใช่ไหม</DialogTitle>
        <DialogDescription>ไม่สามารถกู้คืนรายการที่คุณลบได้</DialogDescription>
        </DialogHeader>
      
      <DialogFooter>
        <LoadingButton
          variant="destructive"
          onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
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
