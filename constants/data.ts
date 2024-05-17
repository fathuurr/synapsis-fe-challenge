import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Employee",
    href: "/employee",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Comments",
    href: "/comments",
    icon: "comment",
    label: "comment",
  },
];
