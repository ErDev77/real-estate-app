import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
	const path = usePathname()
	const { user, isSignedIn } = useUser()

	useEffect(() => {
		console.log(path)
	}, [path])

	const isHomePage = path === '/'

	return (
		<div
			className={`p-0 px-10 flex justify-between w-full z-20 ${
				isHomePage
					? 'bg-transparent absolute top-0'
					: 'bg-white fixed top-0 shadow-sm'
			}`}
		>
			<div className='flex gap-12 items-center'>
				<Image src={'/logo.svg'} width={110} height={110} alt='logo' />
				<ul className='hidden md:flex gap-10'>
					<Link href={'/'}>
						<li
							className={`hover:text-primary font-semibold text-base cursor-pointer ${
								path === '/' ? 'text-primary' : path === '/' && 'text-white'
							}`}
						>
							Home
						</li>
					</Link>
					<Link href={'/sell'}>
						<li
							className={`hover:text-primary font-semibold text-base cursor-pointer ${
								path === '/sell'
									? 'text-primary'
									: isHomePage
									? 'text-white'
									: ''
							}`}
						>
							For Sale
						</li>
					</Link>
					<li
						className={`hover:text-primary font-semibold text-base cursor-pointer ${
							isHomePage ? 'text-white' : ''
						}`}
					>
						For Rent
					</li>
				</ul>
			</div>
			<div className='flex gap-2 items-center'>
				<Link href={'/add-new-listing'}>
					<Button className='flex gap-2 text-base font-semibold '>
						<Plus className='h-5 w-5' />
						Post Your Ad
					</Button>
				</Link>
				{isSignedIn ? (
					<UserButton />
				) : (
					<Link href={'/sign-in'}>
						<Button variant='outline' className='text-base font-semibold'>
							Login
						</Button>
					</Link>
				)}
			</div>
		</div>
	)
}

export default Header

// "use client"

// import { Button } from '@/components/ui/button'
// import { UserButton, useUser } from '@clerk/nextjs'
// import { Plus } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React, { useEffect } from 'react'

// function Header() {
//     const path = usePathname();
//     const { user, isSignedIn } = useUser();
//     useEffect(() => {
//         console.log(path)
//     }, [])
//   return (
// 		<div className='p-0 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white '>
// 			<div className='flex gap-12 items-center'>
// 				<Image src={'/logo.svg'} width={110} height={110} alt='logo' />
// 				<ul className='hidden md:flex gap-10'>
// 					<Link href={'/'}>
// 						<li
// 							className={'hover:text-primary font-semibold text-base cursor-pointer'
//                     ${path == '/' && 'text-primary'}}
// 						>
// 							Home
// 						</li>
// 					</Link>
// 					<Link href={'sell'}>
// 						<li
// 							className={'hover:text-primary font-semibold text-base cursor-pointer'
//                     ${path == 'sell' && 'text-primary'}}
// 						>
// 							For Sale
// 						</li>
// 					</Link>
// 					<li className='hover:text-primary font-semibold text-base cursor-pointer'>
// 						For Rent
// 					</li>
// 				</ul>
// 			</div>
// 			<div className='flex gap-2 items-center'>
// 				<Link href={'/add-new-listing'}>
// 					<Button className='flex gap-2 text-base font-semibold '>
// 						<Plus className='h-5 w-5' />
// 						Post Your Ad
// 					</Button>
// 				</Link>
// 				{isSignedIn ? (
// 					<UserButton />
// 				) : (
// 					<Link href={'/sign-in'}>
// 						<Button variant='outline' className='text-base font-semibold'>
// 							Login
// 						</Button>
// 					</Link>
// 				)}
// 			</div>
// 		</div>
// 	)
// }

// export default Header
