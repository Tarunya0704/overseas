

import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextApiRequest } from "next";

export const currentProfilePages = async (req: NextApiRequest) => {
    try {
        const { userId } = await getAuth(req);

        if (!userId) {
            return null;
        }

        const profile = await db.profile.findUnique({
            where: {
                userId
            }
        });

        return profile;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
}