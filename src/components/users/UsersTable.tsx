/**
 * NOTE:
 * In a real application, this table would be implemented as a reusable system component.
 * It would support pagination, infinite scroll, search, sorting, and filtering,
 * with both client-side and server-side modes configurable.
 */
import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { useGetUsersQuery, useUpdateUserMutation } from '@/features/api/userApi.ts';
import Edit from '@shared/icons/edit.svg?react';
import Delete from '@shared/icons/trash.svg?react';
import Toggle from '@/system-toolkit/Toggle.tsx';
import { User } from '@/types/userTypes.ts';


const columns: Array<ColumnDef<User>> = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'active',
    header: 'Status',
    cell: ({ row }) => {
      const user = row.original;
      const [updateUser] = useUpdateUserMutation();

      const handleToggle = () => {
        updateUser({ id: user.id, active: !user.active });
      };

      return <Toggle isOn={user.active} onToggle={handleToggle} />;
    },
  },
];

type Props = {
  setUserToBeDeleted: Dispatch<SetStateAction<number | null>>
  setSelectedUser: Dispatch<SetStateAction<User | null>>
  userModalController: () => void;
}

const UsersTable: FC<Props> = ({ setUserToBeDeleted, setSelectedUser, userModalController }) => {
  const { data = [], isLoading } = useGetUsersQuery();


  const quickActions: ColumnDef<User> = {
    accessorKey: '_', header: 'Quick actions', cell: ({ row }) => {
      const { original } = row;
      return <div className="flex">
        <Edit onClick={() => {
          setSelectedUser(original);
          userModalController();
        }} className="mr-2 cursor-pointer" />
        <Delete data-testid={`delete-icon-${original.id}`} onClick={() => setUserToBeDeleted(+original.id)}
                className="cursor-pointer" />
      </div>;
    },
  };

  const table = useReactTable({
    data,
    columns: [...columns, quickActions],
    getRowId: row => String(row.id),
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading users...</div>;

  return (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th key={header.id} className="px-4 py-2 text-left border-b text-sm">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody>
      {table.getRowModel().rows.map(row => (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id} className="px-4 py-2 border-b text-sm">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
