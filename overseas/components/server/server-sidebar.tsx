import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { channel } from "diagnostics_channel";
import { create } from "domain";
import { ChannelType, MemberRole } from "@prisma/client";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
    serverId: string;
}
const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4"/>,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4"/>,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4"/>
}

const roleIconMap ={
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500"/>,
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500"/>,
}

export const ServerSidebar = async({
    serverId
} : ServerSidebarProps) => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where:{
            id: serverId,
        }, include: {
            channel:{
                orderBy: {
                    createdAt: "asc"
                },
            },
            member:{
                include:{
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }

            }

        }
    });

    const textChannels = server?.channel.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channel.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channel.filter((channel) => channel.type === ChannelType.VIDEO);

    const members = server?.member.filter((member) => member.profileId !== profile.id); 

    if(!server) {
        return redirect("/");
    }   

    const role = server.member.find((member) => member.profileId === profile.id)?.role; 




    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
        <ServerHeader
        server={server}
        role={role}/>

        <ScrollArea className="flex-1 px-3 ">
            <div className="mt-2">
            <ServerSearch
            data={[
                {
                label:"Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({ 
                    icon: iconMap[channel.type],
                    name: channel.name,
                    id: channel.id
                }))
            },
            {
                label:"Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({ 
                    icon: iconMap[channel.type],
                    name: channel.name,
                    id: channel.id
                }))
            },
            {
                label:"Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({ 
                    icon: iconMap[channel.type],
                    name: channel.name,
                    id: channel.id
                }))
            },
            {
                label:"Members",
                type: "member",
                data: members?.map((member) => ({ 
                    icon: roleIconMap[member.role],
                    name: member.profile.name,
                    id: member.id
                }))
            },

        ]}
            
            />

            </div>


            <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
            {!!textChannels?.length &&(
                <div className="mb-2">
                    <ServerSection
                    sectionType="channel"
                    label="Text Channels"
                    role={role}
                    channelType={ChannelType.TEXT}
                    

                    />
                    <div className="space-y-[2px]">
                    {textChannels.map((channel) => (
                        <ServerChannel
                        key={channel.id}
                        channel={channel}
                        role={role}
                        server={server}
                        />
                        

                    ))}
                    </div>

                </div>
            )}

             {!!audioChannels?.length &&(
                <div className="mb-2">
                    <ServerSection
                    sectionType="channel"
                    label="Voice Channels"
                    role={role}
                    channelType={ChannelType.AUDIO}
                    

                    />
                    <div className="space-y-[2px]">
                    {audioChannels.map((channel) => (
                        <ServerChannel
                        key={channel.id}
                        channel={channel}
                        role={role}
                        server={server}
                        />

                    ))}
                    </div>

                </div>
            )}

             {!!videoChannels?.length &&(
                <div className="mb-2">
                    <ServerSection
                    sectionType="channel"
                    label="Video Channels"
                    role={role}
                    channelType={ChannelType.VIDEO}
                    

                    />
                    <div className="space-y-[2px]">
                    {videoChannels.map((channel) => (
                        <ServerChannel
                        key={channel.id}
                        channel={channel}
                        role={role}
                        server={server}
                        />

                    ))}
                    </div>

                </div>
            )}

               {!!members?.length &&(
                <div className="mb-2">
                    <ServerSection
                    sectionType="member"
                    label="Members"
                    role={role}
                    server={server}
                    

                    />
                    <div className="space-y-[2px]">
                    {members.map((member) => (
                       <ServerMember
                       key={member.id}
                       member={member}
                       server={server}
                       />

                    ))}
                    </div>
                </div>
            )}
            
            
             


        </ScrollArea>
        </div>
    )

}