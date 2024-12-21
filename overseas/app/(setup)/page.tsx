import { intialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

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




    return <div>create a server</div>
    
}
 
export default setupPage;