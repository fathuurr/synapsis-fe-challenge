import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { updateUserById } from "@/services/user";
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

export function ModalUpdateUser({ user, onClose, onUpdate }: any) {
  const { toast } = useToast();

  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  useEffect(() => {
    if (user) {
      setUpdateData(user);
    }
  }, [user]);

  const onSubmit = async () => {
    try {
      const res = await updateUserById(updateData, user.id);

      if (res.error) {
        toast({
          title: "Error updating user",
          description: res.message,
          className: "bg-red-500",
        });
      } else {
        toast({
          title: "Successfully updated",
          className: "bg-green-500",
        });
        onUpdate(updateData);
        onClose();
      }
    } catch (error: any) {
      toast({
        title: error.message,
        className: "bg-red-500",
      });
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Update your user here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              value={updateData.name}
              onChange={(e) =>
                setUpdateData((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              placeholder="Please enter your name"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="text"
              value={updateData.email}
              onChange={(e) =>
                setUpdateData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              placeholder="Please enter your email"
            />
          </div>

          <div>
            <Label>Gender</Label>
            <Select
              value={updateData.gender}
              onValueChange={(value) =>
                setUpdateData((prevState) => ({
                  ...prevState,
                  gender: value,
                }))
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
              value={updateData.status}
              onValueChange={(value) =>
                setUpdateData((prevState) => ({
                  ...prevState,
                  status: value,
                }))
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
