"use client";



import {
    Dialog,
    DialogContent,
    
    DialogDescription,
    
    DialogFooter,
    
    DialogHeader,
    DialogTitle,
    
  } from '@/components/ui/dialog'

import qs from 'query-string';

import { useModal } from "@/hooks/use-modal-store";

import { Button } from '../ui/button';

import { useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';



export const DeleteChannelModal = () => {
    const { isOpen , onClose, type , data} = useModal();
  


 

    const isModalOpen = isOpen && type === "deleteChannel";
    const {server , channel } = data;
    const router = useRouter();
    //const params = useParams();

   
    const [isloading, setIsLoading] = useState(false);

    const onClick = async () => {
        try{
            setIsLoading(true);

            const url = qs.stringify({
                url:`/api/channels/${channel?.id}`,
                query:{
                    serverId: server?.id
                }
            })



            await axios.delete(url);

            onClose();
            router.refresh();
            router.push(`/servers/${server?.id}`);





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
                   Delete Server
                </DialogTitle>
                <DialogDescription className='text-center text-zinc-500'>
                    Are you sure you want to do this ?<br/>
                     <span className='font-semibold  text-indigo-500'>#{channel?.name}</span>will be permanetly deleted.
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