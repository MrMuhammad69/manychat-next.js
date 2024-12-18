import { useAutomationPosts } from '@/hooks/use-automations'
import { useQueryAutomationPost } from '@/hooks/use-query-automation'
import React from 'react'
import TriggerButton from './trigger-button'
import { InstagramPostProps } from '@/types/post.type'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import Loader from './loader'

type Props = {
  id: string
}

const PostButton = ({id}: Props) => {
    const {data} = useQueryAutomationPost()
    const {isPending,mutate,onSelectPost,posts} = useAutomationPosts(id)
  return (
    <TriggerButton label='Attach a post'>
      {data?.status ===200 ? (
        <div className='flex flex-col gap-y-3 w-full'>
          <div className='flex flex-wrap w-full gap-3'>
            {data.data?.data?.map((post: InstagramPostProps) => (
              <div key={post.id} className='relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden' onClick={() => onSelectPost({
                postid: post.id,
                media: post.media_url,
                mediaType: post.mediaType,
                caption: post.caption

              })}>
                {posts.find((p)=> p.postid === post.id) && (
                  <CheckCircle fill='white' stroke='black' className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50' />
                )}
                <Image src={post.media_url} fill sizes='100vw' alt='Post pic' className={cn('hover:opacity-75 transition duration-100',posts.find((p)=> p.postid === post.id) && 'opacity-75')} />
              </div>
            ))}
          </div>
          <Button onClick={mutate} disabled={posts.length === 0} className='bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70] ' >
            <Loader state={isPending}>
              Attach post
            </Loader>

          </Button>
        </div>
      ): <p className='text-text-secondary text-center'>No posts found!</p> }

    </TriggerButton>
  )
}

export default PostButton