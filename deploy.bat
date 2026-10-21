@echo off
REM ===================================================================
REM  Deploy HEARTCALM landing page ke GitHub Pages (gratis)
REM  Pakai: deploy.bat [nama-repo]
REM  Contoh: deploy.bat heartcalm1
REM ===================================================================
setlocal
cd /d "%~dp0"

set "REPO=%~1"
if "%REPO%"=="" set "REPO=heartcalm1"

echo.
echo ============================================
echo  HEARTCALM - Deploy ke GitHub Pages
echo ============================================
echo  Nama repo : %REPO%
echo.

REM --- 1. Cek GitHub CLI ---
where gh >nul 2>&1
if errorlevel 1 (
  echo [X] GitHub CLI tidak ditemukan.
  echo     Download: https://cli.github.com/
  echo.
  pause
  exit /b 1
)

REM --- 2. Cek login ---
gh auth status >nul 2>&1
if errorlevel 1 (
  echo [!] Belum login ke GitHub. Menjalankan 'gh auth login'...
  echo.
  gh auth login
  if errorlevel 1 (
    echo [X] Login gagal. Coba lagi.
    pause
    exit /b 1
  )
)

REM --- 3. Pastikan branch utama = main ---
git rev-parse --abbrev-ref HEAD | findstr /i /c:"main" >nul
if errorlevel 1 (
  echo [!] Branch aktif bukan 'main'. Memberi nama ulang ke 'main'...
  git branch -M main
)

REM --- 4. Commit semua perubahan ---
echo.
echo [1/4] Commit perubahan...
git add -A
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Deploy HEARTCALM landing page to GitHub Pages"
) else (
  echo     Tidak ada perubahan baru, melewati commit.
)

REM --- 5. Push / buat repo di GitHub ---
echo.
echo [2/4] Upload ke GitHub...
git push -u origin main >nul 2>&1
if errorlevel 1 (
  echo     Remote belum ada, membuat repository '%REPO%'...
  gh repo create %REPO% --public --source=. --remote=origin --push
  if errorlevel 1 (
    echo [X] Gagal membuat repository. Periksa login & nama repo.
    pause
    exit /b 1
  )
) else (
  echo     Push berhasil.
)

REM --- 6. Aktifkan GitHub Pages dari branch main / root ---
echo.
echo [3/4] Mengaktifkan GitHub Pages...
gh api --method POST repos/:owner/:repo/pages -f source[branch]=main -f source[path]=/ >nul 2>&1
if errorlevel 1 (
  echo     Melakukan update konfigurasi Pages...
  gh api --method PUT repos/:owner/:repo/pages -f source[branch]=main -f source[path]=/ >nul 2>&1
)
gh api repos/:owner/:repo/pages --jq .html_url > "%TEMP%\ghpages.txt" 2>nul
if errorlevel 1 (
  echo     GitHub Pages belum aktif. Aktifkan manual:
  echo     Settings -^> Pages -^> Source: Deploy from a branch -^> main / (root)
) else (
  echo     URL:
  type "%TEMP%\ghpages.txt"
)
del "%TEMP%\ghpages.txt" >nul 2>&1

REM --- 7. Tampilkan URL manual ---
echo.
echo [4/4] Selesai!
echo.
echo     Website  : https://USERNAME.github.io/%REPO%/
echo     GitHub   : https://github.com/USERNAME/%REPO%
echo     Update   : git add . ^&^& git commit -m "update" ^&^& git push
echo.
echo     Tunggu 1-3 menit agar Pages selesai di-build.
echo.
pause
endlocal
