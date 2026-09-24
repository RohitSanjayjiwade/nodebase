import { WorkflowsContainer, WorkflowsList } from "@/feutures/workflows/components/workflows";
import { prefetchWorkflows } from "@/feutures/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
    await requireAuth();

    prefetchWorkflows();

    return (
        <WorkflowsContainer>
            <HydrateClient>
                <ErrorBoundary fallback={<div>Error!</div>}>
                    <Suspense fallback={<p>Loading...</p>}>
                        <WorkflowsList />
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </WorkflowsContainer>
    );
};

export default Page;