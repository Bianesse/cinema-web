import { ColumnDef } from "@tanstack/react-table";
import { UserType } from "@/types";
import { Eye } from "lucide-react";
import React from "react";
import { FC } from 'react';

export default function getUsersColumns({
    EditUserModal,
    DeleteAlert,
    handleDelete,
    fetchUsers,
}: {
    EditUserModal: FC<{user: UserType; fetchUsers: () => void}>;
    DeleteAlert: FC<{handleDelete: () => void}>;
    handleDelete: (id: number) => void;
    fetchUsers: () => void;
}): ColumnDef<UserType>[] {
    return [
        {
            header: "Name",
            accessorKey: "name",
            cell: ({ row }) => {
                return(
                    <p className=" text-amber-900">{row.original.name}</p>
                )
            }
        },
        {
            header: "Email",
            accessorKey: "email",
            cell: ({ row }) => {
                return(
                    <p className=" text-amber-900">{row.original.email}</p>
                )
            }
        },
        {
            header: "Phone",
            accessorKey: "phone",
            cell: ({ row }) => {
                return(
                    <p className=" text-amber-900">{row.original.phone}</p>
                )
            }
        },
        {
            header: "Role",
            accessorKey: "role",
            cell: ({ row }) => {
                return(
                    <p className=" text-amber-900">{row.original.role}</p>
                )
            }
        },
        {
            header: "Actions",
            accessorKey: "actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <EditUserModal user={row.original} fetchUsers={fetchUsers} />
                    <DeleteAlert handleDelete={() => handleDelete(row.original.id)} />
                </div>
            ),
        },
    ]
}