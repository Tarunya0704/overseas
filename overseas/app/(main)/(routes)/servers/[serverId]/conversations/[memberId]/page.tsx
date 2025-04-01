import { currentProfile } from "@/lib/current-profile";
import { RedirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getOrCreateConversation } from "@/lib/conversation";
import { ChatHeader } from "@/components/chat/chat-header";


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
        </div>
     );
}
 
export default MemberpageId;