import { getAllAutomations } from "@/action/automations"
import { useQuery } from "@tanstack/react-query"

export const useQueryAutomation = () => {
    return useQuery({
        queryKey: ['user-automations'],
        queryFn: getAllAutomations,
    })
}