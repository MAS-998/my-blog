// Decap CMS OAuth 入口 - 跳转到 GitHub 授权页面
module.exports = async (req, res) => {
  const siteUrl = process.env.SITE_URL || 'https://my-blog-two-blue.vercel.app';
  const clientId = process.env.OAUTH_CLIENT_ID;

  if (!clientId) {
    return res.status(500).send('OAUTH_CLIENT_ID 未配置，请先在 Vercel 环境变量中设置');
  }

  const redirectUri = `${siteUrl}/api/auth/callback`;
  const githubAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=repo,user`;

  res.writeHead(302, { Location: githubAuthUrl });
  res.end();
};
