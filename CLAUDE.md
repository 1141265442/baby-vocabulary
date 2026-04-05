# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个**婴幼儿启蒙学习综合平台**，包含多种启蒙学习模块，旨在为0-6岁儿童提供有趣、互动的学习体验。所有内容采用网页形式，支持移动端访问，无需安装任何应用。

**设计理念**：
- 简单直观，适合幼儿操作
- 色彩鲜艳，吸引注意力
- 语音互动，增强学习效果
- 单文件架构，易于维护和部署

## 项目结构

```
baby/
├── index.html                  # 主入口（学习模块导航页）
├── english/                    # ✅ 英语词汇启蒙
│   ├── vocabulary.html         # 词汇卡片学习
│   ├── 词汇学习表.md
│   └── 词汇翻译.md
├── music/                      # 音乐启蒙（中英文儿歌各20首）
│   ├── index.html              # 音乐播放器页面
│   ├── chinese/                # 中文儿歌音频文件夹
│   ├── english/                # 英文儿歌音频文件夹
│   └── README.md               # 功能规划文档
├── scripts/                    # 工具脚本
│   ├── update_songs.js         # 歌曲数据更新脚本（Node.js）
│   └── README.md               # 脚本使用说明
├── pinyin/                     # 拼音启蒙（声母/韵母/整体认读）
│   └── README.md               # 功能规划文档
├── chinese/                    # 汉字启蒙（笔画/简单汉字）
│   └── README.md               # 功能规划文档
├── alphabet/                   # 字母启蒙（6种游戏模式）
│   └── README.md               # 功能规划文档
├── math/                       # 数学启蒙（数字/运算/形状）
│   └── README.md               # 功能规划文档
├── cognitive/                  # 认知启蒙（颜色/动物/水果/交通工具）
│   └── README.md               # 功能规划文档
├── life/                       # 生活启蒙（家庭/身体/日常用品）
│   └── README.md               # 功能规划文档
├── art/                        # 艺术启蒙（涂色/简笔画）
│   └── README.md               # 功能规划文档
├── story/                      # 故事启蒙（睡前故事/寓言）
│   └── README.md               # 功能规划文档
└── .claude/
    └── commands/               # 自定义命令
        ├── trans.md            # 翻译命令
        ├── gen-web.md          # 生成网页命令
        └── publish.md          # 发布指南
```

## 模块映射关系

| 文件夹 | 模块名 | 状态 | 内容数量 |
|--------|--------|------|----------|
| english | 英语词汇 | ✅ 完成 | 40个单词 |
| music | 音乐启蒙 | 🚧 规划 | 中英文儿歌各20首 |
| pinyin | 拼音启蒙 | 🚧 规划 | 23声母+24韵母+16整体认读 |
| chinese | 汉字启蒙 | 🚧 规划 | 8笔画+50汉字 |
| alphabet | 字母启蒙 | 🚧 规划 | 6种游戏模式学习26字母 |
| math | 数学启蒙 | 🚧 规划 | 数字1-100+运算+形状 |
| cognitive | 认知启蒙 | 🚧 规划 | 10颜色+30动物+35食物+15交通 |
| life | 生活启蒙 | 🚧 规划 | 10家庭+15身体+25用品 |
| art | 艺术启蒙 | 🚧 规划 | 30涂色+20简笔画 |
| story | 故事启蒙 | 🚧 规划 | 10睡前故事+10寓言 |

**注**: 每个模块的详细规划请查看对应文件夹中的 `README.md`

## 启蒙模块规划

### ✅ 已完成
- **english/英语词汇**：40个基础词汇卡片，支持语音朗读、顺序/乱序切换

### 🚧 规划中（按优先级排序）

#### 阶段一：语言启蒙
1. **pinyin/中文拼音**
   - 23个声母卡片
   - 24个韵母卡片
   - 16个整体认读音节
   - 拼音游戏

2. **alphabet/英语字母**
   - 6种游戏模式：卡片、配对、气球、拼写、连线、歌曲
   - 26个字母大小写+发音
   - 每个字母3个配图单词

