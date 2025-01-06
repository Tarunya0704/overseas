import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { NavigationAction } from "./navigation-action";

 export const NavigationSidebar =  async() => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where:{
            member:{
                some: {
                    profileId:profile.id
                }
            }
        }
    });



    return ( 
        <div className=" space-y-4 flex felx-col items-center h-full text-primary w-full dark:bg-[#1E1F22]">
            <NavigationAction/>
        </div>
     );
}
 
