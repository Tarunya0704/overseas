import { Profile } from "@prisma/client"
import { Server , Member } from "@prisma/client"

export type ServerWithMemebrsWithProfiles = Server & {
    member:(Member & {profile:Profile}) [];
};