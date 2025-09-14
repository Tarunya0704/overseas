import { Hash, Users, Phone, Video, Settings, Search } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { UserAvatar } from "../user-avatar";
import { SocketIndicator } from "../socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

export const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl,
}: ChatHeaderProps) => {
    return (
        <div className="text-md font-semibold px-4 flex items-center h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm">
            <MobileToggle serverId={serverId} />
            
            <div className="flex items-center space-x-3 flex-1">
                {type === "channel" && (
                    <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center">
                        <Hash className="w-4 h-4 text-muted-foreground" />
                    </div>
                )}
                
                {type === "conversation" && (
                    <div className="relative">
                        <UserAvatar 
                            src={imageUrl}
                            className="h-8 w-8 md:h-8 md:w-8 ring-2 ring-background shadow-sm"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                )}

                <div className="flex flex-col">
                    <p className="font-semibold text-md text-foreground">
                        {type === "channel" ? `# ${name}` : name}
                    </p>
                    {type === "conversation" && (
                        <p className="text-xs text-green-500 font-medium">Online</p>
                    )}
                </div>
            </div>

            <div className="ml-auto flex items-center space-x-2">
                {type === "conversation" && (
                    <>
                        <button className="p-2 rounded-lg hover:bg-secondary/70 transition-colors">
                            <Phone className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </button>
                        <ChatVideoButton />
                    </>
                )}
                
                {type === "channel" && (
                    <>
                        <button className="p-2 rounded-lg hover:bg-secondary/70 transition-colors">
                            <Users className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-secondary/70 transition-colors">
                            <Search className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </button>
                    </>
                )}
                
                <div className="px-2">
                    <SocketIndicator />
                </div>
            </div>
        </div>
    );
}