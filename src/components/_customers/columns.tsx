// components/columns.ts
import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Função",
  },
];
