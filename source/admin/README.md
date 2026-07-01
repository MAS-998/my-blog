# 启用后台编辑器

要去 GitHub 创建一个 OAuth App，才能用 Decap CMS 登录。

## 操作步骤

1. 打开 https://github.com/settings/developers
2. 点 **「New OAuth App」**
3. 填写：

   | 字段 | 值 |
   |------|-----|
   | Application name | `my-blog-cms` |
   | Homepage URL | `https://my-blog-two-blue.vercel.app` |
   | Authorization callback URL | `https://my-blog-two-blue.vercel.app/api/callback` |

4. 点 **「Register application」**
5. 记下 **Client ID**（等下要用）
6. 点 **「Generate a new client secret」**，复制秘钥

## 在 Vercel 设置环境变量

1. 打开 https://vercel.com/mas-998/my-blog/settings/environment-variables
2. 添加两个变量：

   | 名称 | 值 |
   |-----|-----|
   | `OAUTH_GITHUB_CLIENT_ID` | 你刚才复制的 Client ID |
   | `OAUTH_GITHUB_CLIENT_SECRET` | 你刚才复制的 Client Secret |

3. 重新部署一次（推送代码会自动部署）

搞定后打开 `https://my-blog-two-blue.vercel.app/admin` 就能用 GitHub 登录写日记了。
