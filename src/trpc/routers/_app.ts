import { TRPCError } from "@trpc/server";
import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { baseProcedure, createTRPCRouter, premiumProcedure, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  testAi: premiumProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });

    return { success: true, message: "Job in Queue" };
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "app/task.created",
      data: {
        id: 102,
      },
    });

    return { success: true, message: "Job in Queue" };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
