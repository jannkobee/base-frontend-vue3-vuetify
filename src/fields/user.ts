import { ColumnConfig } from "@/types/types";

export const fields: ColumnConfig[] = [
  {
    title: "First Name",
    key: "first_name",
    inputField: "text",
    nullable: false,
  },
  {
    title: "Middle Name",
    key: "middle_name",
    inputField: "text",
    nullable: true,
  },
  {
    title: "Last Name",
    key: "last_name",
    inputField: "text",
    nullable: false,
  },
  {
    title: "Email",
    key: "email",
    inputField: "text",
    nullable: false,
  },
  {
    title: "Gender",
    key: "gender",
    inputField: "radio",
    inputOptions: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
    ],
    nullable: false,
  },
  {
    title: "Birthday",
    key: "birthday",
    inputField: "date",
    nullable: false,
  },
  {
    title: "Is Admin?",
    key: "is_admin",
    inputField: "checkbox",
    nullable: false,
  },
  {
    title: "Action",
    key: "action",
    sortable: false,
    inputField: "none",
  },
];
