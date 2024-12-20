import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
export default function Home() {
  return (
    <div>
    <UserButton afterSignOutUrl="/"/>
    <ModeToggle/>
      
    </div>
  )
}
