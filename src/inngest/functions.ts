import { prisma } from "@/lib/db";
import { inngest } from "./client";
import { createGoogle } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from "ai";
import * as Sentry from "@sentry/nextjs";


const google = createGoogle();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
    { id: "execute-ai", triggers: { event: "execute/ai" } },
    async ({ event, step }) => {
        await step.sleep("pretent", "5s");

        Sentry.logger.warn("Somthing is missing");
        Sentry.logger.error("This is an error i want to trackj");

        const { steps: geminiSteps } = await step.ai.wrap(
            "gemini-generate-text",
            generateText,
            {
                model: google("gemini-3.6-flash"),
                system: "You are a helpful assistant.",
                prompt: "What is 2 + 2?",
                experimental_telemetry: {
                    isEnabled: true,
                    functionId: "joke_agent",
                    recordInputs: true,
                    recordOutputs: true,
                },
            }
        );

        const { steps: openaiSteps } = await step.ai.wrap(
            "openai-generate-text",
            generateText,
            {
                model: openai("gpt-4o"),
                system: "You are a helpful assistant.",
                prompt: "What is 2 + 2?",
                experimental_telemetry: {
                    isEnabled: true,
                    functionId: "joke_agent",
                    recordInputs: true,
                    recordOutputs: true,
                },
            }
        );

        const { steps: anthropicSteps } = await step.ai.wrap(
            "anthropic-generate-text",
            generateText,
            {
                model: anthropic("claude-sonnet-4-5"),
                system: "You are a helpful assistant.",
                prompt: "What is 2 + 2?",
                experimental_telemetry: {
                    isEnabled: true,
                    functionId: "joke_agent",
                    recordInputs: true,
                    recordOutputs: true,
                },
            }
        );

        return {
            geminiSteps,
            openaiSteps,
            anthropicSteps
        };
    },
);