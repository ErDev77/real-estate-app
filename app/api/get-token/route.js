import { currentUser } from '@clerk/nextjs/dist/types/server'
import { NextResponse } from 'next/server'
import { StreamChat } from 'stream-chat'

export async function GET() {
	try {
		const user = await currentUser()
		console.log('Calling gettoken for user', user?.id)

		if (!user) {
			return NextResponse.json(
				{ error: 'User not authenticated' },
				{ status: 401 }
			)
		}

		const streamClient = StreamChat.getInstance(
			env.NEXT_PUBLIC_STREAM_SECRET_KEY,
			env.NEXT_PUBLIC_STREAM_API_KEY
		)

		const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60
		const issuedAt = Math.floor(Date.now() / 1000) - 60
		const token = streamClient.createToken(user.id, expirationTime, issuedAt)

		return NextResponse.json({ token }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
