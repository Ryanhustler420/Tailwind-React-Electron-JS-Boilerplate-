npm run clean-win &&^
npm run build &&^
copy *.js build &&^
copy *.env build &&^
copy settings.json build &&^
xcopy "./utils" "build/utils" /s/h/e/k/f/c &&^
npm run package:win