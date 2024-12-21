import { intialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";

const setupPage = async () => {

    const profile = await intialProfile();
    const server = await db.server.findFirst({
        where:{
            member:{
                some:{
                    profileId: profile.id
                }
            }
        }
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }




    return <InitialModal/>
    
}
 
export default setupPage;