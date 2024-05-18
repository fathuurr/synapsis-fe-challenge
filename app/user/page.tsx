"use client";

import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import { ModalAddUser } from "@/components/modal/ModalAddUser";
import { ModalUpdateUser } from "@/components/modal/ModalUpdateUser";
import { AlertModal } from "@/components/modal/alert-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

import { deleteUserById, searchUsers, paginationUser } from "@/services/user";
import { IUser } from "@/types/user";

export default function UserPage() {
  const [user, setUser] = useState<IUser[]>([]);
  const [updateUser, setUpdateUser] = useState<IUser | null>(null);
  const [searchResults, setSearchResults] = useState<IUser[]>([]);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [query, setQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchDataUser = async () => {
      setLoading(true);
      try {
        const res = await paginationUser(
          currentPage.toString(),
          itemsPerPage.toString(),
        );

        setUser(res);
        setTotalPages(res.length);
      } catch (error: any) {
        toast({
          title: error,
          description: "Could not fetch users from API",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDataUser();
  }, [currentPage]);

  const addUserToList = (newUser: IUser) => {
    setUser((prevUsers) => [newUser, ...prevUsers]);
  };

  const handleDelete = async () => {
    const res = await deleteUserById(deleteId);

    if (res.error) {
      toast({
        title: res.message,
      });
    } else {
      toast({
        title: "Successfully deleted",
        variant: "destructive",
      });
      setUser((prevUsers) => prevUsers.filter((user) => user.id !== deleteId));
      setOpen(false);
    }
  };

  const handleUpdate = (updatedUser: IUser) => {
    setUser((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    );
    setUpdateUser(null);
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const results = await searchUsers(query);
      setSearchResults(results);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Could not search users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    handleSearch(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />

      {updateUser && (
        <ModalUpdateUser
          user={updateUser}
          onClose={() => setUpdateUser(null)}
          onUpdate={handleUpdate}
        />
      )}

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-start justify-between">
          <Heading title={`User`} description="Manage user here" />
        </div>

        <ModalAddUser onUserAdded={addUserToList} />

        <Input
          className="w-1/2"
          placeholder="Search user..."
          value={query}
          onChange={handleChange}
        />

        <ScrollArea className="h-[calc(85vh-220px)]">
          {loading ? (
            <div className="flex items-center justify-center mt-10">
              <Loader2 className="animate-spin" size={50} />
            </div>
          ) : (
            user && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {(searchResults.length > 0 ? searchResults : user)?.map(
                  (item) => (
                    <Card key={item.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {item.gender}
                        </CardTitle>

                        {item.status === "active" ? (
                          <Badge variant={"outline"}> 🟢 Active </Badge>
                        ) : (
                          <Badge variant={"outline"}> 🔴 Inactive </Badge>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold"> {item.name} </div>
                        <p className="text-xs text-muted-foreground">
                          {item.email}
                        </p>
                      </CardContent>

                      <CardFooter className="flex justify-between">
                        <Button
                          className="bg-orange-400"
                          onClick={() => setUpdateUser(item)}
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => {
                            setOpen(true);
                            setDeleteId(item.id as string);
                          }}
                          variant="destructive"
                        >
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ),
                )}
              </div>
            )
          )}
        </ScrollArea>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink> {currentPage}</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={`${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
