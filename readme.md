## 环境变量说明

| 变量名   | 是否必须 | 说明                                      |
| -------- | -------- | ----------------------------------------- |
| PORT     | 否       | 开发服务器监听端口，默认`9001`            |
| API_BACK | 否       | 接口请求 host，如`http://10.10.10.1:3000` |

## 安装依赖

`npm i`

## 启动本地开发环境

`npm run start:dev`

## 打包生产环境静态资源

`npm run build`

## 清理缓存 & 依赖 & 构建产物

`npm run clean`

## TypeScript 语法检查

`npm run tsc`

## 代码格式化

`npm run lint & npm run fix`

为了方便起见，日常开发时应开启保存时触发自动格式化的能力。
`pycharm`用户请下载`prettier`插件，并勾选相应选项。
`vscode`用户参见[《eslint + prettier + vscode 配置实现保存自动格式化》](https://juejin.cn/post/6844904194336358407) 。
