// Decap CMS OAuth 回调 - GitHub 授权后跳转回来
module.exports = async (req, res) => {
  const { code } = req.query;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!code) {
    return res.status(400).send('缺少授权码');
  }

  try {
    // 用授权码换取 access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenRes.json();

    if (data.error) {
      return res.status(400).send(`GitHub OAuth 错误: ${data.error_description || data.error}`);
    }

    // 把 token 传回给 Decap CMS（通过 URL hash 方式）
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <!DOCTYPE html>
      <html>
      <body>
        <script>
          var data = {
            token: '${data.access_token}',
            provider: 'github'
          };
          window.opener.postMessage(data, '*');
          window.close();
        </script>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send(`服务器错误: ${err.message}`);
  }
};
