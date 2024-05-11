/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["raw.githubusercontent.com"],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack: (config) => {
		// this will override the experiments
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		};
		// this will just update topLevelAwait property of config.experiments
		// config.experiments.topLevelAwait = true
		return config;
	},
};

export default nextConfig;
