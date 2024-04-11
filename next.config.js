/** @type {import('next').NextConfig} */
const intercept = require('intercept-stdout');

const nextConfig = {
  reactStrictMode: true,
}

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return "";
  }
  return text;
}

intercept(interceptStdout);

module.exports = nextConfig
