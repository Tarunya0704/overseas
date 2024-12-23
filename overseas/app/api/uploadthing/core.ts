// import { auth } from "@clerk/nextjs";


// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

// const f = createUploadthing();

// const handleAuth = () => {
//     const {userId} = auth();
//     if(!userId) throw new Error('Unauthorized');
//     return {userId: userId};
// }

// // FileRouter for your app, can contain multiple FileRoutes
// export const ourFileRouter = {
//   // Define as many FileRoutes as you like, each with a unique routeSlug
//   serverImage: f({
//     image: {
      
//       maxFileSize: "4MB",
//       maxFileCount: 1,
//     },
//   })
//     // Set permissions and file types for this FileRoute
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
  
//     messageFile: f(["image","pdf"])
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),


// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  messageFile: f(["image", "pdf"])
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete:", file.url);
    }),
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
