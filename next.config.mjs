import TerserPlugin from "terser-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // or your dev port
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000", // or your dev port
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "agritech.cybermatrixsolutions.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "agritech.cybermatrixsolutions.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "stocksight.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "webapi.ampivo.green",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "72.62.246.54",
        port: "5000", // or your dev port
        pathname: "/**",
      },
    ],
  },

  // reactStrictMode: true,

  // swcMinify: true,

  // webpack(config, { isServer }) {
  //   if (!isServer) {
  //     config.optimization.minimizer.push(
  //       new TerserPlugin({
  //         terserOptions: {
  //           mangle: true,
  //           compress: true,
  //           output: {
  //             comments: false,
  //           },
  //         },
  //       })
  //     );
  //   }
  //   return config;
  // },

  // output: "standalone",
};

export default nextConfig;
