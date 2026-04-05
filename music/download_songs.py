"""
儿歌音频下载爬虫
从免费音频资源网站下载儿歌
"""

import os
import requests
from pathlib import Path
import time
import json

# 创建音频保存目录
AUDIO_DIR = Path(__file__).parent / "audio"
AUDIO_DIR.mkdir(exist_ok=True)

# 请求头，模拟浏览器访问
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

# 中文儿歌列表
CHINESE_SONGS = [
    "两只老虎", "小星星", "一分钱", "小燕子", "拔萝卜",
    "找朋友", "丢手绢", "小兔子乖乖", "世上只有妈妈好", "小毛驴",
    "数鸭子", "采蘑菇的小姑娘", "让我们荡起双桨", "卖报歌", "娃哈哈",
    "种太阳", "读书郎", "蜗牛与黄鹂鸟", "小螺号", "春天在哪里"
]

# 英文儿歌列表
ENGLISH_SONGS = [
    "Twinkle Twinkle Little Star", "ABC Song", "Happy Birthday",
    "Row Row Row Your Boat", "Mary Had a Little Lamb", "London Bridge",
    "Old MacDonald Had a Farm", "The Wheels on the Bus",
    "Head Shoulders Knees and Toes", "If You're Happy and You Know It",
    "Baa Baa Black Sheep", "Hickory Dickory Dock", "Five Little Monkeys",
    "Rain Rain Go Away", "Itsy Bitsy Spider", "Do-Re-Mi",
    "You Are My Sunshine", "Ring Around the Rosie", "This Old Man",
    "London Bridge is Falling Down"
]


def download_from_freemusicarchive(search_term, filename):
    """
    从 Free Music Archive 下载音频
    注意：需要手动搜索和下载，这里只是示例
    """
    print(f"请手动下载: {search_term}")
    print(f"访问: https://freemusicarchive.org/search?q={search_term}")
    return False


def download_from_youtube(song_name, lang='zh'):
    """
    使用 yt-dlp 下载 YouTube 儿歌（需要安装 yt-dlp）
    安装: pip install yt-dlp
    """
    try:
        import yt_dlp

        # 搜索关键词
        if lang == 'zh':
            search_query = f"{song_name} 儿歌"
        else:
            search_query = f"{song_name} nursery rhyme song for kids"

        print(f"正在搜索: {search_query}")

        # yt-dlp 配置
        ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'outtmpl': str(AUDIO_DIR / f'%(title)s.%(ext)s'),
            'quiet': False,
            'no_warnings': False,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([f"ytsearch:{search_query}"])

        return True
    except ImportError:
        print("错误: 需要安装 yt-dlp")
        print("请运行: pip install yt-dlp")
        return False
    except Exception as e:
        print(f"下载失败: {e}")
        return False


def download_from_direct_url(url, filename):
    """
    从直接 URL 下载音频文件
    """
    try:
        response = requests.get(url, headers=HEADERS, stream=True, timeout=30)
        response.raise_for_status()

        filepath = AUDIO_DIR / filename
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        print(f"✓ 下载成功: {filename}")
        return True
    except Exception as e:
        print(f"✗ 下载失败: {filename} - {e}")
        return False


def create_audio_mapping():
    """
    创建音频文件映射 JSON
    """
    mapping = {}

    # 扫描已下载的音频文件
    audio_files = list(AUDIO_DIR.glob("*.mp3")) + list(AUDIO_DIR.glob("*.wav"))

    for audio_file in audio_files:
        # 根据文件名匹配歌曲
        filename = audio_file.stem.lower()

        # 简单匹配逻辑
        for song in CHINESE_SONGS:
            if song in filename:
                mapping[f"zh-{song}"] = str(audio_file)
                break

        for song in ENGLISH_SONGS:
            if song.lower() in filename:
                mapping[f"en-{song}"] = str(audio_file)
                break

    # 保存映射文件
    mapping_file = AUDIO_DIR / "mapping.json"
    with open(mapping_file, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)

    print(f"\n已创建音频映射文件: {mapping_file}")
    return mapping


