@echo off

"C:\Program Files (x86)\WinSCP\WinSCP.com" ^
  /log="C:\writable\path\to\log\WinSCP.log" /ini=nul ^
  /command ^
    "open sftp://zmbxfyh.534cdfcb:20050628@de15.falix.gg:2022/ -hostkey=""ssh-rsa 2048 uJmkfb8kSz/qVJR+mIbOSj/z8yo7DvbkA8PZXMUV3hw="" -rawsettings FSProtocol=2" ^
    "lcd C:\Users\mazas\Desktop\keithos_v3" ^
    "cd /" ^
    "put *" ^
    "exit"

set WINSCP_RESULT=%ERRORLEVEL%
if %WINSCP_RESULT% equ 0 (
  echo Success
) else (
  echo Error
)

pause

exit /b %WINSCP_RESULT%




