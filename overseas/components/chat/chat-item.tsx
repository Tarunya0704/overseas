"use client ";

import { Member, MemberRole,  Profile } from "@prisma/client";
import { UserAvatar } from "../user-avatar";
import { ActionTooltip } from "../action-tooltip";
import { Edit, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import { FileIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
   
} from "@/components/ui/form";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import {useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { useModal } from "@/hooks/use-modal-store";
import {useRouter , useParams} from "next/navigation"






interface ChatItemProps {
    id: string;
    content: string ;
    member: Member & {
        profile: Profile;
    };
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember : Member;
    isUpdated: boolean;
   
    socketUrl: string;
    socketQuery: Record<string, string>;

};

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500 "/>,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500"/>

}

const formSchema = z.object({
    content: z.string().min(1),    
});



export const ChatItem = ({
    id,
    content,
    member,
    timestamp,
    fileUrl,
    deleted,
    currentMember,
    isUpdated,
    socketUrl,
    socketQuery
}: ChatItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const {onOpen} = useModal();
    const params = useParams();
    const router = useRouter();


    const onMemberClick = () => {
        if(member.id === currentMember.id){
            return 
        }
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)

    }


    

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === "Escape" || event.keyCode === 27) {
                setIsEditing(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content,
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       try {
        const url = qs.stringifyUrl({
            url: `${socketUrl}/${id}`,
            query: socketQuery,
        });


        await axios.patch(url,values);
        form.reset()
        setIsEditing(false);

       } catch (error){
        console.log(error);
       }
    }

    useEffect(() => {
        form.reset({
            content: content,
        });
    }, [content, form]);

    const fileType = fileUrl?.split(".").pop();

    const isAdmin = currentMember.role === MemberRole.ADMIN;
    const isModerator = currentMember.role === MemberRole.MODERATOR;
    const isOwner = currentMember.id === member.id;
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
    const canEditMessage = !deleted && isOwner && !fileUrl;
    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl;

    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div onClick={onMemberClick} className="cursour-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={member.profile.imageUrl} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p  onClick={onMemberClick} className="font-semibold text-sm hover:underline cursor-pointer">
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role}>
                                {roleIconMap[member.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {timestamp}
                        </span>
                    </div>
                    
                    {isImage && (
                        <a href={fileUrl} target="_blank" rel="noreferrer"
                            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48">
                            <Image
                                src={fileUrl}
                                alt=""
                                fill
                                className="object-cover"
                            />
                        </a>
                    )}

                    {isPDF && (
                        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-indigo-500 hover:underline ml-2 dark:text-indigo-400">
                                pdf file
                            </a>
                        </div>
                    )}

                    {!fileUrl && !isEditing && (
                        <p className={cn(
                            "text-sm text-zinc-600 dark:text-zinc-300",
                            deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
                        )}>
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mx-2">
                                    (edited)
                                </span>
                            )}
                        </p>
                    )}

                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form
                                className="flex items-center w-full gap-x-2 pt-2"
                                onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        disabled={isLoading}
                                                        className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                                        placeholder="Type your message..."
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button 
                                disabled={isLoading}
                                 size="sm" variant="primary">
                                    Save
                                </Button>
                            </form>
                            <span className="text-[10px] mt-1 text-zinc-400">
                                Press escape to cancel, enter to save
                            </span>
                        </Form>
                    )}
                </div>
            </div>
            
            {canDeleteMessage && (
                <div className="hidden group-hover:flex absolute items-center gap-x-2 p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
                    {canEditMessage && (
                        <ActionTooltip label="Edit">
                            <Edit
                                onClick={() => setIsEditing(true)}
                                className="cursor-pointer h-4 w-4 ml-auto text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                            />
                        </ActionTooltip>
                    )}
                    <ActionTooltip label="Delete">
                        <Trash
                            onClick={() => onOpen("deleteMessage", {
                                apiUrl: `${socketUrl}/${id}`,
                                query: socketQuery,
                               
                            })}
                            className="cursor-pointer h-4 w-4 ml-auto text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                        />
                    </ActionTooltip>
                </div>
            )}
        </div>
    )
}



// export const  ChatItem = ({
//     id,
//     content,
//     member,
//     timestamp,
//     fileUrl,
//     deleted,
//     currentMember,
//     isUpdated,
//     socketUrl,
//     socketQuery
// }: ChatItemProps) => {
//     const [isEditing , setIsEditing] = useState(false);
//     const [isDeleting , setIsDeleting] = useState(false);


