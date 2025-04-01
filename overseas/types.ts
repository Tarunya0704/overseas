

import {Server as NetServer ,  Socket} from "net";
import { NextApiResponse } from "next";
import {Server as SocketIOServer } from "socket.io";
import { Profile } from "@prisma/client"
import { Server , Member } from "@prisma/client"


export type ServerWithMemebrsWithProfiles = Server & {
    member:(Member & {profile:Profile}) [];
};

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io:SocketIOServer;
        };
    };
}