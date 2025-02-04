"use client";

import { ServerWithMemebrsWithProfiles } from "@/app/type";
import { MemberRole  } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger , DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { ChevronDownIcon, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";


interface ServerHeaderProps {
    server: ServerWithMemebrsWithProfiles;
    role?:MemberRole;

};

export const ServerHeader = ({
    server,
    role
}:ServerHeaderProps) => {

    const {onOpen} = useModal();


const isAdmin = role === MemberRole.ADMIN;
const isModerator = isAdmin || role === MemberRole.MODERATOR;


    return (
       <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
            <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
            {server.name}
            <ChevronDownIcon className="h-5 w-5 ml-auto"/>

            </button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">

            {isModerator && (
                <DropdownMenuItem 
                onClick={() => onOpen("invite", {server})} className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursour-pointer">
                    Invite people
                    <UserPlus className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem className="px-3 py-2 text-sm cursour-pointer">
                    Server settings
                    <Settings className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem className="px-3 py-2 text-sm cursour-pointer">
                    Manage members
                   <Users className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
               {isModerator && (
                <DropdownMenuItem className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursour-pointer">
                    Create channel
                    <PlusCircle className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}

            {isModerator && (
                <DropdownMenuSeparator/>
            )}

             {isAdmin && (
                <DropdownMenuItem className=" text-rose-500 px-3 py-2 text-sm cursour-pointer">
                    Delete server
                   <Trash className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
               {!isAdmin && (
                <DropdownMenuItem className=" text-rose-500 px-3 py-2 text-sm cursour-pointer">
                    Leave server
                   <LogOut className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}

        </DropdownMenuContent>


       </DropdownMenu>
    )

}