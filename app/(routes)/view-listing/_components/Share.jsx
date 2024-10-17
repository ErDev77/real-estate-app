import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
} from 'react-share'

export default function ShareButton() {
	const shareUrl = window.location.href
	const title = 'Заголовок'

	return (
		<div className='flex space-x-2'>
			<FacebookShareButton url={shareUrl} quote={title}>
				<FacebookIcon size={32} round />
			</FacebookShareButton>
			<TwitterShareButton url={shareUrl} title={title}>
				<TwitterIcon size={32} round />
			</TwitterShareButton>
			<WhatsappShareButton url={shareUrl} title={title}>
				<WhatsappIcon size={32} round />
			</WhatsappShareButton>
		</div>
	)
}
