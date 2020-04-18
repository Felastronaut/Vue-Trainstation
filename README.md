# App TrouveTonTrain

## To access to the website :
https://fel-trouvetontrain.netlify.app/

In order to have the full expreience of the website you will have to access it with the CORS disabled.
Otherwise it would not accept the SOAP answers.
The commend at the end of this document shows you how to do it.
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### For the CORS issue do the following command (on Windows)
```
cd "C:\Program Files (x86)\Google\Chrome\Application"
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
```
Made by Félix Meynet