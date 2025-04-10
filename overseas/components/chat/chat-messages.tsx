"use client ";

import { Member } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";


interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    sockretUrl: string;
    socketQuery:  Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";


}




export const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    sockretUrl,
    socketQuery,
    paramKey,
    paramValue,
    type
}: ChatMessagesProps) => {
    return  (
        <div className="flex-1 overflow-y-auto flex flex-col py-4 ">
          <div className="flex-1 "/>
          <ChatWelcome
          type={type}
          name={name}/>
         
        </div>
    )
}