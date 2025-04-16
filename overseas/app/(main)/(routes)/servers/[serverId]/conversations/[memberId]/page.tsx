import { currentProfile } from "@/lib/current-profile";
import { RedirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getOrCreateConversation } from "@/lib/conversation";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";


interface MemberIdPageProps {
    params:{
       
        memberId: string ;
        serverId:  string;
    }

}



const MemberpageId =  async ({
    params
} : MemberIdPageProps) => {

    const profile = await currentProfile();

    if(!profile) {
        return RedirectToSignIn();
    }


    const currentMember = await db.member.findFirst({
        where:{
            serverId:  params.serverId,
            profileId: profile.id,
        }, 
        include:{
            profile: true,
        },
    });

    if(!currentMember){
        return redirect("/")
    }

    const conversation  = await getOrCreateConversation(currentMember.id, params.memberId);

    if(!conversation){
        return redirect(`/servers/${params.serverId}`);
    }

    const {memberOne , memberTwo} = conversation ;
    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne ;



    return ( 
        <div className="flex flex-col bg-white dark:bg-[#313338] h-full">

           <ChatHeader 
           imageUrl={otherMember.profile.imageUrl}
           name={otherMember.profile.name}
           serverId={params.serverId}
           type="conversation"
           />
           <ChatMessages
           member={currentMember}
           name={otherMember.profile.name}
           chatId={conversation.id}
           type="conversation"
           apiUrl="/api/direct-messages"
           paramKey="conversationId"
           paramValue={conversation.id}
           sockretUrl="/api/socket/direct-messages"
           socketQuery={{
            conversationId: conversation.id,
           }}
           
           
           />
           <ChatInput
            name={otherMember.profile.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
                conversationId: conversation.id,
               }}


           
           />
        </div>
     );
}
 
export default MemberpageId;