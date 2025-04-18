"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from 'react-hook-form'
import axios from "axios";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from '@/components/ui/dialog'

import {  Form,
    FormControl,
   
    FormField,
    FormItem,
    FormLabel,
    FormMessage,} from '@/components/ui/form'

import {Input} from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useModal } from "@/hooks/use-modal-store";
import { use } from "react";

const formSchema = z.object({
    name:z.string().min(1,{
        message: "server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "server image is required."
    })
})

export const EditServerModal = () => {
    const {isOpen , onClose, type, data} = useModal();


    const router = useRouter();

    const isModalOpen = isOpen && type === "editServer";
    const {server} = data;

    const handelClose = () => {
        form.reset ();
        onClose();
    }




    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    useEffect(() => {
        if (server) {
            form.setValue("name", server.name);
            form.setValue("imageUrl", server.imageUrl);
        }

    } , [server, form])

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/servers/${server?.id}`, values );
            
                form.reset();
                router.refresh();
                onClose();
            } catch (error) {
                console.error(error);
            }
    }


return (

    <Dialog open={isModalOpen} onOpenChange={handelClose}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
            <DialogHeader className='pt-8 px-6 '>
                <DialogTitle className='text-center text-2xl font-bold'>
                    customize you server 
                </DialogTitle>
                <DialogDescription className='text-center text-zinc-500'>
                    giye your server a name and image 
                </DialogDescription>

            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-8 px-6">
                    <div className="flex items-center justify-center text-center">
                       <FormField
                       control={form.control}
                       name="imageUrl"
                       render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <FileUpload
                                
                                endpoint="serverImage"
                                value={field.value}
                                onChange={field.onChange}/>
                            </FormControl>
                        </FormItem>
                       )}
                       />

                    </div>
                    <FormField 
                    control={form.control}
                    name="name"
                    render={({field}) => (   
                    <FormItem>
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                            server name
                        </FormLabel>

                        <FormControl>
                           <Input
                           disabled ={isLoading}
                           className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                           placeholder="enter server name "
                           {...field}/>


                        </FormControl>
                        <FormMessage />
                    </FormItem>  

                    )}
                    />
                    
                </div>

                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <Button   variant="primary" disabled={isLoading}>
                       save
                    </Button>

                </DialogFooter>
                </form>
            </Form>

        </DialogContent>
    </Dialog>



)
}