import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const currentProfile = async () => {
    try {
        const { userId } = auth();

        if (!userId) {
            return null;
        }

        const profile = await db.profile.findUnique({
            where: {
                userId: userId
            }
        });

        return profile;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
}
