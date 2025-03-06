import { TableHeader } from "@/types/types";

export const fields: TableHeader[] = [
  {
    title: "First Name",
    key: "first_name",
  },
  {
    title: "Middle Name",
    key: "middle_name",
  },
  {
    title: "Last Name",
    key: "last_name",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Gender",
    key: "gender",
  },
  {
    title: "Birthday",
    key: "birthday",
  },
  {
    title: "Is Admin?",
    key: "is_admin",
  },
  {
    title: "Action",
    key: "action",
    sortable: false,
  },
];
