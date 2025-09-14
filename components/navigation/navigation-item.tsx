"use client"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ActionTooltip } from "@/components/action-tooltip"

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
};

export const NavigationItems = ({
    id,
    imageUrl,
    name,
}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();

    const onClick = () => {
        router.push(`/servers/${id}`)
    }

    return (
        <ActionTooltip 
            side="right"
            align="center"
            label={name}
        >
            <button 
                onClick={onClick}
                className="group relative flex items-center justify-center w-full"
            >
                {/* Active indicator */}
                <div className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all w-[4px] z-10",
                    params?.serverId !== id && "group-hover:h-[20px]",
                    params?.serverId === id ? "h-[36px]" : "h-[8px]"
                )} />
                
                {/* Server icon container */}
                <div className={cn(
                    "relative group flex mx-3 h-[48px] w-[48px] rounded-2xl group-hover:rounded-xl transition-all overflow-hidden shadow-md hover:shadow-lg server-icon",
                    params?.serverId === id && "bg-primary/10 text-primary rounded-xl ring-2 ring-primary/30"
                )}>
                    <Image 
                        fill
                        src={imageUrl}
                        alt="Server"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Notification badge (example) */}
                {params?.serverId !== id && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        3
                    </div>
                )}
            </button>
        </ActionTooltip>
    )
}