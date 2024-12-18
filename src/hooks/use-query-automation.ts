'use client'
import { getAllAutomations, getAutomationsInfo, getProfilePosts } from "@/action/automations"
import { onUserInfo } from "@/action/user"
import { useQuery } from "@tanstack/react-query"

export const useQueryAutomations = () => {
    return useQuery({
        queryKey: ['user-automations'],
        queryFn: getAllAutomations,
    })
}


export const useQueryAutomation = (id: string) => {
    return useQuery({
        queryKey: ['automation-info'],
        queryFn: () => getAutomationsInfo(id)
    })
}

export const useQueryUser = ()=> {
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: onUserInfo
    })
}

export const useQueryAutomationPost = () => {
    const fetchPosts = async () => await getProfilePosts()
    return useQuery({
        queryKey: ['intagram-media'],
        queryFn: fetchPosts,
        
    })
}