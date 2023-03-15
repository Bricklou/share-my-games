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
};

export default nextConfig;
