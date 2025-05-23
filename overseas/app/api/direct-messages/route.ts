
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { DirectMessage  } from '@prisma/client';
import { db } from '@/lib/db';




const MESSAGE_BATCH = 10;

export async function  GET(
    req: Request,
){
    try{
        const profile = await currentProfile();
        const {searchParams} = new URL(req.url);

        const cursor = searchParams.get('cursour') ;
        const conversationId = searchParams.get('conversationId') ;

        if(!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        if(!conversationId) {
            return new NextResponse('conversation id missing ', { status: 400 });
        }

        let messages : DirectMessage[] =[];

        if(cursor) {
            messages = await db.directMessage.findMany({
                take: MESSAGE_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    conversationId,
                   
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
        messages = await db.directMessage.findMany({
            take: MESSAGE_BATCH,
            where: {
                conversationId,
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
    console.error('Error fetching  Direct messages:', error);   
    return new NextResponse('Failed to fetch messages', { status: 500 });
}}