3. **chinese/汉字笔画**
   - 基本笔画（横竖撇捺点）
   - 简单汉字（一二三人大天等）
   - 笔顺动画演示

#### 阶段二：认知启蒙
4. **cognitive/颜色认知**
   - 基础颜色（红黄蓝绿等）
   - 颜色配对游戏
   - 找颜色

5. **cognitive/形状认知**
   - 基本形状（圆形方形三角形等）
   - 生活中的形状
   - 形状拼图

6. **math/数字认知**
   - 1-10数字认识
   - 1-100数字
   - 数数游戏
   - 简单加减法

7. **cognitive/动物世界**
   - 常见动物（农场动物、森林动物等）
   - 动物叫声
   - 动物家园

8. **cognitive/水果蔬菜**
   - 常见水果
   - 常见蔬菜
   - 营养知识

#### 阶段三：生活启蒙
9. **life/家庭成员**
   - 爸爸妈妈
   - 爷爷奶奶
   - 兄弟姐妹

10. **life/身体部位**
    - 五官认知
    - 四肢认知
    - 身体游戏

11. **cognitive/交通工具**
    - 汽车、飞机、轮船
    - 交通规则
    - 声音认知

12. **life/日常用品**
    - 衣服鞋帽
    - 餐具厨具
    - 学习用品

#### 阶段四：艺术与音乐
13. **art/在线涂色**
    - 线稿选择
    - 颜色填充
    - 保存作品

14. **art/简笔画教学**
    - 分步教学
    - 跟着画
    - 自由创作

15. **music/儿歌欣赏**
    - 经典中文儿歌（20首）
    - 英文儿歌（20首）
    - 歌词显示

#### 阶段五：故事阅读
16. **story/睡前故事**
    - 温馨短故事（10个）
    - 语音朗读
    - 配图动画

17. **story/寓言故事**
    - 经典寓言（10个）
    - 教育意义
    - 互动问答

## 核心架构设计原则

### 单文件模块
每个学习模块是一个独立的 HTML 文件，包含：
- 嵌入式 CSS（卡片样式、动画效果）
- 嵌入式 JavaScript（数据、逻辑、交互）
- 自包含，无外部依赖

### 统一组件模式
```javascript
// 通用数据结构
const items = [
    { emoji: "🍎", name: "名称", pinyin: "发音/读音", ... }
];

// 通用状态
let currentIndex = 0;
let isShuffle = false;

// 通用函数
function updateCard() { }
function nextItem() { }
function prevItem() { }
function speak() { }
function toggleMode() { }
```

### 语音合成模式
学习模块使用 Web Speech API 实现朗读功能：

```javascript
// 鸿蒙/国产浏览器兼容：使用最简单的配置
const utterance = new SpeechSynthesisUtterance(text);
utterance.lang = 'en';  // 避免使用 'en-US'，鸿蒙不支持
utterance.rate = 1.0;
utterance.pitch = 1.0;
speechSynthesis.speak(utterance);
```

**重要兼容性说明**：
- iOS Safari 需要用户交互触发语音预加载
- 鸿蒙浏览器使用 `lang='en'` 而非 `lang='en-US'`
- 移动端使用 `touchend` 事件增强响应
- 在页面加载时调用 `speechSynthesis.getVoices()` 预加载语音列表

### 统一UI风格
所有模块应遵循与主页 `index.html` 一致的设计风格：

**色彩系统**：
- 使用 CSS 变量定义颜色，便于主题切换
- 马卡龙色系：柔和的粉彩配色
- 温暖模式：橙色、粉色、桃色为主
- 清凉模式：蓝色、薄荷色、紫色为主

**卡片设计**：
- 大圆角：`border-radius: 20-30px`
- 卡片渐变背景：从白色渐变到主题色
- 柔和阴影：`box-shadow: 0 6px 24px rgba(..., 0.12)`
- 白色卡片背景：`background: #FFFFFF`

**交互反馈**：
- 悬停效果：`transform: translateY(-8px)` + 阴影加深
- 点击效果：`transform: scale(0.98)`
- 过渡动画：`transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)`

