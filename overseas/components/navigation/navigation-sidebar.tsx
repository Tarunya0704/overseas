import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

 export const NavigationSidebar =  async() => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({})



    return ( 
        <div>
            this is navigation
        </div>
     );
}
 
