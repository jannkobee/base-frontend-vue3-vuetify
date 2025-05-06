export type Data = {
  current_page: number;
  data?: Object;
  first_page_url?: string;
  from: number;
  last_page: number;
  last_page_url?: string;
  links?: Object;
  next_page_url?: string;
  path?: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
};

type BaseColumnConfig = {
  title: string;
  key: string;
  sortable?: boolean;
  align?: "start" | "end" | "center";
  inputField?: "text" | "radio" | "select" | "checkbox" | "date" | "none";
  inputOptions?: Array<any>;
  nullable?: boolean;
};

type TextLikeColumn = BaseColumnConfig & {
  inputField?: "text" | "checkbox" | "date" | "none";
  inputOptions?: never;
};

type OptionsColumn = BaseColumnConfig & {
  inputField: "radio" | "select";
  inputOptions: Array<{ label: string; value: string }>;
};

export type ColumnConfig = TextLikeColumn | OptionsColumn;

export type User = {
  first_name: string;
  middle_name: string;
  last_name: string;
  initials?: string;
  email: string;
  gender: string;
  birthday: string;
  is_admin: boolean;
};