**字体规范**：
- 系统字体栈：`-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif`
- 标题：24-36px，字重 600
- 正文：14-16px，字重 400
- Emoji 图标：44-54px

**布局规范**：
- 居中对齐，最大宽度 1080px
- 网格布局：`grid-template-columns: repeat(auto-fill, minmax(165px, 1fr))`
- 间距：18-24px
- 内边距：卡片 28-32px，按钮 12-16px

## 代码规范

1. **单文件结构**: 每个模块自包含HTML/CSS/JS
2. **命名约定**:
   - 数据源: `originalItems` / `items`
   - 索引: `currentIndex`
   - 状态: `isShuffle`, `isPlaying`
   - 函数: 驼峰命名
3. **UI语言**: 界面中文，内容按模块需求
4. **无框架依赖**: 纯HTML/CSS/JavaScript
5. **移动优先**: 适配触摸操作，响应式布局

## 主入口 (index.html)

`index.html` 是项目的导航首页，包含：
- 项目介绍
- 模块卡片网格（每个模块一个卡片）
- 已完成/规划中状态标识
- 点击跳转到各模块
- **主题切换功能**：温暖模式（默认，暖色调）/ 清凉模式（冷色调）

### 主题系统实现
主页使用 CSS 自定义属性实现主题切换：
- **温暖模式**（默认）：暖色调（橙色、粉色、桃色），背景 `#FFF8F0`
- **清凉模式**：冷色调（蓝色、薄荷色、紫色），背景 `#E8EDF0`
- 主题通过 `data-theme="cool"` 属性切换
- 使用 `localStorage` 持久化主题偏好
- 键盘快捷键 `T` 切换主题

```css
/* 默认温暖模式 */
:root {
    --bg-primary: #FFF8F0;
    --macaron-blue: #FFB888;
    --macaron-pink: #FF9CAA;
    /* ... */
}

/* 清凉模式 */
[data-theme="cool"] {
    --bg-primary: #E8EDF0;
    --macaron-blue: #9DB8D8;
    --macaron-pink: #B8C8E8;
    /* ... */
}
```

## 数据同步规范

每个模块的数据文件存放在对应文件夹：
- `.html` 文件：嵌入数据
- `.md` 文件：可读格式备份

### 音乐模块数据更新

音乐模块使用 `scripts/update_songs.js` 脚本来管理歌曲数据：

```bash
# 查看歌曲状态
node scripts/update_songs.js

# 更新 index.html 中的歌曲数据
node scripts/update_songs.js --update

# 查看所有歌曲列表
node scripts/update_songs.js --list
```

**添加新歌曲流程**：
1. 将音频文件放入 `music/chinese/` 或 `music/english/`
2. 在 `scripts/update_songs.js` 的 `songDatabase` 中添加歌曲元数据
3. 运行 `node scripts/update_songs.js --update` 更新

详细说明请参考 `scripts/README.md`

## 本地运行

直接在浏览器中打开 `index.html` 即可浏览所有模块。

## 部署

**GitHub Pages** (推荐):
```bash
git add .
git commit -m "更新内容"
git push
```
网站地址: `https://1141265442.github.io/baby-vocabulary/`

**代理设置** (如需要):
```bash
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

## 开发新模块流程

1. 在对应文件夹创建 `.html` 文件
2. 参考现有模块（如 `english/vocabulary.html`）的结构
3. 更新 `index.html` 添加模块入口
4. 本地测试后提交
5. 更新本文档的进度状态

## 移动端注意事项

- iOS Safari 语音预加载
- 按钮尺寸 ≥ 44x44px
- 语音需用户交互触发
- 响应式布局适配不同屏幕
- 鸿蒙浏览器使用简化的语音配置（lang='en' 而非 'en-US'）

## 键盘快捷键

- `T` - 切换主题（温暖模式/清凉模式）
- 学习模块内：
  - `←` / `→` - 上一个/下一个
  - `空格` / `Enter` - 朗读
  - `S` - 切换顺序/乱序模式

## 自定义命令

- `/trans <内容>`: 翻译并输出到对应文件夹
- `/gen-web <内容>`: 生成学习网页
- `/publish`: 显示发布指南
