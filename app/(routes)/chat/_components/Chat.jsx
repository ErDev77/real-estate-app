'use client'
import React, { useEffect, useState } from 'react'
import {
	Chat,
	Channel,
	ChannelHeader,
	MessageList,
	MessageInput,
    Window,
    Thread,
    LoadingIndicator,
    ChannelList,
} from 'stream-chat-react'
import { StreamChat } from 'stream-chat'
import { useUser } from '@clerk/nextjs'
import useInitializeChatClient from '../useInitializeChatClient'

const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY)

const userId = 'user_2nRMCM7SOwwVHLCvh2ntUfaGVOQ'



    client.connectUser(
        {
            id: userId,
            name: 'Anna Ghazaryan',
        },
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yblJNQ003U093d1ZITEN2aDJudFVmYUdWT1EifQ.Sr_PvuW1c_COODR0mQ_aPdvjF9-dAMFWPghuxyKleyc'
    )

    const channel = client.channel('messaging', 'channel_1', {
        members: [userId],
        name: 'Channel #1',
    })

const ChatComponent = () => {

    const chatClient = useInitializeChatClient();
    const {user} = useUser();

    if(!chatClient || !user) {
        return (
            <div className='h-screen flex items-center justify-center'>
                <LoadingIndicator size={40}/>
            </div>
        )
    }
	return (
		<Chat client={client}>
            <ChannelList 
            filters={{
                type: "messaging",
                members: { $in: [user.id] }
            }}
            sort={{ last_message_at: -1 }}
            options={{state: true, presence: true, limit: 10}}
            />
			<Channel channel={channel}>
				<Window>
					<ChannelHeader />
					<MessageList />
					<MessageInput />
				</Window>
                <Thread />
			</Channel>
		</Chat>
	)

}

export default ChatComponent