def download_sample_audios():
    """
    下载示例音频（用于测试）
    使用免费的公共音频资源
    """
    print("=" * 50)
    print("开始下载示例音频...")
    print("=" * 50)

    # 免费示例音频 URL（来自 Internet Archive 的公共领域音频）
    sample_urls = {
        "小星星": "https://archive.org/download/TwinkleTwinkleLittleStar/twinkle_twinkle.mp3",
        "两只老虎": "https://archive.org/download/ChildrensFavorities/TwoTigers.mp3",
        "Twinkle Twinkle Little Star": "https://archive.org/download/TwinkleTwinkleLittleStar/twinkle_twinkle.mp3",
        "ABC Song": "https://archive.org/download/ABCs/ABCs.mp3",
        "Happy Birthday": "https://archive.org/download/HappyBirthdayToYou/HappyBirthday.mp3",
    }

    success_count = 0
    for song_name, url in sample_urls.items():
        filename = f"{song_name}.mp3"
        print(f"\n正在下载: {song_name}")

        if download_from_direct_url(url, filename):
            success_count += 1
        time.sleep(1)  # 避免请求过快

    print(f"\n下载完成: {success_count}/{len(sample_urls)}")
    return success_count > 0


def download_from_archive_digital_library():
    """
    从 Internet Archive 下载公共领域的儿歌
    """
    print("\n" + "=" * 50)
    print("从 Internet Archive 下载公共领域儿歌...")
    print("=" * 50)

    # Internet Archive 的儿歌合集 ID
    collections = [
        "ChildrensMusic",  # 儿童音乐
        "NurseryRhymes",    # 童谣
        "kidsmusic",        # 儿童音乐
    ]

    print("\n提示: 请访问以下链接手动下载公共领域的儿歌：")
    print("https://archive.org/details/ChildrensMusic")
    print("https://archive.org/search.php?query=%E5%84%BF%E6%AD%8C")

    return False


def main():
    """
    主函数
    """
    print("=" * 50)
    print("儿歌音频下载器")
    print("=" * 50)
    print(f"音频保存目录: {AUDIO_DIR}")
    print()

    # 检查是否已安装 yt-dlp
    try:
        import yt_dlp
        print("✓ 检测到 yt-dlp，可以从 YouTube 下载")
    except ImportError:
        print("✗ 未安装 yt-dlp")
        print("  如需从 YouTube 下载，请运行: pip install yt-dlp")

    print()
    print("请选择下载方式:")
    print("1. 下载示例音频（测试用）")
    print("2. 从 YouTube 下载（需要 yt-dlp）")
    print("3. 仅创建音频映射")
    print("4. 显示手动下载指南")
    print()

    choice = input("请输入选择 (1-4): ").strip()

    if choice == "1":
        download_sample_audios()
        create_audio_mapping()
    elif choice == "2":
        print("\n选择语言:")
        print("1. 中文儿歌")
        print("2. 英文儿歌")
        lang_choice = input("请选择 (1-2): ").strip()

        songs = CHINESE_SONGS if lang_choice == "1" else ENGLISH_SONGS
        lang = 'zh' if lang_choice == "1" else 'en'

        print(f"\n将下载 {len(songs)} 首歌曲...")
        for i, song in enumerate(songs, 1):
            print(f"\n[{i}/{len(songs)}] {song}")
            download_from_youtube(song, lang)
            time.sleep(2)  # 避免请求过快

        create_audio_mapping()
    elif choice == "3":
        create_audio_mapping()
    elif choice == "4":
        print_manual_guide()
    else:
        print("无效的选择")


def print_manual_guide():
    """
    打印手动下载指南
    """
    print("\n" + "=" * 50)
    print("手动下载指南")
    print("=" * 50)

    print("\n方法一: 从免费音乐网站下载")
    print("-" * 30)
    print("1. Free Music Archive: https://freemusicarchive.org")
    print("2. Internet Archive: https://archive.org/details/ChildrensMusic")
    print("3. Jamendo Music: https://www.jamendo.com")

    print("\n方法二: 使用手机应用下载")
    print("-" * 30)
    print("1. 喜马拉雅（有很多免费儿歌）")
    print("2. 腾讯视频（可下载音频）")
    print("3. 抖音/快手（收藏后提取）")

    print("\n方法三: YouTube 下载")
    print("-" * 30)
    print("1. 安装 yt-dlp: pip install yt-dlp")
    print("2. 运行: yt-dlp 'https://youtube.com/watch?v=视频ID'")

    print("\n下载后，请将 MP3 文件放入以下目录:")
    print(f"  {AUDIO_DIR}")

    print("\n文件命名建议:")
    print("  中文: 两只老虎.mp3")
    print("  英文: Twinkle_Twinkle_Little_Star.mp3")


if __name__ == "__main__":
    main()
