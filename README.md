# shuihu-Chronicle
项目名称：水浒风云录---水浒传科普微信小程序;
技术栈：微信小程序、阿里云 OSS;
技术架构:微信小程序原生架构+第三方云服务;
安装微信开发者工具，在 config/index.js 中把资源地址替换成自己的即可运行;
团队信息:1梁文杰2.曾俊锋3.卢穗基

## 目录分层（视图与数据分离）

- `config/` 统一配置：OSS 资源地址、缓存键、页面路由、后端接口开关
- `data/` 静态数据：108 位好汉档案、剧情对话脚本、成就规则
- `services/` 数据服务层：页面唯一的数据入口
  - `request.js` 前后端边界，统一封装 `wx.request`
  - `heroService.js` 好汉档案与五维计算、测试匹配等领域逻辑
  - `achievementService.js` 成就规则计算与新解锁待提示队列
  - `progressService.js` 本地进度、成就、用户资料（缓存读写收口）
  - `dialogService.js` 剧情脚本查询
  - `audioService.js` BGM 与音效
  - `friendService.js` 好友云函数调用（需部署后启用）
- `cloudfunction/friend/` 好友云函数（服务端，用户身份由 openid 自动获取）
- `utils/tip.js` 把待提示成就交给页面上的 `globaltips` 组件依次弹出
- `pages/` 视图层：只负责渲染与交互，不直接读写缓存、静态数据或网络

## 接入后端

默认 `config.API.enabled = false`，全项目零网络请求、纯本地可用。
需要接后端时，在 `config/index.js` 填写 `baseURL` 并打开 `enabled`，
`heroService.refreshFromRemote()` 会在启动时从 `endpoints.heroes` 预热数据；
其余服务把 `read/write` 换成 `request.get/post` 即可，页面代码无需改动。
远程请求失败时自动回退本地数据，保证离线可用。

> 说明：`API.enabled` 控制静态数据的 REST 后端；`CLOUD.enabled` 控制好友功能的微信云开发，两者互不影响。

## 好友功能：需要云服务器或数据库吗？

**数据库必须有，但不需要自己买云服务器。**

好友关系是跨用户共享的数据，`wx.setStorageSync` 只存在自己手机上，
A 用户写入的内容 B 用户永远读不到，所以纯前端无法实现好友功能。

推荐**微信云开发**（Serverless）：云数据库 + 云函数，
不用买服务器、不用域名备案、不用配置 request 合法域名；
云函数通过 `cloud.getWXContext().OPENID` 自动拿到用户身份，
前端只调 `services/friendService.js`，不接触任何 openid。
云开发有免费额度，本项目之前也配置过云环境，可直接复用或新建。

### 部署步骤

1. 微信开发者工具 → 顶部「云开发」→ 开通并创建环境，复制**环境 ID**。
2. 打开 `config/index.js`：
   - `CLOUD.env` 填环境 ID（例：`cloud1-xxxxxxxx`）
   - `CLOUD.enabled` 改为 `true`
3. 云开发控制台 → 数据库 → 新建 3 个集合：
   - `sh_users`：用户资料（昵称、头像、邀请码、收集数）
   - `sh_friend_requests`：好友申请
   - `sh_friendships`：好友关系
   
   三个集合权限都选「**仅管理端可读写**」——云函数以管理员身份访问，
   前端不直连数据库，避免越权读取他人资料。
4. 开发者工具左侧右键 `cloudfunction/friend` →
   「上传并部署：云端安装依赖」（会按 `package.json` 安装 `wx-server-sdk`）。
   建议在云开发控制台把该云函数超时从默认 3 秒调到 10 秒。
5. 重新编译 → 个人中心 →「我的好友」。进入页面会自动生成 6 位邀请码，
   复制给朋友，对方在「添加好友」里输入即可发送申请；
   你同意后双方出现在好友列表，可查看彼此收集进度、删除好友。
   若双方互发申请则自动成为好友。

`CLOUD.enabled = false`（默认）时不初始化云开发、不发任何网络请求，
好友页显示上面的开通引导，其余功能完全不受影响，可直接照常运行。

### 如果改用自建后端

需要准备：云服务器 + MySQL/PostgreSQL（对应 3 张表）+ 已备案的 HTTPS 域名
+ 小程序后台配置 request 合法域名 + 用 `wx.login` 的 code 调用
`code2session` 换取 openid 自行做登录鉴权。
代码上只需把 `services/friendService.js` 里的 `wx.cloud.callFunction`
换成 `services/request.js` 的 `get/post`，页面代码无需改动；
`cloudfunction/friend/index.js` 的业务逻辑可直接搬到 Node 服务里复用。

### 安全约定

- 用户身份只从云函数上下文取，绝不信任前端传入的 openid
- 对外只暴露邀请码与昵称等公开字段，不返回他人 openid
- 好友关系用排序后的 openid 对作唯一键，避免重复建立双向关系
- 头像只同步 http(s) 地址；`chooseAvatar` 的本地临时路径不可跨设备访问，
  此时前端用昵称首字圆形头像兜底
