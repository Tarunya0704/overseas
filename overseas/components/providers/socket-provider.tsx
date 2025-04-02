"use  client";

import {
    Children,
    createContext,
    useContext,
    useEffect,
    useState

} from "react";

import {io as ClientIO} from "socket.io-client"

type SocketContextType = {

    socket: any | null ;
    isConnected : boolean;

};

const SocketContext = createContext<SocketContextType>({
    socket: null ,
    isConnected: false ,
})

export const useSocket =() => {
    return useContext(SocketContext);
};


export const SocketProvider = ({
    children
}:{
    children: 
})