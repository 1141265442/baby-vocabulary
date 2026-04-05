# 拼音启蒙 - Pinyin

## 模块概述

学习汉语拼音，包括声母、韵母、整体认读音节，为中文阅读打下基础。

## 功能列表

### 声母（23个）

b p m f | d t n l | g k h | j q x | zh ch sh r | z c s | y w

### 韵母（24个）

**单韵母（6个）**: a o e i u ü

**复韵母（9个）**: ai ei ui ao ou iu ie ue er

**鼻韵母（9个）**: an en in un ün ang eng ing ong

### 整体认读音节（16个）

zhi chi shi ri zi ci si | yi wu yu | ye yue yuan | yin yun ying

## 功能设计

### 学习模式
1. **卡片模式**：单独展示每个拼音，带有发音示范
2. **列表模式**：按类别展示所有拼音
3. **测试模式**：随机显示拼音，让用户选择正确读音

### 互动功能
- 🔊 点击发音（使用 Web Speech API 或预录音频）
- 📝 显示例字（如：b-波）
- 🎨 配图辅助记忆
- 🔄 随机/顺序切换

## 页面结构

```
pinyin/
├── index.html        # 主页面
├── shengmu.html      # 声母学习
├── yunmu.html        # 韵母学习
└── zhengti.html      # 整体认读音节
```

## 开发状态

- [ ] 页面框架
- [ ] 声母卡片（23个）
- [ ] 韵母卡片（24个）
- [ ] 整体认读音节（16个）
- [ ] 发音功能
- [ ] 例字展示
