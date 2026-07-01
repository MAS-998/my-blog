module.exports = async (req, res) => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send('OAUTH_CLIENT_ID 未配置');
  }
  const siteUrl = process.env.SITE_URL || 'https://my-blog-two-blue.vercel.app';
  const redirectUri = `${siteUrl}/api/auth/callback`;
  res.writeHead(302, {
    Location: `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`
  });
  res.end();
};
