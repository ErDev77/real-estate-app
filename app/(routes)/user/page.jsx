'use client'

import {
	UserButton,
	UserProfile,
	SignedIn,
	SignedOut,
	RedirectToSignIn,
} from '@clerk/nextjs'
import { Building2 } from 'lucide-react'
import React from 'react'
import UserListings from './_components/UserListings'

function User() {
	return (
		<div className='my-6 md:px-10 lg:px-32 w-full'>
			<SignedIn>
				<h2 className='font-bold text-2xl py-3 ml-6'>Profile</h2>
				<UserProfile routing='hash'>
					<UserButton.UserProfilePage
						label='My Listings'
						labelIcon={<Building2 className='h-5 w-5' />}
						url='my-listings'
					>
						<UserListings />
					</UserButton.UserProfilePage>
				</UserProfile>
			</SignedIn>

			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</div>
	)
}

export default User
