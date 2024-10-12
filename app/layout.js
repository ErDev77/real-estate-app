import localFont from "next/font/local";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Real Estate",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
		<ClerkProvider>
			<html lang='en'>
				<head>
					<title>{metadata.title}</title>
					<meta name='description' content={metadata.description} />
					<link rel='icon' href='/logo.svg' />
				</head>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<Toaster />
					<Provider>{children}</Provider>
				</body>
			</html>
		</ClerkProvider>
	)
}
