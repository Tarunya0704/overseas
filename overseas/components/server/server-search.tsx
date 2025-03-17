"use client";

import { Search } from "lucide-react";
import React from "react";
import { useState } from "react";
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command";



interface ServerSearchProps {
    data:{
        label: string;
        type:"channel" | "member";
        data:{
            icon: React.ReactNode;
            name: string;
            id: string;   
            
        }[] | undefined
    }[]
}

export const ServerSearch = ({
    data
}: ServerSearchProps) => {
    const [open, setOpen] = useState(false);



    return (
        <div>
           <>
           <button 
           onClick={() => setOpen(true)}
           className="group px-2 py-2 rounded-md flex items-center gap=-x-2  w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
           <Search className="w-4 h-4 text-zinc-500 dark:test-zinc-400" />
            <p className=" font-semibold text-sm  text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">

                Search server
            </p>
            <kbd className=" pointer-events-none inline-flex h-5  select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
            >
                <span className=" pointer-events-none inline-flex h-5 select-none items-center  text-xs font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                    ctrl
                </span>K
                
            </kbd>
           </button>
           <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="search all channels and memebers"/>
            <CommandList>
                <CommandEmpty>
                    no result found
                </CommandEmpty>
            </CommandList>

           </CommandDialog>
           </> 
        </div>
    )

}