# 歌曲数据更新脚本

## 功能说明

该脚本系统用于自动管理 `music/` 文件夹中的歌曲数据：

1. **扫描音频文件** - 自动检测 `chinese/` 和 `english/` 文件夹中的音频文件
2. **匹配映射关系** - 根据脚本内定义的映射关系，匹配实际文件
3. **生成数据** - 生成可用于 `index.html` 的 JavaScript 数据
4. **自动更新** - 可选地直接更新 `index.html` 中的歌曲数据

## 文件结构

```
baby/
├── music/
│   ├── index.html          # 音乐播放器页面
│   ├── chinese/            # 中文儿歌音频文件
│   └── english/            # 英文儿歌音频文件
└── scripts/
    └── update_songs.js     # Node.js 更新脚本（推荐）
```

## 歌曲映射

歌曲的元数据（名称、歌词、分类等）在 `scripts/update_songs.js` 中的 `songDatabase` 对象中定义：

```javascript
const songDatabase = {
  '两只老虎.mp3': {
    name: '两只老虎',
    emoji: '🐯',
    desc: '动物认知',
    lyrics: '两只老虎，两只老虎\n跑得快，跑得快...'
  },
  // 更多歌曲...
};
```

### 添加新歌曲

1. 将音频文件放入 `chinese/` 或 `english/` 文件夹
2. 在 `update_songs.js` 的 `songDatabase` 中添加对应的元数据
3. 运行更新脚本

```javascript
// 在 update_songs.js 中添加
const songDatabase = {
  // ... 现有歌曲 ...
  '新歌.mp3': {
    name: '新歌',
    emoji: '🎵',
    desc: '分类',
    lyrics: '歌曲的歌词内容\n第二行...'
  }
};
```

## 使用方法

### Node.js 版本（推荐）

需要安装 Node.js。检查是否已安装：
```bash
node --version
```

**命令**：

```bash
# 查看歌曲状态
node scripts/update_songs.js

# 生成 JavaScript 数据
node scripts/update_songs.js --generate

# 直接更新 index.html
node scripts/update_songs.js --update

# 列出所有歌曲及状态
node scripts/update_songs.js --list
```

**命令选项**：

| 选项 | 说明 |
|------|------|
| (默认) | 显示所有歌曲的可用状态 |
| `--generate` / `-g` | 生成 JavaScript 数据并输出 |
| `--update` / `-u` | 直接更新 index.html |
| `--list` / `-l` | 详细列出所有歌曲及状态 |
| `--quiet` / `-q` | 只输出必要信息 |

## 工作流程

### 1. 添加新歌曲

```bash
# 1. 将 "新歌.mp3" 复制到 music/chinese/
# 2. 在 scripts/update_songs.js 中添加映射
# 3. 运行更新
node scripts/update_songs.js --update
```

### 2. 删除歌曲

```bash
# 1. 从 music/chinese/ 删除音频文件
# 2. (可选) 从 update_songs.js 移除映射条目
# 3. 运行更新
node scripts/update_songs.js --update
```

### 3. 批量管理

```bash
# 先检查状态
node scripts/update_songs.js --list

# 确认无误后更新
node scripts/update_songs.js --update
```

## 输出示例

```
==================================================
Song Status Report
==================================================

[Chinese Songs]
   Total: 1

   [OK] 两只老虎 (两只老虎.mp3)

[English Songs]
   Total: 9

   [OK] ABC Song (abcsongs.mp3)
   [OK] Twinkle Twinkle Little Star (Twinkle Twinkle Little Star.mp3)
   ...

==================================================
```

## 支持的音频格式

- `.mp3` (推荐)
- `.wav`
- `.ogg`
- `.m4a`
- `.aac`

## 注意事项

1. **文件名匹配** - 音频文件名必须与 `songDatabase` 中的键完全匹配
2. **编码格式** - 脚本文件使用 UTF-8 编码，确保正确保存
3. **备份** - 更新 `index.html` 前会自动创建 `.bak` 备份文件
4. **未知文件** - 如果扫描到未在映射中定义的文件，会标记为 `[?]` 并使用默认元数据

## 故障排除

### Node.js 未安装

从 [nodejs.org](https://nodejs.org/) 下载并安装 Node.js。

### 文件编码问题

确保 `update_songs.js` 使用 UTF-8 编码保存：

```bash
# 检查文件编码（Linux/Mac）
file scripts/update_songs.js

# 如果需要，转换编码
iconv -f ISO-8859-1 -t UTF-8 scripts/update_songs.js > scripts/update_songs_utf8.js
```

### 更新失败

如果更新失败，检查：
1. `index.html` 是否存在
2. 文件是否有写入权限
3. 检查备份文件 `index.html.bak` 是否可以恢复

```bash
# 恢复备份
cp music/index.html.bak music/index.html
```

## 扩展开发

### 修改歌曲元数据格式

如果需要添加新的元数据字段，修改 `songDatabase` 结构和 `buildJSArray` 函数：

```javascript
// 添加新字段
'歌曲.mp3': {
  name: '歌曲',
  emoji: '🎵',
  desc: '分类',
  lyrics: '歌词...',
  duration: '2:30',  // 新字段
  bpm: 120           // 新字段
}
```

然后在 `buildJSArray` 函数中添加对应字段的处理。