'use server'

import { stripe } from "@/lib/stripe"
import { OnCurrentUser } from "../user"
import { findUser } from "../user/queries"
import { addListener, addPost, addTrigger, createAutomation, createKeyword, deleteWord, findAutomation, getAutomations, updateAutomation, updateSubscription } from "./queries"
import { redirect } from "next/navigation"

export const createAutomations = async (id?: string) => {
    const user = await OnCurrentUser()
    try {
      const create = await createAutomation(user.id, id)
      if (create) return { status: 200, data: 'Automation created', res: create }
  
      return { status: 404, data: 'Oops! something went wrong' }
    } catch (error) {
      return { status: 500, data: 'Internal server error' }
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

export const getAutomationsInfo = async (id:string) => {
    try {
        const automation = await findAutomation(id)
        if(automation) return {status: 200, data: automation}
        return {status: 404, data: 'Automation not found'}
    } catch (error) {
        return {status: 500, data: 'internal server error occured'}
    }
}

export const updateAutomationName = async (automationId: string, data: {
  name?: string, 
  active?: boolean,
  automation?: string
}) => {
  await OnCurrentUser()
  try {
    const update = await updateAutomation(automationId, data)
    if(update){
      return {status: 200, data: 'Automation updated successfully.'}
    }
    return {status: 404, data: 'could not find automation'}
  } catch (error) {
    return {status: 500, data:'internal server error '}
    
  }
}

export const saveListener = async (automationId:string, listener: 'SMARTAI'|'MESSAGE', prompt: string, reply?: string) => {
  await OnCurrentUser()
  try {
    const create = await addListener(automationId, listener, prompt, reply)
    if(create) return {status: 200, data: 'Listener created'}
    return {status: 404, data:'Listener is not created'}
  } catch (error) {
    return {status: 500, data: 'Internal Sever Error'}
  }
}


export const saveTrigger = async (automationId:string, trigger: string[]) => {
  await OnCurrentUser()
  try {
    const create = await addTrigger(automationId, trigger)
    if(create){
      return {status: 200, data: 'Trigger Added'}

    }
    return {status: 404, data: 'Trigger not added'}
  } catch (error) {
    return {status: 500, data: 'Internal Sever Error'}
  }
  
}


export const saveKeyword = async (id:string, keyword: string) => {
  await OnCurrentUser()
  try {
    const create = await createKeyword(id, keyword)
    if(create) return {status: 200, data: 'Keyword added successfully'}
    return {status: 404, data: 'Keyword not added'}
  } catch (error) {
    return {status: 500, data: 'Internal Sever Error'}
  }
  
}


export const deleteKeyword = async (id:string) =>  {
  await OnCurrentUser()
  try {
    const delte = await deleteWord(id)
    if(delte){
      return {status: 200, data: 'Keyword deleted successfully'}
    }
    return {status: 400, data: 'Unable to delete the keywords'}
  } catch (error) {
    return {status: 500, data: 'Internal Sever Error'}
  }
  
}


export const getProfilePosts = async () => {
  const user = await OnCurrentUser()
  try {
    const profile = await findUser(user.id)
    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`
    )
    const parsed = await posts.json()
    if (parsed) return { status: 200, data: parsed }
    console.log('🔴 Error in getting posts')
    return { status: 404 }
  } catch (error) {
    console.log('🔴 server side Error in getting posts ', error)
    return { status: 500 }
  }
}



export const savePosts = async (automationId: string, posts: {
  postid: string
  caption?: string
  media: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
})=> {
  await OnCurrentUser()
  try {
    const saved = await addPost(automationId, posts)
  if(saved) return {status: 201, data: 'Post Created'}
  return {status: 400, data: 'Unable to create post'}
  } catch (error) {
    return {status: 500, data: 'Internal Server Error'}
  }
}

export const activateAutomation = async (id: string, state:boolean )=> {
  await OnCurrentUser()
  try {
    const update = await updateAutomation(id, {active: state})
    if(update) return {status: 200, data: `Automation ${state ? 'activated' : 'deactivated'}`}
    return {status: 400, data: 'Unable to activate the automation'}
  } catch (error) {
    return {status: 500, data: 'Internal Server Error'}
  }
}


 export const onSubscribe = async (session_id: string) => {
  const user  = await OnCurrentUser()
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if(session){
      const subscribed = await updateSubscription(user.id, {customerId: session.customer as string, plan: 'PRO'})
      if(subscribed) {
        return {status: 200}
      }
      return {status: 400, data: 'Unable to subscribe'}
    }
  } catch (error) {
    return {status: 500}
  }
  
 }


 export const onOAuthInstagram =  async (strategy: "INSTAGRAM" | "CRM") => {
  if(strategy === 'INSTAGRAM'){
    return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
  }
  
 }