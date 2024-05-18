/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import { ModalAddUser } from "@/components/modal/ModalAddUser";
import { ModalUpdateUser } from "@/components/modal/ModalUpdateUser";
import { AlertModal } from "@/components/modal/alert-modal";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { PaginationComponent } from "@/components/pagination";

import { deleteUserById, searchUsers, paginationUser } from "@/services/user";
import { IUser } from "@/types/user";
import { UserList } from "@/components/user-list";

const UserPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [updateUser, setUpdateUser] = useState<IUser | null>(null);
  const [searchResults, setSearchResults] = useState<IUser[]>([]);

  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [query, setQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 21;

  useEffect(() => {
    fetchDataUser(currentPage, itemsPerPage);
  }, [currentPage]);

  const fetchDataUser = async (page: number, perPage: number) => {
    setLoading(true);
    try {
      const res = await paginationUser(page.toString(), perPage.toString());
      setUsers(res);
      setTotalPages(res.length);
    } catch (error: any) {
      showErrorToast("Could not fetch users from API", error);
    } finally {
      setLoading(false);
    }
  };

  const addUserToList = (newUser: IUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteUserById(deleteId);
      if (res.error) {
        showErrorToast(res.message);
      } else {
        showSuccessDeleteToast("Successfully deleted");
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== deleteId),
        );
        setIsAlertOpen(false);
      }
    } catch (error: any) {
      showErrorToast("Error deleting user", error);
    }
  };

  const handleUpdate = (updatedUser: IUser) => {
    setUsers((prevUsers) =>
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
      showErrorToast("Could not search users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const setDeleteIdAndOpenAlert = (id: string) => {
    setDeleteId(id);
    setIsAlertOpen(true);
  };

  const showErrorToast = (message: string, error?: any) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };

  const showSuccessDeleteToast = (message: string) => {
    toast({
      title: message,
      variant: "destructive",
    });
  };

  return (
    <>
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
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
          <Heading title="User" description="Manage user here" />
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
            <>
              {(searchResults.length > 0 ? searchResults : users).length > 0 ? (
                <UserList
                  users={searchResults.length > 0 ? searchResults : users}
                  onUpdate={setUpdateUser}
                  onDelete={setDeleteIdAndOpenAlert}
                />
              ) : (
                <div className="flex items-center justify-center mt-10">
                  <p>No Data</p>
                </div>
              )}
            </>
          )}
        </ScrollArea>

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default UserPage;
