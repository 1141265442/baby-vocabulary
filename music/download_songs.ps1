# 儿歌音频下载脚本 (PowerShell)
# 使用免费的公共领域音频资源

$ErrorActionPreference = "Continue"

# 创建音频保存目录
$audioDir = Join-Path $PSScriptRoot "audio"
if (-not (Test-Path $audioDir)) {
    New-Item -ItemType Directory -Path $audioDir | Out-Null
}

Write-Host "=" * 50
Write-Host "儿歌音频下载器"
Write-Host "=" * 50
Write-Host "音频保存目录: $audioDir"
Write-Host ""

# 使用 Internet Archive 的免费公共领域音频
$songs = @(
    @{Name="Twinkle_Twinkle_Little_Star"; Url="https://archive.org/download/TwinkleTwinkleLittleStar_819/twinkle_twinkle.mp3"},
    @{Name="ABC_Song"; Url="https://archive.org/download/ABCsSong_202311/ABCsSong.mp3"},
    @{Name="Row_Row_Row_Your_Boat"; Url="https://archive.org/download/RowRowRowYourBoat_202401/RowRow.mp3"},
    @{Name="Mary_Had_a_Little_Lamb"; Url="https://archive.org/download/MaryHadALittleLamb_202401/MaryLamb.mp3"},
    @{Name="London_Bridge"; Url="https://archive.org/download/LondonBridge_202401/LondonBridge.mp3"},
    @{Name="Old_MacDonald"; Url="https://archive.org/download/OldMacDonald_202401/OldMacDonald.mp3"},
    @{Name="The_Wheels_on_the_Bus"; Url="https://archive.org/download/WheelsOnTheBus_202401/WheelsBus.mp3"},
    @{Name="Head_Shoulders"; Url="https://archive.org/download/HeadShoulders_202401/HeadShoulders.mp3"},
    @{Name="Baa_Baa_Black_Sheep"; Url="https://archive.org/download/BaaBaaBlackSheep_202401/BaaBaa.mp3"},
    @{Name="Happy_Birthday"; Url="https://archive.org/download/HappyBirthdayToYou_202402/HappyBirthday.mp3"}
)

$success = 0
$failed = 0

foreach ($song in $songs) {
    $filename = "$($song.Name).mp3"
    $filepath = Join-Path $audioDir $filename

    Write-Host "[$($songs.IndexOf($song) + 1)/$($songs.Count)] $($song.Name)"

    if (Test-Path $filepath) {
        Write-Host "  已存在，跳过" -ForegroundColor Yellow
        $success++
        continue
    }

    try {
        Write-Host "  正在下载..." -NoNewline
        Invoke-WebRequest -Uri $song.Url -OutFile $filepath -TimeoutSec 60
        Write-Host " 完成" -ForegroundColor Green
        $success++
    }
    catch {
        Write-Host " 失败: $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }

    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "=" * 50
Write-Host "下载完成: 成功 $success，失败 $failed"
Write-Host "音频保存在: $audioDir"
Write-Host "=" * 50

# 创建音频文件列表
$audioFiles = Get-ChildItem -Path $audioDir -Filter "*.mp3"
$listFile = Join-Path $audioDir "audio_list.txt"
$audioFiles | ForEach-Object { $_.Name } | Out-File -FilePath $listFile -Encoding UTF8

Write-Host ""
Write-Host "音频列表已保存到: $listFile"
Write-Host "请运行 update_html.ps1 更新 HTML 文件使用本地音频"
