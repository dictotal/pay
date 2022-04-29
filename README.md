#支付模块2.0
该模块重构之前的内嵌支付页面，使用vue来开发,精简代码不使用vuex、router，可以组件化开发和逻辑复用
# 模板说明 - 需要主动修改打包访问路径，给后端更新资源
- tt3 转账, 其余二维码
- 需要修改vue-config.js具体看后端用的哪个网页
- tt5 - tt7 二维码模板
- tt5 30分钟倒计时
- tt6 10分钟到倒计时
- tt7 online bank

要实现的功能块有
1. 不同的支付交互模块
2. 通过js桥通知pc、wap、app
3. 初始化为JSP，然后通过读取不同的config来渲染不同的组件
4. 需要一个消息提示模块
5. 倒计时模块
6. 金额输入框
7. 文本拷贝模块
8. 国际化差异
9. 模板差异（通过初始化参数）
10. pc和mobile的兼容处理(使用px2rem)
11. 提示中的最大金额限制后端传入
12. 国际化使用注入模式让翻译文件不进行耦合，分别处于不同模快中，方便复用。
13. 需要按需配置不同的参数和引入不同的包来处理逻辑
----------------------------------------------
之前的支付模板支持第直接转账和第三方支持，在init页面它们有差异的处理逻辑。
直接转账在页面中直接submit即可，但是第三方支付需要在新窗口打开后进行submit
由于默认的支付和第三方支付有不同的提示等内容，这里还是在代码层面上进行物理差异处理。
---------------------说明-------------------------
```
├─babel.config.js
├─package.json
├─public
│ ├─index.html
│ └─js
│   ├─jsencrypt.js --------------- // 加密工具
│   └─rsaencrypt.js
├─README.md
├─src
│ ├─App.vue
│ ├─assets
│ │ └─logo.png
│ ├─common
│ │ ├─ajax.js -------------------- // ajax工具
│ │ ├─alert ---------------------- // 提示框组件
│ │ │ ├─alert.vue
│ │ │ ├─index.js
│ │ │ └─language.json
│ │ ├─data-tools.js -------------- // 持久化
│ │ ├─filters.js
│ │ ├─i18n ----------------------- // 国际化工具
│ │ │ ├─index.js
│ │ │ └─language.json
│ │ ├─index.js
│ │ ├─intervalTools.js ----------- // 倒计时工具
│ │ ├─mask ----------------------- // 遮罩层组件
│ │ │ ├─index.js
│ │ │ └─index.vue
│ │ ├─msg ------------------------ // 下沉消息提示
│ │ │ ├─index.js
│ │ │ └─msg.vue
│ │ ├─tools.js
│ │ └─z-index.js ----------------- // 层高工具
│ ├─components
│ │ ├─count-down ----------------- // 倒计时工具（模板有差异）
│ │ │ ├─images
│ │ │ │ └─dot.png
│ │ │ └─index.vue
│ │ └─count-down-default --------- // 倒计时工具
│ │   ├─images
│ │   │ └─dot.png
│ │   └─index.vue
│ ├─config
│ │ └─index.js
│ ├─main.js
│ ├─mixins
│ │ └─index.vue ------------------ // 主入口的模板和公共逻辑
│ ├─platform
│ │ ├─QR ------------------------- // 扫码支付
│ │ │ ├─#data.json
│ │ │ ├─go.json ------------------ // v-go 页面的测试数据
│ │ │ ├─index.vue
│ │ │ ├─init.json ---------------- // v-init页面测试数据
│ │ │ ├─update.md
│ │ │ ├─v-go --------------------- // 提交金额后的第二个页面
│ │ │ │ ├─images
│ │ │ │ │ ├─bank1.png
│ │ │ │ │ ├─bank2.png
│ │ │ │ │ ├─bank3.png
│ │ │ │ │ ├─bank4.png
│ │ │ │ │ ├─copy.png
│ │ │ │ │ ├─failed.png
│ │ │ │ │ ├─qrLogo.png
│ │ │ │ │ └─success.png
│ │ │ │ ├─index.vue
│ │ │ │ └─language.json
│ │ │ └─v-init ------------------- // 支付的第一个页面
│ │ │   ├─images
│ │ │   │ ├─icon-selected.png
│ │ │   │ ├─select.png
│ │ │   │ └─selected2.png
│ │ │   ├─index.vue
│ │ │   └─language.json
│ │ └─TT3.0 ---------------------- // TT支付
│ │   ├─#data.json
│ │   ├─go.json
│ │   ├─index.vue
│ │   ├─init.json
│ │   ├─update.md
│ │   ├─v-go
│ │   │ ├─images
│ │   │ │ ├─icon-tips.png
│ │   │ │ └─icon-tips2.png
│ │   │ ├─index.vue
│ │   │ └─language.json
│ │   └─v-init
│ │     ├─images
│ │     │ ├─icon-selected.png
│ │     │ ├─select.png
│ │     │ └─selected2.png
│ │     ├─index.vue
│ │     └─language.json
│ └─scss ------------------------- // 公共样式
│   ├─base.scss
│   ├─common.scss
│   ├─font
│   │ └─DIN-Bold.otf
│   ├─global.scss
│   └─mobile.scss
└─vue.config.js
 ```
