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

export type TableHeader = {
  title: string;
  key: string;
  sortable?: boolean;
  align?: "start" | "end" | "center";
};

export type User = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  gender: string;
  birthday: string;
  is_admin: boolean;
};
