import { generateTokens } from "@/lib/fetch"
import { OnCurrentUser } from "../user"
import { createIntegration, getIntegration } from "./queries"
import axios from "axios"

export const onIntegrate = async (code:string) => {
    const user = await OnCurrentUser()
    try {
        const integrations = await getIntegration(user.id)
        if(integrations && integrations.integrations.length ===0){
            const token = await generateTokens(code)
            console.log('got Token', token)
            if(token){
                const insta_id = await axios.get(
                    `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
                )

                const today = new Date()
                const expire_data = today.setDate(today.getDate()+60)
                const create = createIntegration(user.id, token.access_token, new Date(expire_data), insta_id.data.user_id)
                return {status:200, data: create }
            }
            return {status:401}
        } 
        return {status: 404}
    } catch (error) {
        return {status: 500}
        
    }
}