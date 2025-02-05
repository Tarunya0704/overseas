"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="pointer-events-auto">
        
        <CreateServerModal/>
        <InviteModal/>
        <EditServerModal/>
      </div>
    </div>
  );
};
// components/providers/modal-provider.tsx
// components/providers/modal-provider.tsx
// "use client";

// import { useEffect, useState } from "react"
// import { CreateServerModal } from "../modals/create-server-modal"

// export const ModalProvider = () => {
//     const [isMounted, setIsMounted] = useState(false);

//     useEffect(() => {
//         setIsMounted(true);
//     }, []);

//     if (!isMounted) {
//         return null;
//     }

//     return (
//         <div className="fixed inset-0 pointer-events-none">
//             <div className="pointer-events-auto">
//                 <CreateServerModal />
//             </div>
//         </div>
//     )
// }