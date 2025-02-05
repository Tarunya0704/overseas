"use client";



import {
    Dialog,
    DialogContent,
    
    DialogDescription,
    
    DialogHeader,
    DialogTitle,
    
  } from '@/components/ui/dialog'


import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMemebrsWithProfiles } from "@/types";
import { ScrollArea } from '../ui/scroll-area';

export const MembersModal = () => {
    const { onOpen ,isOpen , onClose, type , data} = useModal();
    


 

    const isModalOpen = isOpen && type === "members";
    const {server} = data as { server: ServerWithMemebrsWithProfiles};

    
  
  





 




return (

    <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
            <DialogHeader className='pt-8 px-6 '>
                <DialogTitle className='text-center text-2xl font-bold'>
                    Manage Members
                </DialogTitle>
                <DialogDescription className='text-center text-zinc-500'>
                {server?. member?.length} Members
            </DialogDescription>

               

            </DialogHeader>
            <ScrollArea className='mt-8 max-h-[420px] pr-6'>
                {server?.member?.map((member) => (
                    <div key={member.id} className='flex items-center gap-x-2 mb-6 '>

                    </div>
                ))
            }

            </ScrollArea>
           


           
           
            
        </DialogContent>
    </Dialog>



)
}