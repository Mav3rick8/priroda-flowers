import type { NextConfig } from "next";

// На GitHub Pages сайт лежит в подпапке /<имя репозитория>. Путь задаёт workflow.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
