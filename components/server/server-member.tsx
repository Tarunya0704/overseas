"use client";

import { Member, Profile, Server } from "@prisma/client";
import { MemberRole } from "@prisma/client";
import { ShieldAlert, ShieldCheck, Crown, Shield } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserAvatar } from "../user-avatar";

interface ServerMemberProps {
    member: Member & { profile: Profile };
    server: Server;
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <Shield className="h-4 w-4 ml-2 text-indigo-500" />,
    [MemberRole.ADMIN]: <Crown className="h-4 w-4 ml-2 text-amber-500" />
}

const roleColorMap = {
    [MemberRole.GUEST]: "text-muted-foreground",
    [MemberRole.MODERATOR]: "text-indigo-500",
    [MemberRole.ADMIN]: "text-amber-500"
}

export const ServerMember = ({
    member,
    server,
}: ServerMemberProps) => {
    const params = useParams();
    const router = useRouter();

    const icon = roleIconMap[member.role];
    const roleColor = roleColorMap[member.role];

    const onClick = () => {
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }

    return (
        <button 
            onClick={onClick}
            className={cn(
                "group px-3 py-2.5 rounded-xl flex items-center gap-x-3 w-full hover:bg-secondary/70 transition-all duration-200 mb-1",
                params?.memberId === member.id && "bg-primary/10 text-primary border border-primary/20 shadow-sm"
            )}
        >
            <div className="relative">
                <UserAvatar
                    src={member.profile.imageUrl}
                    className="w-8 h-8 rounded-full ring-2 ring-background shadow-sm"
                />
                {/* Online status indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
            </div>

            <div className="flex flex-col items-start flex-1 min-w-0">
                <div className="flex items-center gap-1 w-full">
                    <p className={cn(
                        "font-medium text-sm truncate",
                        params?.memberId === member.id 
                            ? "text-primary" 
                            : "text-foreground group-hover:text-primary transition-colors"
                    )}>
                        {member.profile.name}
                    </p>
                    {icon && (
                        <div className={cn("flex-shrink-0", roleColor)}>
                            {icon}
                        </div>
                    )}
                </div>
                
                {member.role !== MemberRole.GUEST && (
                    <span className={cn(
                        "text-xs capitalize",
                        params?.memberId === member.id ? "text-primary/70" : roleColor
                    )}>
                        {member.role.toLowerCase()}
                    </span>
                )}
            </div>
        </button>
    )
}