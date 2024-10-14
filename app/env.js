import { createEnv } from '@t3-oss/env-core'
import { experimental_taintObjectReference } from 'react'
import { z } from 'zod'

export const env = createEnv({
	server: {
		NEXT_PUBLIC_STREAM_SECRET_KEY: z.string().min(1),
		CLERK_SECRET_KEY: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_STREAM_API_KEY: z.string().min(1),
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
	},
	experimental_runtimeEnv: {
		NEXT_PUBLIC_STREAM_API_KEY: process.env.NEXT_PUBLIC_STREAM_API_KEY,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
	},
})