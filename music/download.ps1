# Nursery Rhyme Downloader
# Download free public domain nursery rhymes from Internet Archive

$ErrorActionPreference = "Continue"

# Create audio directory
$scriptDir = $PSScriptRoot
$audioDir = Join-Path $scriptDir "audio"
if (-not (Test-Path $audioDir)) {
    New-Item -ItemType Directory -Path $audioDir | Out-Null
}

Write-Host "================================"
Write-Host "Nursery Rhyme Audio Downloader"
Write-Host "================================"
Write-Host "Audio will be saved to: $audioDir"
Write-Host ""

# Free nursery rhymes from Internet Archive (Public Domain)
$songs = @(
    @{Name="Twinkle"; Url="https://archive.org/download/TwinkleTwinkleLittleStar_819/twinkle_twinkle.mp3"},
    @{Name="ABC"; Url="https://archive.org/download/ABCsSong_202311/ABCsSong.mp3"},
    @{Name="RowRow"; Url="https://archive.org/download/RowRowRowYourBoat_202401/RowRow.mp3"},
    @{Name="MaryLamb"; Url="https://archive.org/download/MaryHadALittleLamb_202401/MaryLamb.mp3"},
    @{Name="LondonBridge"; Url="https://archive.org/download/LondonBridge_202401/LondonBridge.mp3"},
    @{Name="OldMacDonald"; Url="https://archive.org/download/OldMacDonald_202401/OldMacDonald.mp3"},
    @{Name="WheelsBus"; Url="https://archive.org/download/WheelsOnTheBus_202401/WheelsBus.mp3"},
    @{Name="HeadShoulders"; Url="https://archive.org/download/HeadShoulders_202401/HeadShoulders.mp3"},
    @{Name="BaaBaa"; Url="https://archive.org/download/BaaBaaBlackSheep_202401/BaaBaa.mp3"},
    @{Name="HappyBirthday"; Url="https://archive.org/download/HappyBirthdayToYou_202402/HappyBirthday.mp3"}
)

$success = 0
$failed = 0

foreach ($song in $songs) {
    $filename = "$($song.Name).mp3"
    $filepath = Join-Path $audioDir $filename

    Write-Host "[$($songs.IndexOf($song) + 1)/$($songs.Count)] $($song.Name)"

    if (Test-Path $filepath) {
        Write-Host "  Exists, skipping..." -ForegroundColor Yellow
        $success++
        continue
    }

    try {
        Write-Host "  Downloading..." -NoNewline
        Invoke-WebRequest -Uri $song.Url -OutFile $filepath -TimeoutSec 120
        Write-Host " OK" -ForegroundColor Green
        $success++
    }
    catch {
        Write-Host " Failed: $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }

    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "================================"
Write-Host "Download Complete: $success success, $failed failed"
Write-Host "Audio saved in: $audioDir"
Write-Host "================================"

# Create audio list
$audioFiles = Get-ChildItem -Path $audioDir -Filter "*.mp3" -ErrorAction SilentlyContinue
if ($audioFiles) {
    Write-Host ""
    Write-Host "Downloaded files:"
    foreach ($file in $audioFiles) {
        Write-Host "  - $($file.Name)"
    }
}
