# A Video Straming Application using React Native

Configure the app.

Create our application

```
npx create-expo-app@latest --template
```

Install required dependencies

```
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

change in package.json

```
  "main": "expo-router/entry"
```

change in app.json

```
  "scheme": "your-app-name"
```

## Start the application

```
    npx expo start
```

## very important for NativeWind

```
content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
```

### For animation and video playing

```
 npm install react-native-animatable expo-av
```

repo link : https://github.com/oblador/react-native-animatable

# Building APK file

```
step 1 : npm install --global eas-cli

step 2 : eas build -p android
`- now you got build details link, click on that link
 - in the expo.dev after creating .aap file , download it.

step 3 : go to this link and download jar file :  https://github.com/google/bundletool/releases

step 4 : create one folder and add both files ".aap" and ".jar" file

step 5 : run this command in the cmd in that new created folder
      java -jar bundletool.jar build-apks --bundle=filename.aab --output=newfilename.apks --mode=universal

      note : bundletool : rename to downloaded jar file
             filename : rename to downloaded aab file
             newfilename : your desire output file name

```
