import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getPostsById } from "@/services/posts";
import { IPosts } from "@/types/posts";
import { ScrollText } from "lucide-react";
import { useEffect, useState } from "react";

const ModalPostDetail = ({ postId }: any) => {
  const [postDetail, setPostDetail] = useState<IPosts>();

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const data = await getPostsById(postId);

        setPostDetail(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Error fetching product detail:", error);
      }
    };

    fetchPostDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mt-5">
          <Button size={"sm"} variant={"outline"}>
            Post Detail
            <ScrollText className="ml-2 text-emerald-500" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-md">{postDetail?.title}</DialogTitle>
        </DialogHeader>

        <DialogDescription>{postDetail?.body}</DialogDescription>

        <p className="text-sm"> Posted by User: {postDetail?.user_id} </p>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPostDetail;
