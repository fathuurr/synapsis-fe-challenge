import { Mail, UserCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IComment } from "@/types/posts";

export const CommentCard = ({ comment }: { comment: IComment }) => (
  <Card className="mt-5">
    <CardHeader>
      <CardTitle className="text-lg font-medium flex">
        <UserCircle className="mr-2" /> {comment.name}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>{comment.body}</p>
    </CardContent>
    <CardFooter className="font-light">
      <Mail className="mr-2" /> {comment.email}
    </CardFooter>
  </Card>
);
