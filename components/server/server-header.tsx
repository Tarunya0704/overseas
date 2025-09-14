"use client";

import { ServerWithMemebrsWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users, Crown, Shield } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server: ServerWithMemebrsWithProfiles;
    role?: MemberRole;
};

export const ServerHeader = ({
    server,
    role
}: ServerHeaderProps) => {
    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className="w-full text-md font-semibold px-4 flex items-center h-16 border-b border-border/50 hover:bg-secondary/50 transition-all duration-200 group">
                    <div className="flex items-center space-x-3 flex-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-sm">
                                {server.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-foreground group-hover:text-primary transition-colors">
                                {server.name}
                            </span>
                            {role && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    {role === MemberRole.ADMIN && <Crown className="w-3 h-3" />}
                                    {role === MemberRole.MODERATOR && <Shield className="w-3 h-3" />}
                                    {role.toLowerCase()}
                                </span>
                            )}
                        </div>
                    </div>
                    <ChevronDown className="h-5 w-5 ml-auto text-muted-foreground group-hover:text-primary transition-all duration-200 group-hover:rotate-180" />
                </button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className="w-64 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px] shadow-lg border-border/50">
                {isModerator && (
                    <DropdownMenuItem 
                        onClick={() => onOpen("invite", { server })} 
                        className="text-indigo-600 dark:text-indigo-400 px-3 py-3 text-sm cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors"
                    >
                        <UserPlus className="h-4 w-4 mr-3" />
                        Invite People
                    </DropdownMenuItem>
                )}
                
                {isAdmin && (
                    <DropdownMenuItem 
                        onClick={() => onOpen("editServer", { server })}
                        className="px-3 py-3 text-sm cursor-pointer hover:bg-secondary rounded-lg transition-colors"
                    >
                        <Settings className="h-4 w-4 mr-3" />
                        Server Settings
                    </DropdownMenuItem>
                )}
                
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("members", { server })}
                        className="px-3 py-3 text-sm cursor-pointer hover:bg-secondary rounded-lg transition-colors"
                    >
                        <Users className="h-4 w-4 mr-3" />
                        Manage Members
                    </DropdownMenuItem>
                )}
                
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("createChannel")}
                        className="text-indigo-600 dark:text-indigo-400 px-3 py-3 text-sm cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors"
                    >
                        <PlusCircle className="h-4 w-4 mr-3" />
                        Create Channel
                    </DropdownMenuItem>
                )}

                {isModerator && <DropdownMenuSeparator className="bg-border/50" />}

                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("deleteServer", { server })}
                        className="text-rose-500 px-3 py-3 text-sm cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                    >
                        <Trash className="h-4 w-4 mr-3" />
                        Delete Server
                    </DropdownMenuItem>
                )}
                
                {!isAdmin && (
                    <DropdownMenuItem 
                        onClick={() => onOpen("leaveServer", { server })}
                        className="text-rose-500 px-3 py-3 text-sm cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                    >
                        <LogOut className="h-4 w-4 mr-3" />
                        Leave Server
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}