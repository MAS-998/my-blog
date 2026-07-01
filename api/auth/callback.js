module.exports = async (req, res) => {
  const { code } = req.query;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!code) return res.status(400).send('缺少授权码');
  if (!clientId || !clientSecret) return res.status(500).send('OAuth 环境变量未配置');

  try {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await r.json();

    if (data.error) {
      return res.status(400).send('GitHub OAuth 错误: ' + (data.error_description || data.error));
    }

    res.setHeader('Content-Type', 'text/html');
    res.end(`<!DOCTYPE html><html><body><script>
      window.opener.postMessage({
        type: 'authorization',
        token: '${data.access_token}',
        provider: 'github'
      }, '*');
      window.close();
    </script><p>授权成功</p></body></html>`);
  } catch (err) {
    res.status(500).send('服务器错误: ' + err.message);
  }
};
