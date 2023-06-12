import { initTRPC } from "@trpc/server"
import { TRPCPanelMeta } from "trpc-panel"

import { Context } from "./context"

const t = initTRPC.context<Context>().meta<TRPCPanelMeta>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure
