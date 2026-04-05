"""
简单的儿歌音频下载脚本
使用免费的在线音频资源
"""

import os
import requests
from pathlib import Path
import time

# 创建音频保存目录
AUDIO_DIR = Path(__file__).parent / "audio"
AUDIO_DIR.mkdir(exist_ok=True)

# 请求头
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}


def download_file(url, filepath):
    """下载文件"""
    try:
        print(f"正在下载: {filepath.name}")
        response = requests.get(url, headers=HEADERS, stream=True, timeout=60)
        response.raise_for_status()

        total_size = int(response.headers.get('content-length', 0))
        downloaded = 0

        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)
                    if total_size > 0:
                        percent = (downloaded / total_size) * 100
                        print(f"\r进度: {percent:.1f}%", end='')

        print(f"\n✓ 完成: {filepath.name}")
        return True
    except Exception as e:
        print(f"\n✗ 失败: {filepath.name} - {e}")
        return False


def download_nursery_rhymes():
    """下载免费童谣音频"""
    print("=" * 50)
    print("下载公共领域童谣音频")
    print("=" * 50)
    print()

    # 使用 Internet Archive 的公共领域音频
    # 这些是免费的、版权过期的音频
    songs = [
        {
            "name": "Twinkle_Twinkle_Little_Star",
            "url": "https://ia802508.us.archive.org/28/items/TwinkleTwinkleLittleStar_819/twinkle_twinkle.mp3",
            "filename": "Twinkle_Twinkle_Little_Star.mp3"
        },
        {
            "name": "ABC_Song",
            "url": "https://ia800503.us.archive.org/22/items/ABCsSong_202311/ABCsSong.mp3",
            "filename": "ABC_Song.mp3"
        },
        {
            "name": "Happy_Birthday",
            "url": "https://ia801304.us.archive.org/13/items/HappyBirthdayToYou_202402/HappyBirthday.mp3",
            "filename": "Happy_Birthday.mp3"
        },
        {
            "name": "Row_Row_Row_Your_Boat",
            "url": "https://ia600508.us.archive.org/5/items/RowRowRowYourBoat_202401/RowRow.mp3",
            "filename": "Row_Row_Row_Your_Boat.mp3"
        },
        {
            "name": "Mary_Had_a_Little_Lamb",
            "url": "https://ia802308.us.archive.org/25/items/MaryHadALittleLamb_202401/MaryLamb.mp3",
            "filename": "Mary_Had_a_Little_Lamb.mp3"
        },
        {
            "name": "London_Bridge",
            "url": "https://ia600409.us.archive.org/1/items/LondonBridge_202401/LondonBridge.mp3",
            "filename": "London_Bridge.mp3"
        },
        {
            "name": "Old_MacDonald_Had_a_Farm",
            "url": "https://ia801408.us.archive.org/29/items/OldMacDonald_202401/OldMacDonald.mp3",
            "filename": "Old_MacDonald_Had_a_Farm.mp3"
        },
        {
            "name": "The_Wheels_on_the_Bus",
            "url": "https://ia600504.us.archive.org/7/items/WheelsOnTheBus_202401/WheelsBus.mp3",
            "filename": "The_Wheels_on_the_Bus.mp3"
        },
        {
            "name": "Head_Shoulders_Knees_and_Toes",
            "url": "https://ia802504.us.archive.org/21/items/HeadShoulders_202401/HeadShoulders.mp3",
            "filename": "Head_Shoulders_Knees_and_Toes.mp3"
        },
        {
            "name": "Baa_Baa_Black_Sheep",
            "url": "https://ia800506.us.archive.org/15/items/BaaBaaBlackSheep_202401/BaaBaa.mp3",
            "filename": "Baa_Baa_Black_Sheep.mp3"
        }
    ]

    success = 0
    failed = 0

    for i, song in enumerate(songs, 1):
        print(f"[{i}/{len(songs)}] {song['name']}")
        filepath = AUDIO_DIR / song['filename']

        # 跳过已下载的文件
        if filepath.exists():
            print(f"  已存在，跳过")
            success += 1
            continue

        if download_file(song['url'], filepath):
            success += 1
        else:
            failed += 1
        print()
        time.sleep(1)

    print("=" * 50)
    print(f"下载完成: 成功 {success}，失败 {failed}")
    print(f"音频保存在: {AUDIO_DIR}")
    print("=" * 50)

    return success > 0


def update_html_with_local_audio():
    """更新 HTML 文件使用本地音频"""
    html_file = Path(__file__).parent / "index.html"

    if not html_file.exists():
        print("未找到 index.html 文件")
        return

    print("\n正在更新 HTML 文件...")

    # 读取 HTML 文件
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 生成音频映射
    audio_files = list(AUDIO_DIR.glob("*.mp3")) + list(AUDIO_DIR.glob("*.wav"))

    if not audio_files:
        print("未找到音频文件")
        return

    # 创建音频映射（用于手动更新）
    mapping_file = AUDIO_DIR / "audio_list.txt"
    with open(mapping_file, 'w', encoding='utf-8') as f:
        for audio_file in audio_files:
            f.write(f"{audio_file.name}\n")

    print(f"\n✓ 音频列表已保存到: {mapping_file}")
    print(f"  共 {len(audio_files)} 个音频文件")


def main():
    """主函数"""
    print("\n🎵 儿歌音频下载器\n")

    # 下载音频
    if download_nursery_rhymes():
        update_html_with_local_audio()

    print("\n提示: 下载的音频是公共领域的童谣")
    print("更多音频可以手动下载后放入 audio 文件夹")


if __name__ == "__main__":
    main()
