const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "mfg-dx-toolkit";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isGithubActions ? `/${repoName}` : "",
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
