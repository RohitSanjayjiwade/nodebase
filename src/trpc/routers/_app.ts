import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import { prisma } from '@/lib/db';

export const appRouter = createTRPCRouter({
  testAi: baseProcedure.mutation(async() => {
    await inngest.send({
      name: "execute/ai",
    })

    return { success: true, message: "Job in Queue" };
  }),
  getWorkflows: protectedProcedure
    .query(({ ctx }) => {
      return prisma.workflow.findMany();
    }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "app/task.created",
      data: {
        id: 102
      }
    })

    return { success: true, message: "Job in Queue" };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;