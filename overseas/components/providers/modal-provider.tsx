"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { MembersModal } from "../modals/members-modal";

import { CreateChannelModal } from "../modals/create-channel-modal";
import { LeaveServerModal } from "../modals/leave-server-modal";

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
        <MembersModal/>
        <CreateChannelModal/>
        <LeaveServerModal/>
       
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