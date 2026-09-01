# Downloads the three libraries index.html loads, into vendor\.
# Run once, from anywhere:   powershell -ExecutionPolicy Bypass -File tools\fetch-vendor.ps1
# After it succeeds the app no longer needs a network connection for its
# JavaScript (web fonts still come from Google Fonts).
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$vendor = Join-Path $root "vendor"
New-Item -ItemType Directory -Force -Path $vendor | Out-Null
$base = "https://cdnjs.cloudflare.com/ajax/libs"
$files = @{
  "react.production.min.js"     = "$base/react/18.2.0/umd/react.production.min.js"
  "react-dom.production.min.js" = "$base/react-dom/18.2.0/umd/react-dom.production.min.js"
  "babel.min.js"                = "$base/babel-standalone/7.23.5/babel.min.js"
}
foreach ($name in $files.Keys) {
  $dest = Join-Path $vendor $name
  Write-Host "Fetching $name ..."
  Invoke-WebRequest -Uri $files[$name] -OutFile $dest -UseBasicParsing
}
Get-ChildItem $vendor | Format-Table Name, Length
Write-Host "Done. Reload the app; the CDN fallbacks in index.html will no longer fire."
