# 部署指南

## 方式一：Vercel（推荐，国内访问快）

1. **创建 GitHub 仓库**
   - 打开 https://github.com/new
   - 仓库名填 `my-blog`（或任意名字）
   - 创建后复制仓库地址

2. **推送代码到 GitHub**
   ```bash
   cd reasonix-blog
   git init
   git add .
   git commit -m "first commit"
   git remote add origin https://github.com/你的用户名/my-blog.git
   git push -u origin main
   ```

3. **导入 Vercel**
   - 打开 https://vercel.com/new
   - 用 GitHub 登录
   - 选择刚才创建的仓库
   - Framework Preset 选 **Hexo**
   - 点击 Deploy，等一两分钟

4. **完成**
   - Vercel 会自动分配一个 `xxx.vercel.app` 域名
   - 以后每次 `git push` 自动重新部署

## 方式二：GitHub Pages（纯免费）

1. 同上，推送代码到 GitHub
2. 安装部署插件：
   ```bash
   npm install hexo-deployer-git --save
   ```
3. 修改 `_config.yml`：
   ```yaml
   deploy:
     type: git
     repo: https://github.com/你的用户名/你的用户名.github.io
     branch: main
   ```
4. 执行部署：
   ```bash
   npx hexo deploy
   ```

## 以后写新日记

```bash
cd reasonix-blog
npx hexo new "日记标题"
# 编辑 source/_posts/日记标题.md
# 如果需要配图，把图片放在 source/_posts/日记标题/ 文件夹里
npx hexo generate    # 本地预览
npx hexo server      # 打开 http://localhost:4000
git add . && git commit -m "新日记" && git push  # 发布到外网
```
