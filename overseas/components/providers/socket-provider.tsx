"use client"

import {
   
    createContext,
    useContext,
    useEffect,
    useState

} from "react";

import {io as ClientIO} from "socket.io-client"
import { set } from "zod";

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
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstaNCE = new(ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!,{
            path:"/api/socket/io",
            addTrailimgSlash: false,
        });


        socketInstaNCE.on("connect", () => {
            setIsConnected(true);
        });
        socketInstaNCE.on("disconnect", () => {
            setIsConnected(false);
        });
        setSocket(socketInstaNCE);
        return () => {
            socketInstaNCE.disconnect();
        }
    }, []);

    return (
        <SocketContext.Provider value={{socket, isConnected}}>
            {children}
        </SocketContext.Provider>
    )

}