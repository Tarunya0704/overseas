"use client";



import {
    Dialog,
    DialogContent,
    
    DialogDescription,
    
    DialogFooter,
    
    DialogHeader,
    DialogTitle,
    
  } from '@/components/ui/dialog'


import { useModal } from "@/hooks/use-modal-store";

import { Button } from '../ui/button';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';



export const LeaveServerModal = () => {
    const { isOpen , onClose, type , data} = useModal();
  


 

    const isModalOpen = isOpen && type === "leaveServer";
    const {server} = data;
    const router = useRouter();

   
    const [isloading, setIsLoading] = useState(false);

    const onClick = async () => {
        try{
            setIsLoading(true);



            await axios.patch(`/api/servers/${server?.id}/leave`);

            onClose();
            router.refresh();
            router.push("/");





        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

   

    

    

   



 




return (

    <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
            <DialogHeader className='pt-8 px-6 '>
                <DialogTitle className='text-center text-2xl font-bold'>
                   Leave Server
                </DialogTitle>
                <DialogDescription className='text-center text-zinc-500'>
                    Are you sure you want leave <span className='font-semibold  text-indigo-500'>{server?.name}</span>?
                </DialogDescription>
               

            </DialogHeader>
            <DialogFooter className='bg-gray-100 px-6 py-6'>
                <div className='flex items-center justify-between w-full '>
                    <Button
                    disabled={isloading}
                    onClick={onClose}
                    variant="ghost"
                    >
                        Cancel
                    </Button>
                    <Button
                    disabled={isloading}
                    variant="primary"
                    onClick={onClick}

                    >
                        Confirm
                    </Button>


                </div>

            </DialogFooter>
           
            
        </DialogContent>
    </Dialog>



)
}