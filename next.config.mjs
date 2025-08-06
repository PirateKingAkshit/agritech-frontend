import TerserPlugin from "terser-webpack-plugin";

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["localhost", "127.0.0.1"],
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
