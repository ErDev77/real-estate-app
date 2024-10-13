import React, { Children } from "react"
import { twMerge } from "tailwind-merge";



const Box = ({
    children,
    className
}) => {
    return (
			<div
				className={twMerge(
					`
            bg-neutral-900
            rounded-lg
            min-h-screen
            w-full
        `,
					className
				)}
			>
				{children}
			</div>
		)
}

export default Box; 