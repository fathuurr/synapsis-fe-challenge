import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { addUser } from "@/services/user";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function ModalAddUser({ onUserAdded }: any) {
  const { toast } = useToast();
  const [addData, setAddData] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async () => {
    try {
      const res = await addUser(addData);

      if (res.error) {
        toast({
          title: "Error adding user",
          description: res.message,
          className: "bg-red-500",
        });
      } else {
        toast({
          title: "Successfully added",
          className: "bg-green-500",
        });
        onUserAdded(res);
        setIsOpen(false);
        setAddData({ name: "", email: "", gender: "", status: "" }); // Clear form
      }
    } catch (error: any) {
      toast({
        title: error.message,
        className: "bg-red-500",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} onClick={() => setIsOpen(true)}>
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Add user here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              value={addData.name}
              onChange={(e) => setAddData({ ...addData, name: e.target.value })}
              placeholder="Please enter your name"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="text"
              value={addData.email}
              onChange={(e) =>
                setAddData({ ...addData, email: e.target.value })
              }
              placeholder="Please enter your email"
            />
          </div>

          <div>
            <Label>Gender</Label>
            <Select
              value={addData.gender}
              onValueChange={(value) =>
                setAddData({ ...addData, gender: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Status</Label>
            <Select
              value={addData.status}
              onValueChange={(value) =>
                setAddData({ ...addData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="active">🟢 Active</SelectItem>
                  <SelectItem value="inactive">🔴 Inactive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
