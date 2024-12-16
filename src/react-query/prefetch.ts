import { getAllAutomations, getAutomationsInfo } from "@/action/automations"
import { onUserInfo } from "@/action/user"
import { QueryClient, QueryFunction } from "@tanstack/react-query"

const prefetch = async (client: QueryClient, action: QueryFunction, key: string) => {
    return await client.prefetchQuery({
        queryKey: [key],
        queryFn: action,
        staleTime:  6000, 
    })
}
export const PrefetchUserProfile = async (client: QueryClient) => {
    return await prefetch(client, onUserInfo, 'user-profile' )
}

export const prefetchUserAutomations = async (queryClient: QueryClient) => {
    return await prefetch(queryClient, getAllAutomations, 'user-automations' )
    
}


export const prefetchUserAutomation = async (client:QueryClient, automationId: string) => {
    return await prefetch(
        client,
        ()=> getAutomationsInfo(automationId),'automation-info')
}