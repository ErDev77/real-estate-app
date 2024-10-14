'use client'

import { BeatLoader } from 'react-spinners'
import Box from '@/app/_components/Box'
const Loading = () => {
	return (
		<Box
			className='
			fixed
			inset-0
			flex
			items-center
			justify-center
			bg-white
			z-50
        '
		>
			<BeatLoader color='blue' size={20} />
		</Box>
	)
}

export default Loading
