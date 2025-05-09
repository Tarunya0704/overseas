// "use client"

// import { UploadDropzone } from "@/lib/uploadthing";

// import "@uploadthing/react/styles.css"


// interface FileUploadProps {
//     onChange: (url?:string) => void;
//     value: string;
//     endpoint: "messageFile"| "serverImage"

// }

// export const  FileUpload = ({
//     onChange,
//     value,
//     endpoint

// }: FileUploadProps) => {
//     return (
//         <UploadDropzone
//         endpoint={endpoint}
//         onClientUploadComplete={(res)=> {
//             onChange(res?.[0].fileUrl);
//         }}
//         onUploadError={(error: Error) => {
//             console.log(error);
//         }}
        
//         />

//     )
// }
// "use client"

// import { X } from "lucide-react";
// import Image from "next/image";

// import { UploadDropzone } from "@/lib/uploadthing";
// import "@uploadthing/react/styles.css";

// interface FileUploadProps {
//     onChange: (url?: string) => void;
//     value: string;
//     endpoint: "messageFile" | "serverImage"
// }

// export const FileUpload = ({
//     onChange,
//     value,
//     endpoint
// }: FileUploadProps) => {
//     const fileType = value?.split(".").pop();

//     if(value && fileType !== "pdf") {
//         return (
//             <div className="relative h-20 w-20">
//                 <Image
//                 fill
//                 src={value}
//                 alt="upload"
//                 className="rounded-full"/>
//             </div>
//         )
//     }


//     return (
//         <UploadDropzone
//             endpoint={endpoint}
//             onClientUploadComplete={(res) => {
//                 if (res?.[0]) {
//                     onChange(res[0].url);
//                 }
//             }}
//             onUploadError={(error: Error) => {
//                 console.error("Upload error:", error.message);
//             }}
//         />
//     )
// }

"use client"

import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { FileIcon } from "lucide-react";




interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage"
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    // Check if string is a valid URL
    const isValidHttpUrl = (string: string) => {
        try {
            if (string.startsWith('https://') || string.startsWith('http://')) {
                return true;
            }
            return false;
        } catch(e) {
            return false;
        }
    }

    const fileType = value?.split(".").pop();

    if(value && fileType !== "pdf" && isValidHttpUrl(value)) {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="upload"
                    className="rounded-full"
                />
                <button onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm " type="button">
                    <X className="h-4 w-4"/>
                </button>


            </div>
        )
    }
    if(value  && fileType === "pdf"){
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className = "h-10 w-10 fill-indigo-200 stroke-indigo-400"/>
                <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-500 hover:underline ml-2 dark:text-indigo-400">
                    {value}

                </a>
                <button onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2   -right-2 shadow-sm " type="button">
                    <X className="h-4 w-4"/>
                </button>

            </div>
        )
    }




    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                if (res?.[0]) {
                    onChange(res[0].url);
                }
            }}
            onUploadError={(error: Error) => {
                console.error("Upload error:", error.message);
            }}
        />
    )
}