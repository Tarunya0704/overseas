import { channel } from 'diagnostics_channel';
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { Message } from '@prisma/client';
import { db } from '@/lib/db';




const MESSAGE_BATCH = 10;

export async function  GET(
    req: Request,
){
    try{
        const profile = await currentProfile();
        const {searchParams} = new URL(req.url);

        const cursor = searchParams.get('cursour') ;
        const channelId = searchParams.get('channelId') ;

        if(!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        if(!channelId) {
            return new NextResponse('chananel id missing ', { status: 400 });
        }

        let messages : Message[] =[];

        if(cursor) {
            messages = await db.message.findMany({
                take: MESSAGE_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    channelId,
                   
                },
                include: {
                    member: {
                        include: {      
                            profile: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                
        })

    }
    else {
        messages = await db.message.findMany({
            take: MESSAGE_BATCH,
            where: {
                channelId,
            },
            include: {
                member: {
                    include: {      
                        profile: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    }

    let nextCursor = null ;
    if(messages.length === MESSAGE_BATCH) {
        nextCursor = messages[messages.length - 1].id;
    }
    return NextResponse.json({
        items: messages ,
        nextCursor,
    });



}catch (error) {
    console.error('Error fetching messages:', error);   
    return new NextResponse('Failed to fetch messages', { status: 500 });
}}
