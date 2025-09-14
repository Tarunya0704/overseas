"use client";

import React from "react";
import { Channel, ChannelType, Server, MemberRole } from "@prisma/client";
import { Hash, Lock, Mic, Trash, Video, Edit, Volume2, VideoIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "../action-tooltip";
import { useModal, ModalType } from "@/hooks/use-modal-store";

interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Volume2,
    [ChannelType.VIDEO]: VideoIcon
}

const colorMap = {
    [ChannelType.TEXT]: "text-slate-500 dark:text-slate-400",
    [ChannelType.AUDIO]: "text-green-500 dark:text-green-400",
    [ChannelType.VIDEO]: "text-blue-500 dark:text-blue-400"
}

export const ServerChannel = ({
    channel,
    server,
    role,
}: ServerChannelProps) => {
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();

    const Icon = iconMap[channel.type];
    const colorClass = colorMap[channel.type];

    const onClick = () => {
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
    }

    const onAction = (e: React.MouseEvent, action: ModalType) => {
        e.stopPropagation();
        onOpen(action, { channel, server });
    }

    return (
        <button 
            onClick={onClick}
            className={cn(
                "group px-3 py-2.5 rounded-xl flex items-center gap-x-3 w-full hover:bg-secondary/70 transition-all duration-200 mb-1 channel-item",
                params?.channelId === channel.id && "bg-primary/10 text-primary border border-primary/20 shadow-sm"
            )}
        >
            <div className={cn(
                "flex-shrink-0 w-5 h-5 transition-colors",
                params?.channelId === channel.id ? "text-primary" : colorClass
            )}>
                <Icon className="w-full h-full" />
            </div>
            
            <p className={cn(
                "line-clamp-1 font-medium text-sm transition-colors flex-1 text-left",
                params?.channelId === channel.id 
                    ? "text-primary" 
                    : "text-muted-foreground group-hover:text-foreground"
            )}>
                {channel.name}
            </p>
            
            {/* Channel actions */}
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ActionTooltip label="Edit Channel">
                        <button
                            onClick={(e) => onAction(e, "editChannel")} 
                            className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                        >
                            <Edit className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                        </button>
                    </ActionTooltip>
                    
                    <ActionTooltip label="Delete Channel">
                        <button
                            onClick={(e) => onAction(e, "deleteChannel")}
                            className="p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors"
                        >
                            <Trash className="w-3.5 h-3.5 text-muted-foreground hover:text-rose-500 transition-colors" />
                        </button>
                    </ActionTooltip>
                </div>
            )}

            {/* Lock icon for general channel */}
            {channel.name === "general" && (
                <div className="ml-auto">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
            )}
        </button>
    )
}