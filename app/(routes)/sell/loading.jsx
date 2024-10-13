'use client'

import { BeatLoader } from 'react-spinners'
import Box from '@/app/_components/Box'
const Loading = () => {
	return (
		<Box
			className='
        h-screen
        flex
        items-center
        justify-center
		mt-16
        '
		>
			<BeatLoader color='#22c55e' size={20} />
		</Box>
	)
}

export default Loading
