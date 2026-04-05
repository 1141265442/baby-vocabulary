# 音乐启蒙 - Music

## 模块概述

中英文经典儿歌欣赏，培养儿童音乐兴趣和语言能力。

## 功能列表

### 中文儿歌（20首）

1. 两只老虎 - 动物认知
2. 小星星 - 睡前安抚
3. 一分钱 - 品德教育
4. 小燕子 - 动物认知
5. 拔萝卜 - 团队合作
6. 找朋友 - 社交能力
7. 丢手绢 - 游戏互动
8. 小兔子乖乖 - 安全意识
9. 世上只有妈妈好 - 亲情教育
10. 小毛驴 - 动物认知
11. 数鸭子 - 数学启蒙
12. 采蘑菇的小姑娘 - 劳动教育
13. 让我们荡起双桨 - 童年快乐
14. 卖报歌 - 历史教育
15. 娃哈哈 - 快乐童年
16. 种太阳 - 想象力培养
17. 读书郎 - 学习意识
18. 蜗牛与黄鹂鸟 - 坚持精神
19. 小螺号 - 海洋认知
20. 春天在哪里 - 季节认知

### 英文儿歌（20首）

1. Twinkle Twinkle Little Star - 睡前安抚
2. ABC Song - 字母学习
3. Happy Birthday - 节日祝福
4. Row Row Row Your Boat - 动作协调
5. Mary Had a Little Lamb - 动物认知
6. London Bridge - 文化认知
7. Old MacDonald Had a Farm - 动物叫声
8. The Wheels on the Bus - 交通工具
9. Head Shoulders Knees and Toes - 身体部位
10. If You're Happy and You Know It - 情绪表达
11. Baa Baa Black Sheep - 动物认知
12. Hickory Dickory Dock - 数字认知
13. Five Little Monkeys - 倒数练习
14. Rain Rain Go Away - 自然现象
15. Itsy Bitsy Spider - 动物认知
16. Do-Re-Mi - 音乐启蒙
17. You Are My Sunshine - 亲情表达
18. Ring Around the Rosie - 游戏互动
19. This Old Man - 数字认知
20. London Bridge is Falling Down - 文化认知
21. 3S儿歌

## 功能设计

### 页面元素
- 🎵 音频播放器（播放/暂停/进度）
- 📝 歌词显示（滚动高亮）
- 🎨 配图/动画背景
- 🔁 循环播放开关
- ⏮️⏭️ 上一首/下一首
- 📋 歌曲列表（点击切换）

### 技术要点
- 使用 HTML5 Audio API
- 移动端音频自动播放限制处理
- 歌词同步高亮
- 本地音频或在线音频源

## 开发状态

- [x] 页面框架
- [x] 中文儿歌列表
- [x] 英文儿歌列表
- [x] 音频播放器
- [x] 歌词显示
- [x] 样式美化

## 歌曲数据管理

### 文件结构

```
music/
├── index.html          # 音乐播放器页面
├── chinese/            # 中文儿歌音频文件夹
│   └── 两只老虎.mp3    # 音频文件
└── english/            # 英文儿歌音频文件夹
    ├── Twinkle Twinkle Little Star.mp3
    ├── abcsongs.mp3
    └── ...
```

### 歌曲数据更新脚本

项目使用 `scripts/update_songs.js` 脚本自动管理歌曲数据：

```bash
# 查看歌曲状态
node scripts/update_songs.js

# 更新 index.html 中的歌曲数据
node scripts/update_songs.js --update

# 列出所有歌曲
node scripts/update_songs.js --list

# 生成 JavaScript 数据
node scripts/update_songs.js --generate
```

### 添加新歌曲

1. **放置音频文件**：将 `.mp3` 文件放入 `chinese/` 或 `english/` 文件夹

2. **添加歌曲元数据**：在 `scripts/update_songs.js` 的 `songDatabase` 中添加歌曲信息：

   ```javascript
   const songDatabase = {
     '歌曲名称.mp3': {
       name: '歌曲名称',
       emoji: '🎵',
       desc: '分类描述',
       lyrics: '歌曲的歌词内容\n第二行...'
     },
     // ... 更多歌曲
   };
   ```

3. **更新页面**：运行更新脚本

   ```bash
   node scripts/update_songs.js --update
   ```

### 歌曲元数据字段

| 字段 | 说明 | 示例 |
|------|------|------|
| `name` | 歌曲名称 | `"两只老虎"` |
| `emoji` | 歌曲图标/表情 | `"🐯"` |
| `desc` | 分类描述 | `"动物认知"` |
| `lyrics` | 歌词内容（支持 `\n` 换行） | `"两只老虎，两只老虎\n..."` |

### 支持的音频格式

- `.mp3`（推荐）
- `.wav`
- `.ogg`
- `.m4a`
- `.aac`

### 注意事项

- 音频文件名必须与 `songDatabase` 中的键完全匹配
- 更新会自动创建 `.bak` 备份文件
- 如果扫描到未映射的文件，会使用默认元数据（标记为 `[?]`）
