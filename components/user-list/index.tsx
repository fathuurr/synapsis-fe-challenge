import { IUser } from "@/types/user";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const UserList = ({
  users,
  onUpdate,
  onDelete,
}: {
  users: IUser[];
  onUpdate: (user: IUser) => void;
  onDelete: (id: string) => void;
}) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {users.map((user) => (
      <Card key={user.id}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{user.gender}</CardTitle>
          <Badge variant="outline">
            {user.status === "active" ? "🟢 Active" : "🔴 Inactive"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.name}</div>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="bg-orange-400" onClick={() => onUpdate(user)}>
            Update
          </Button>
          <Button
            variant="destructive"
            onClick={() => onDelete(user.id as string)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    ))}
  </div>
);
