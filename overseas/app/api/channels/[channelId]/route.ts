import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";




export async function DELETE (
     req:  Request,
     {params}: {params : {channelId: string }}
) {
    try{

        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");



        if(!profile) {

            return new NextResponse("unauthorized" , {status: 401});
        }

        if(!serverId){
            return new NextResponse("server Id missing", {status: 400 });
        }
        if(!params.channelId){
            return new NextResponse("channel Id is missing", {status: 400})
        }


        const server =  await db.server.update({
            where:{
                id: serverId,
                member: {
                    some:{
                        profileId: profile.id,
                        role:{
                            in:[MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data : {
                channel : {
                    delete: {
                        id: params.channelId,
                        name:{
                            not: "general",
                        }
                    }
                }
            }
        });


        return NextResponse.json(server);



    }catch(error) {
        console.log("[CHANNEL_ID_DELETE", error);
        return new NextResponse("Internal error", {status: 500})
    }
}