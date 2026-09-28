import { WorkflowsContainer, WorkflowsList } from "@/feutures/workflows/components/workflows";
import { workflowsParamsLoader } from "@/feutures/workflows/server/params-loader";
import { prefetchWorkflows } from "@/feutures/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";


type Props = {
    searchParams: Promise<SearchParams>
}

const Page = async ({searchParams}: Props) => {
    await requireAuth();

    const params = await workflowsParamsLoader(searchParams);

    prefetchWorkflows(params);

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