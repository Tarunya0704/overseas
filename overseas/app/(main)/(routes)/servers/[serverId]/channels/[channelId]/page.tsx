

import { currentProfile } from "@/lib/current-profile";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";

import { db } from "@/lib/db";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChannelType } from "@prisma/client";
import { MediaRoom } from "@/components/media-room";


interface ChannelIdPageProps {
  params:{
    serverId: string;
    channelId: string;
  }
}


const   ChannelIdPage = async ({
  params
}: ChannelIdPageProps) => {

  const profile = await currentProfile();

  if(!profile){
    return RedirectToSignIn();
  }


const channel = await db.channel.findUnique({
  where:{
    id:params.channelId,
  },
});

const member = await db.member.findFirst({
  where:{
    serverId: params.serverId,
    profileId: profile.id,
  },
});


if(!channel || !member) {
  redirect("/");
}






  return (
    <div className="bg-white flex flex-col h-full dark:bg-[#313338]">
      <ChatHeader
      name={channel.name}
      serverId={channel.serverId}
      type="channel"

      />
      {channel.type === ChannelType.TEXT && (
        <>
         <ChatMessages
        name={channel.name}
        member={member}
        chatId={channel.id}
        apiUrl={`/api/messages`}
        sockretUrl={`/api/socket/messages`}
        socketQuery={{ channelId: channel.id , serverId: channel.serverId }}
        paramKey="channelId"
        paramValue={channel.id}
        type="channel"
        />
       <ChatInput
        apiUrl={`/api/socket/messages`}
        query={{ 
          channelId: channel.id ,
          serverId: channel.serverId }}
        name={channel.name}
        type="channel"
       />

      </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom
        chatId={channel.id}
        video={false}
        audio={true}
        />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom
        chatId={channel.id}
        video={true}
        audio={true}
        />
      )}


     
      
    </div>
  );
}

export default ChannelIdPage;
