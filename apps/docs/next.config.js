/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['raw.githubusercontent.com'],
	},
	eslint: {
		ignoreDuringBuilds: true
	},
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	webpack: (config) => {
		// this will override the experiments
		config.experiments = { ...config.experiments, topLevelAwait: true };
		// this will just update topLevelAwait property of config.experiments
		// config.experiments.topLevelAwait = true 
		return config;
	},
}

module.exports = nextConfig
