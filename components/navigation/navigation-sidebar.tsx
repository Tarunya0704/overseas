import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { NavigationAction } from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItems } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            member: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-gradient-to-b from-background to-secondary/20 border-r border-border/50 py-3">
            {/* Header with logo/brand */}
            <div className="flex flex-col items-center space-y-2 px-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <span className="text-white font-bold text-lg">O</span>
                </div>
                <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full"></div>
            </div>

            <NavigationAction />
            
            <Separator className="h-[2px] bg-gradient-to-r from-transparent via-border to-transparent rounded-md w-10 mx-auto" />
            
            <ScrollArea className="flex-1 w-full">
                <div className="space-y-2 px-2">
                    {servers.map((server) => (
                        <div key={server.id} className="animate-fade-in">
                            <NavigationItems
                                id={server.id}
                                name={server.name}
                                imageUrl={server.imageUrl}
                            />
                        </div>
                    ))}
                </div>
            </ScrollArea>
            
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <div className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <ModeToggle />
                </div>
                <div className="relative">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "h-[48px] w-[48px] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ring-2 ring-primary/20 hover:ring-primary/40"
                            }
                        }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
            </div>
        </div>
    );
}