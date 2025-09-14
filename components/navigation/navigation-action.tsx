"use client"

import { Plus } from "lucide-react"
import { ActionTooltip } from "../action-tooltip"
import { useModal } from "@/hooks/use-modal-store"

export const NavigationAction = () => {
    const { onOpen } = useModal();

    return (
        <div className="w-full px-2">
            <ActionTooltip 
                side="right"
                align="center"
                label="Add a server"
            >
                <button 
                    onClick={() => onOpen("createServer")} 
                    className="group flex items-center justify-center w-full h-12 rounded-2xl bg-secondary/50 hover:bg-secondary border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                    <Plus 
                        className="group-hover:text-primary transition text-muted-foreground group-hover:rotate-90 duration-300" 
                        size={20}
                    />
                </button>
            </ActionTooltip>
        </div>
    )
}