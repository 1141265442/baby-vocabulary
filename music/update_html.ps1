# 更新 HTML 文件使用本地音频

$audioDir = Join-Path $PSScriptRoot "audio"
$htmlFile = Join-Path $PSScriptRoot "index.html"

if (-not (Test-Path $htmlFile)) {
    Write-Host "未找到 index.html 文件" -ForegroundColor Red
    exit
}

Write-Host "正在读取 HTML 文件..." -ForegroundColor Cyan
$htmlContent = Get-Content -Path $htmlFile -Raw -Encoding UTF8

# 获取音频文件
$audioFiles = Get-ChildItem -Path $audioDir -Filter "*.mp3"

if ($audioFiles.Count -eq 0) {
    Write-Host "未找到音频文件，请先运行 download_songs.ps1" -ForegroundColor Yellow
    exit
}

Write-Host "找到 $($audioFiles.Count) 个音频文件" -ForegroundColor Green

# 创建音频映射（简单匹配）
$audioMap = @{}
foreach ($file in $audioFiles) {
    $nameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($file.Name).Replace("_", " ")
    $audioMap[$nameWithoutExt] = "audio/$($file.Name)"
}

# 显示音频映射
Write-Host "`n音频文件映射:" -ForegroundColor Cyan
foreach ($key in $audioMap.Keys) {
    Write-Host "  $key -> $($audioMap[$key])"
}

# 保存映射到 JSON
$mappingFile = Join-Path $audioDir "mapping.json"
$audioMap | ConvertTo-Json -Depth 10 | Out-File -FilePath $mappingFile -Encoding UTF8

Write-Host "`n映射已保存到: $mappingFile" -ForegroundColor Green
Write-Host "`n提示: 请手动编辑 index.html 中的 audio URL 为本地路径"
