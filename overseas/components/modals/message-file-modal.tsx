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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,} from '@/components/ui/form'

import {Input} from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";
import qs from "query-string"

import { useAuth } from "@clerk/nextjs";


import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
   
    fileUrl: z.string().min(1, {
        message: "attachement is required."
    })
})

export const MessageFileModal = () => {
    const{isOpen , onClose, type , data } = useModal();
   
    const router = useRouter();


    const isModalOpen = isOpen && type === "messageFile";
    const {apiUrl, query} = data;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
            
        }
    });
    const handleClose = () => {
        form.reset();
        onClose();
        
    }





    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
           const url = qs.stringifyUrl({
            url: apiUrl || "",
            query,
                });
            
            
          

             await axios.post(url ,{
                ...values,
                content: values.fileUrl,
             });

            
                form.reset();
                router.refresh();
                handleClose();
        } catch (error) {
            console.log(error);
        }
    }
// export const InitialModal = () =>  {

//     const router = useRouter();


//     const form  = useForm({

//         resolver:zodResolver(formSchema),
//         defaultValues: {
//             name: " ",
//             imageUrl: " ",
//         }
//     });


// const isLoading = form.formState.isSubmitting

// const onSubmit = async(values: z.infer <typeof formSchema>) => {
//     try{

//         await axios.post("/api/servers", values);
//         form.reset();
//         router.refresh();
//         window.location.reload();

//     }catch (error){
//         console.log(error);

//     }
// }

// const onSubmit = async(values: z.infer <typeof formSchema>) => {
//     try {
//         // Get the auth token (adjust this based on how you store your token)
//         const token = localStorage.getItem('authToken'); // or however you store your auth token
        
//         await axios.post("/api/servers", values, {
//             headers: {
//                 'Authorization': `Bearer ${token}`, // Add the auth header
//                 'Content-Type': 'application/json'
//             }
//         });

//         form.reset();
//         router.refresh();
//         window.location.reload();

//     } catch (error) {
//         console.log(error);
//     }
// }

return (

    <Dialog open={isModalOpen}  onOpenChange={handleClose} >
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
            <DialogHeader className='pt-8 px-6 '>
                <DialogTitle className='text-center text-2xl font-bold'>
                    Add an Attachement
                </DialogTitle>
                <DialogDescription className='text-center text-zinc-500'>
                    Send a file as  Message
                </DialogDescription>

            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-8 px-6">
                    <div className="flex item-center justify-center text-center">
                       <FormField
                       control={form.control}
                       name="fileUrl"
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
                    
                    
                </div>

                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <Button   variant="primary" disabled={isLoading}>
                        send
                    </Button>

                </DialogFooter>
                </form>
            </Form>

        </DialogContent>
    </Dialog>



)
}