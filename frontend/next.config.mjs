import url from 'url';

const apiUrl = url.parse(process.env.NEXT_PUBLIC_DIRECTUS_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		typedRoutes: true,
	},
	eslint: {
		dirs: ['src'],
	},
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: apiUrl.protocol.replace(':', ''),
				hostname: apiUrl.hostname,
				port: apiUrl.port,
				pathname: apiUrl.pathname + 'assets/*',
			},
		],
	},
};

export default nextConfig;