//   useEffect(() => {
//     const handleKeyDown = (event: any) => {
//         if (event.key === "Escape" || event.keyCode === 27 ) {
//             setIsEditing(false);
//         }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);

//   }, []);





//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             content: content,
//         },
//     });

//     const onSubmit = (values) => {
//         console.log(values); 
//     }


//     useEffect(() => {
//         form.reset({
//             content: content,
//         });
//     }, [content , form]);
        
      



//     const fileType = fileUrl?.split(".").pop() ;



//     const isAdmin = currentMember.role === MemberRole.ADMIN;
//     const isModerator = currentMember.role === MemberRole.MODERATOR;
//     const isOwner =  currentMember.id === member.id;
//     const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
//     const canEditMessage = !deleted &&  isOwner && !fileUrl;
//     const isPDF = fileType === "pdf" && fileUrl;
//     const isImage = !isPDF && fileUrl;
    


//     return (
//         <div className="relative group flex  items-center hover:bg-black/5 p-4 transition w-full ">
//             <div className="group flex gap-x-2 items-start w-full">
//                 <div className="cursour-pointer  hover:drop-shadow-md transition"> 
//                     <UserAvatar src={member.profile.imageUrl}/>

//                 </div>
//                 <div className="flex flex-col w-full">
//                     <div className="flex items-center gap-x-2 ">
//                         <div className="flex items-center">
//                             <p className="font-semibold text-sm hover:underline cursor-pointer">
//                                 {member.profile.name}
//                             </p>
//                             <ActionTooltip label={member.role}>
//                                 {roleIconMap[member.role]}

//                             </ActionTooltip>

//                         </div>
//                         <span className="text-xs text-zinc-500 dark:text-zinc-400">
//                             {timestamp}
//                         </span>

//                     </div>
//                     {isImage && (
//                         <a href={fileUrl} target="_blank" rel="noreferrer" 
//                         className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48">
//                         <Image
//                         src={fileUrl}
//                         alt=""
//                         fill
//                         className="object-cover "
//                         />
                        
//                         </a>
//                     )}

//                     {isPDF && (
//                         <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
//                         <FileIcon className = "h-10 w-10 fill-indigo-200 stroke-indigo-400"/>
//                         <a
//                         href={fileUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-sm text-indigo-500 hover:underline ml-2 dark:text-indigo-400">
//                             pdf file
//                         </a>
                       
                        
//                         </div>
                         

//                     )}
//                     {!fileUrl &&  !isEditing && (
//                         <p className={cn("text-sm text-zinc-600 dark:text-zinc-300",
//                             deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
//                         )}>
//                             {content}
//                             {isUpdated && !deleted && (
//                                 <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mx-2">
//                                     (edited)
//                                 </span>
//                             )}
//                         </p>
//                     )}
//                     {!fileUrl && !isEditing && (
//                         <Form {...form}>
//                             <form 
//                             className="flex items-center w-full gap-x-2 pt-2"
//                             onSubmit={form.handleSubmit(onSubmit)}>
//                                 <FormField
//                                     control={form.control}
//                                     name="content"
//                                     render={({ field }) => (
//                                         <FormItem className="flex-1">
//                                             <FormControl>
//                                                 <div className="relative w-full">
//                                                 <Input
//                                                     className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0  focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
//                                                     placeholder="Type your message..."
//                                                     {...field}
//                                                 />
//                                                 </div>
//                                             </FormControl>
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <Button size="sm" variant="primary" >
//                                     save
//                                 </Button>

//                             </form>
//                             <span className="text-[10px] mt-1 text-zinc-400">
//                                 press escape to cancel , enter to save
//                             </span>

//                         </Form>
//                     )}

//                 </div>
//             </div>
//             {canDeleteMessage && (
//                 <div className="hidden group-hover:flex absolute items-center gap-x-2 p-1 -top-2 right-5 bg-white dark:bg-zinc-800  border rounded-sm ">
//                     {canEditMessage && (
//                         <ActionTooltip label="Edit">
//                             <Edit
//                             onClick={() => setIsEditing(true)}
//                             className="cursor-pointer h-4 w-4 ml-auto  text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
//                             />

//                         </ActionTooltip>
//                     )}
//                      <ActionTooltip label="delete">
//                             <Trash
//                             className="cursor-pointer h-4 w-4 ml-auto  text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
//                             />

//                         </ActionTooltip>

//                 </div>
//             )}


//         </div>
//     )
// }