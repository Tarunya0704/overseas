// "use client";


// import qs from "query-string";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod"

// import { useForm } from 'react-hook-form'
// import axios from "axios";

// import {
//     Dialog,
//     DialogContent,
   
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
//   } from '@/components/ui/dialog'

// import {  Form,
//     FormControl,
   
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,} from '@/components/ui/form';



// import {
//         Select,
//         SelectContent,
//         SelectItem,
//         SelectTrigger,
//         SelectValue,
//       } from "@/components/ui/select";
      

// import {Input} from '@/components/ui/input'
// import { Button } from "@/components/ui/button";

// import { useParams, useRouter } from "next/navigation";

// import { useAuth } from "@clerk/nextjs";
// import { useModal } from "@/hooks/use-modal-store";
// import { ChannelType } from "@prisma/client";

// const formSchema = z.object({
//     name:z.string().min(1,{
//         message: "channel name is required."
//     }).refine(
//         name => name !== "general",
//         {
//             message: "channel name cannot be 'general'"
//         }

//     ),
//     type: z.nativeEnum(ChannelType)

    
// })

// export const CreateChannelModal = () => {
//     const {isOpen , onClose, type} = useModal();


//     const { getToken } = useAuth();
//     const router = useRouter();
//     const params = useParams();

//     const isModalOpen = isOpen && type === "createChannel";

//     const handelClose = () => {
//         form.reset ();
//         onClose();
//     }




//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: "",
//             type: ChannelType.TEXT,
           
//         }
//     });

//     const isLoading = form.formState.isSubmitting;

//     const onSubmit = async(values: z.infer<typeof formSchema>) => {
//         try {
//             const token = await getToken();
            
//             // Check if token exists before making the request
//             if (!token) {
//                 throw new Error("No authentication token found");
//             }

//             const url = qs.stringifyUrl({
//                 url: "/api/channels",
//                 query:{
//                     serverId: params?.serverId
//                 }
//             })




//             const response = await axios.post(url, values, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (response.data) {
//                 form.reset();
//                 router.refresh();
//                 onClose();
               
//             }
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 if (error.response?.status === 401) {
//                     // Redirect to the sign-in page if authentication fails
//                     router.push("/sign-up");
//                 } else {
//                     console.error("An error occurred:", error.response?.data);
//                 }
//             } else {
//                 console.error("An unexpected error occurred:", error);
//             }
//         }
//     }


// return (

//     <Dialog open={isModalOpen} onOpenChange={handelClose}>
//         <DialogContent className='bg-white text-black p-0 overflow-hidden'>
//             <DialogHeader className='pt-8 px-6 '>
//                 <DialogTitle className='text-center text-2xl font-bold'>
//                     Create Channel
//                 </DialogTitle>
             

//             </DialogHeader>
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                 <div className="space-y-8 px-6">
                    
//                     <FormField 
//                     control={form.control}
//                     name="name"
//                     render={({field}) => (   
//                     <FormItem>
//                         <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
//                             Channel name
//                         </FormLabel>

//                         <FormControl>
//                            <Input
//                            disabled ={isLoading}
//                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
//                            placeholder="enter channel name "
//                            {...field}/>


//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>  

//                     )}
//                     />
//                     <FormField
//                     control={form.control}
//                     name="type"
//                     render={({field}) => (
//                         <FormItem>
//                             <FormLabel>
//                                 Channel Type
//                             </FormLabel>
//                             <Select 
//                             disabled={isLoading}
//                             onValueChange={field.onChange}
//                             defaultValue={field.value}>
//                                 <FormControl>
//                                     <SelectTrigger
//                                     className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">

//                                     <SelectValue 
//                                     placeholder="Select a channel Type"/>

//                                     </SelectTrigger>
//                                 </FormControl>
//                                 <SelectContent>
//                                     {Object.values(ChannelType).map((type) => (
//                                         <SelectItem
//                                         key={type}
//                                         value={type}
//                                         className="capitalize">
//                                             {type.toLowerCase()}

//                                         </SelectItem>
//                                     ))}

//                                 </SelectContent>

//                             </Select>
//                             <FormMessage/>

//                         </FormItem>
//                     )}
//                     />
                    
//                 </div>

//                 <DialogFooter className="bg-gray-100 px-6 py-4">
//                     <Button   variant="primary" disabled={isLoading}>
//                         create
//                     </Button>

//                 </DialogFooter>
//                 </form>
//             </Form>

//         </DialogContent>
//     </Dialog>



// )
// }


"use client";

import qs from "query-string";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Channel name is required."
    }).refine(
        name => name !== "general",
        {
            message: "Channel name cannot be 'general'"
        }
    ),
    type: z.nativeEnum(ChannelType)
});

export const CreateChannelModal = () => {
    const { isOpen, onClose, type } = useModal();
    const router = useRouter();
    const params = useParams();
    const isModalOpen = isOpen && type === "createChannel";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: ChannelType.TEXT,
        }
    });

    const isLoading = form.formState.isSubmitting;

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/channels",
                query: {
                    serverId: params?.serverId
                }
            });
    
            await axios.post(url, values);
            form.reset();
            router.refresh();
            onClose();
            
        } catch (error) {
            console.error("Error creating channel:", error);
        }
    };
    

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Create Channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({field}) => (   
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Channel name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter channel name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>  
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Channel Type
                                        </FormLabel>
                                        <Select 
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                                    <SelectValue placeholder="Select a channel type"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(ChannelType).map((type) => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                        className="capitalize"
                                                    >
                                                        {type.toLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateChannelModal;