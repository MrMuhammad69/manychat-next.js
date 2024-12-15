'use server'

import { OnCurrentUser } from "../user"
import { createAutomation, getAutomations } from "./queries"

export const createAutomations = async (id: string) => {
    const user = await OnCurrentUser()
    try {
        const create = await createAutomation(user.id)
        if(create) return {status: 200, data: 'Automation created.'}
        return {status: 404, data: 'Oops! Something went wrong.'}
    } catch (error) {
        return {status: 500, data: 'Internal server error'}
    }
}

export const getAllAutomations = async () => {
    const user = await OnCurrentUser()
    try {
        const automations = await getAutomations(user.id)
        if (automations) return {status: 200, data: automations.automations}
    } catch (error) {
        
    }
}