import { currentProfile } from "@/lib/current-profile";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";

import { db } from "@/lib/db";
import { ChatInput } from "@/components/chat/chat-input";


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
      <div className="flex-1 ">
        Future Messages!
        
      </div>
      <ChatInput
        apiUrl={`/api/socket/messages`}
        query={{ 
          channelId: channel.id ,
          serverId: channel.serverId }}
        name={channel.name}
        type="channel"
      />
      
    </div>
  );
}

export default ChannelIdPage;
