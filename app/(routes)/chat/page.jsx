// pages/message.jsx
"use client"
import React from 'react'
import ChatComponent from './_components/Chat'
import { useUser } from '@clerk/nextjs'


const MessagePage = () => {
     const { user } = useUser
	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Chat</h1>
			<ChatComponent user={user} />
		</div>
	)
}

export default MessagePage
