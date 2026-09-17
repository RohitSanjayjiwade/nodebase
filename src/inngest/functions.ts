import { prisma } from "@/lib/db";
import { inngest } from "./client";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/task.created" } },
  async ({ event, step }) => {
    const result = await step.run("handle-task", async () => {
      return { processed: true, id: event.data.id };
    });

    await step.sleep("Fetching the video", "5s");
    await step.sleep("Transcribing", "5s");
    await step.sleep("Sending transcription to AI", "5s");

    await step.sleep("pause", "1s");

    await step.run("create-workflow", async() => {
        return prisma.workflow.create({
            data: {
                name: "workflow-from-inngest",
            }
        })
    })

    return { message: `Task ${event.data.id} complete`, result };
  }
);