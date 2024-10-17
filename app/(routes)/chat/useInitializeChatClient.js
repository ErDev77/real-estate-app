import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'

function useInitializeChatClient() {
	const { user } = useUser()
	const [chatClient, setChatClient] = useState(null);

	useEffect(() => {
		if (!user?.id) return

		const client = StreamChat.getInstance(
			process.env.NEXT_PUBLIC_STREAM_API_KEY
		)

        client.connectUser(
            {
                id: user?.id,
                name: user.fullName || user.id,
                image: user.imageUrl
            },
            async () => {
                const response = await fetch("api/get-token");
                if(!response.ok) {
                    throw Error("failed to get token")
                }
                const  body = await response.json();
                return body.token
            }
        ).catch((error) => console.error("failed to connect user", error)
        ).then(() =>  setChatClient(client))

        return () => {
            setChatClient(null)
            client
            // .disconnectUser()
            // .catch((error) => console.error("failed to disconnet user", error))
            // .then(() => console.log("connection closed"));
        };
	}, [user?.id, user?.fullName, user?.imageUrl]);
    return chatClient
}

export default useInitializeChatClient
