import{_ as a,c as i,a4 as n,o as p}from"./chunks/framework.BDeXF6e8.js";const d=JSON.parse('{"title":"使用git上传文件到gitea","description":"","frontmatter":{},"headers":[],"relativePath":"operations/git.md","filePath":"operations/git.md","lastUpdated":1735096072000}'),t={name:"operations/git.md"};function e(l,s,h,o,r,k){return p(),i("div",null,s[0]||(s[0]=[n(`<h1 id="使用git上传文件到gitea" tabindex="-1">使用git上传文件到gitea <a class="header-anchor" href="#使用git上传文件到gitea" aria-label="Permalink to &quot;使用git上传文件到gitea&quot;">​</a></h1><p>1.创建账号自己账号</p><p>2.创建一个gitee仓库</p><p>3.新建一个文件夹，</p><p>4.在该文件下右键git bash here，输入命令“git init”进行初始化</p><p>5.关联本地仓库和远端仓库</p><pre><code>git remote add origin “你仓库地址，无引号”

# 拉取远程代码带账户密码
git clone http://账号：密码@25.64.55.132:10888/cqzw_group/xqtc_front.git
</code></pre><p>6.如果之前在 Gitee 上创建仓库时选了README.md初始化仓库的，需要更新下本地仓库，以免上传项目时产生冲突：</p><pre><code>git pull --rebase origin master
</code></pre><p>7..输入“git commit -m&quot;注释&quot;”，进行提交注释 第一次可能会有提示信息问你是谁。安装要求设置一下即可</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 全局配置的用户信息</span></span>
<span class="line"><span>git config --global --list</span></span></code></pre></div><pre><code> git config --global user.email &quot;you@example.com&quot;
 git config --global user.name &quot;Your Name&quot;
</code></pre><p>8.将本地仓库代码提交到远端仓库</p><pre><code># 将当前分支的更改推送到 origin 的 master 分支
git push -u origin master
</code></pre><p>10.拉取远程仓库内容</p><pre><code># 从远程仓库 origin 的 master 分支获取最新的更改并合并到你当前的分支。
git pull origin master
</code></pre><p>9.之后项目更新，上传仓库只要在对应项目路径下打开 Git Bash 输入： git add . git commit -m &#39;备注&#39; git push</p><ol start="10"><li><p>本地创建分支</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看当前所有分支</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> branch</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建分支 dev</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># git branch dev</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 切换到dev分支</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> checkout</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建并切换到dev分支</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> checkout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -b</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建一个名为dev的新分支，并基于远程仓库的 origin/dev 分支进行切换。这意味着新创建的 dev 分支会包含 origin/dev 分支的所有最新内容。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> checkout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -b</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> origin/dev</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 将本地的 main 分支推送到远程的 dev 分支;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># origin：远程仓库的名称，通常是 origin。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># main：本地分支的名称，即你当前所在的分支。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># dev：远程分支的名称，即你希望推送代码到的目标分支。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> origin:main</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div></li><li><p>git配置代理</p><ol><li><p>配置代理</p><ul><li><p>全局</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">global http.proxy </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;http://127.0.0.1:10809&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">global https.proxy </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;http://127.0.0.1:10809&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">OR</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">global http.proxy </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;socks5://127.0.0.1:10808&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">global https.proxy </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;socks5://127.0.0.1:10808&#39;</span></span></code></pre></div></li><li><p>局部</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local http.proxy </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;127.0.0.1:10809&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local https.proxy </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;127.0.0.1:10809&#39;</span></span></code></pre></div></li></ul></li><li><p>取消代理</p><ul><li><p>全局</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">global </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">unset http.proxy</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">global </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">unset https.proxy</span></span></code></pre></div></li><li><p>局部</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">unset http.proxy</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">unset https.proxy</span></span></code></pre></div></li></ul></li><li><p>查看代理</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">global http.proxy</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">global https.proxy</span></span></code></pre></div></li></ol></li><li></li></ol><p>###强制上传 git add .<br> #提交进本地git仓库 git commit -am &#39;first commit init project&#39;<br> git push -f origin master</p><p>###1、远程仓库被拒绝： 可能是之前的推送的分支有问题，我在更新我的分支时，一直被拒绝（上面的报错），参考了网上的先pull远程分支来合并冲突，然后再push等方法无用后，我看了这篇文章How to fix issue in Git然后决定强行推送我的分支</p><p>方法：</p><p>git push --force-with-lease origin master:cfj 注：</p><p>①安全问题的解决： Git 更安全的强制推送 <a href="https://blog.csdn.net/WPwalter/article/details/80371264" target="_blank" rel="noreferrer">https://blog.csdn.net/WPwalter/article/details/80371264</a></p><p>参考链接<a href="https://blog.csdn.net/weixin_44048917/article/details/123619924" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_44048917/article/details/123619924</a><a href="https://www.cnblogs.com/choii/p/15810805.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/choii/p/15810805.html</a></p><p>11 提交失败，本地代码也没有，远程仓库也没有</p><p>参考资料：<a href="https://blog.csdn.net/yml15180824993/article/details/121857425" target="_blank" rel="noreferrer">https://blog.csdn.net/yml15180824993/article/details/121857425</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 1.查看本地当前的缓存列表，前提是提交有Git add 命令</span></span>
<span class="line"><span>git stash list </span></span>
<span class="line"><span>PS E:\\zjssnf\\autoweighs-vue&gt; git stash list</span></span>
<span class="line"><span>stash@{0}: lint-staged automatic backup</span></span>
<span class="line"><span>stash@{1}: WIP on master: c0748ba refactor(view): ♻️ 和后端对接数据</span></span>
<span class="line"><span>stash@{2}: lint-staged automatic backup</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 恢复指定id的stash内容到工作区，不会删除缓存列表记录。</span></span>
<span class="line"><span>git stash apply stash@{id}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>PS E:\\zjssnf\\autoweighs-vue&gt; git stash apply stash@{1} </span></span>
<span class="line"><span>error: unknown switch \`e&#39;</span></span>
<span class="line"><span>usage: git stash apply [--index] [-q | --quiet] [&lt;stash&gt;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -q, --quiet           be quiet, only report errors</span></span>
<span class="line"><span>    --index               attempt to recreate the index</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 出现上述问题是因为webstorm中，花括号在 powershell 中被认为是代码块执行标识符，若想正常使用，可用反引号 进行转义：stash@\`{0\`}，如下：</span></span>
<span class="line"><span>PS E:\\zjssnf\\autoweighs-vue&gt; git stash apply stash@\`{1\`}</span></span>
<span class="line"><span>On branch master</span></span>
<span class="line"><span>Your branch is up to date with &#39;origin/master&#39;.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Changes to be committed:</span></span>
<span class="line"><span>  (use &quot;git restore --staged &lt;file&gt;...&quot; to unstage)</span></span>
<span class="line"><span>        new file:   src/api/baseInfo/warehouseAndSupplie.ts</span></span>
<span class="line"><span>        new file:   src/api/solidWasteInfo/solidWaste.ts</span></span>
<span class="line"><span>        new file:   src/api/solidWasteInfo/type.ts</span></span>
<span class="line"><span>        new file:   src/routers/modules/solidWasteInfo.ts</span></span>
<span class="line"><span>        new file:   src/routers/modules/weighInfo.ts</span></span>
<span class="line"><span>        new file:   src/views/home/components/HandWeighDialogs.vue</span></span>
<span class="line"><span>        new file:   src/views/solidWasteInfo/components/SolidWasteDialog.vue</span></span>
<span class="line"><span>        new file:   src/views/solidWasteInfo/index.vue</span></span>
<span class="line"><span>Changes not staged for commit:</span></span>
<span class="line"><span>  (use &quot;git add/rm &lt;file&gt;...&quot; to update what will be committed)</span></span>
<span class="line"><span>  (use &quot;git restore &lt;file&gt;...&quot; to discard changes in working directory)</span></span>
<span class="line"><span>        modified:   .eslintrc-auto-import.json</span></span>
<span class="line"><span>        modified:   package.json</span></span>
<span class="line"><span>        modified:   pnpm-lock.yaml</span></span>
<span class="line"><span>        modified:   src/api/baseInfo/material.ts</span></span>
<span class="line"><span>        modified:   src/api/baseInfo/supplier.ts</span></span>
<span class="line"><span>        modified:   src/api/baseInfo/transport.ts</span></span>
<span class="line"><span>        modified:   src/api/baseInfo/types.ts</span></span>
<span class="line"><span>        modified:   src/api/baseInfo/vehicle.ts</span></span>
<span class="line"><span>        modified:   src/api/baseInfo/weigh.ts</span></span>
<span class="line"><span>        modified:   src/api/baseInfo/weighRecord.ts</span></span>
<span class="line"><span>        modified:   src/api/home/types.ts</span></span>
<span class="line"><span>        modified:   src/api/home/weigh.ts</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span># 或 恢复最近的stash内容到工作区，会删除缓存列表记录。 </span></span>
<span class="line"><span> git stash pop</span></span></code></pre></div>`,27)]))}const c=a(t,[["render",e]]);export{d as __pageData,c as default};
