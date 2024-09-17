/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
import withTM from 'next-transpile-modules';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTranspilation = withTM([
    '@mui/material',
    '@mui/system',
    '@mui/icons-material', // If @mui/icons-material is being used
])
  
const nextConfig = withTranspilation({
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@mui/styled-engine': '@mui/styled-engine-sc',
        }
        config.module.rules.push({
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        })
        return config
    },
})

export default nextConfig;