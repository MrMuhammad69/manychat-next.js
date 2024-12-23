'use server'

import { client } from "@/lib/prisma"
import { v4 } from "uuid"

export const createAutomation = async (clerkId: string, id?: string) => {
    return await client.user.update({
      where: {
        clerkId,
      },
      data: {
        automations: {
          create: {
            ...(id && { id }),
          },
        },
      },
    })
  }
  


export const getAutomations = async (clerkId:string) => {
    return await client.user.findFirst({where:{clerkId}, select: {
        automations: {
            orderBy: {
                createdAt: 'asc'
            },
            include: {
                keywords: true,
                listener: true
            }
        }
    }})
}


export const findAutomation = async (id:string) => {
    return await client.automation.findUnique({
        where: {
            id
        },
        include: {
            keywords: true,
            listener: true,
            trigger: true,
            posts: true, 
            User: {
                select: {
                    integrations: true,
                    subscription: true
                }
            }
        },
    })
}


export const addListener = async (automationId:string, listener:'SMARTAI'|'MESSAGE',prompt: string, reply?:string ) => {
  return await client.automation.update({
    where:{
      id: automationId
    },
    data:{
      listener: {
        create: {
          listener: listener,
          prompt: prompt,
          commentReply: reply
        }
      }
    }
  })
}


export const updateAutomation = async (id:string, update: {
  name?: string
  active?: boolean
}) => {
  return await client.automation.update({
    where: {
      id
    },
    data: {
      name: update.name,
      active: update.active
    }
  })
}



export const addTrigger = async (automationId: string, trigger: string[])=> {
  if(trigger.length === 2){
    return await client.automation.update({
      where: {
        id: automationId
      },
      data: {
        trigger: {
          createMany: {
            data:[{type: trigger[0]}, {type: trigger[1]}]
          }
        }
      }
    })
  }
  return await client.automation.update({
    where: {
      id: automationId
    },
    data: {
      trigger: {
        create: {
          type: trigger[0]
        }
      }
    }
  })
}


export const createKeyword = async (id:string, keyword: string) => {
  return await client.automation.update({
    where: {id: id},
    data: {
      keywords: {
        create: {
          word: keyword
        }
      }
    }
  }) 
}


export const deleteWord = async (id: string)=> {
  return await client.keyword.delete({
    where: {
      id: id
    }
  })
}


export const addPost = async (id:string, posts: {
  postid: string
  catpion?: string
  media: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
}) => {
  return await client.automation.update({
    where: {
      id: id
    },
    data:{
      posts: {
        createMany: {
          data: posts
        }
      }
    }
  })
}


export const updateSubscription = async (clerkId: string, props: {customerId?: string, plan?: "PRO" | 'FREE' })=> {
  return await client.user.update({
    where:{
      clerkId: clerkId
    },
    data: {
      subscription: {
        update: {
          data: {
            ...props,
          }
        }
      }
    }
  })
  
}