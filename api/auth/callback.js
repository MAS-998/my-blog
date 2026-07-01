// Decap CMS OAuth 回调 - GitHub 授权后跳转回来
module.exports = async (req, res) => {
  const { code } = req.query;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!code) {
    return res.status(400).send('缺少授权码');
  }

  if (!clientId || !clientSecret) {
    return res.status(500).send('OAuth 环境变量未配置');
  }

  try {
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

    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <!DOCTYPE html>
      <html>
      <body>
        <script>
          (function() {
            var origin = window.location.origin;
            window.opener.postMessage(
              'authorization:${data.access_token}:${data.scope || ""}',
              origin
            );
            window.close();
          })();
        </script>
        <p>授权成功，请关闭此窗口</p>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('服务器错误: ' + err.message);
  }
};
