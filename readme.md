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


# Have a look on it

<div align="center">

### MAIN INTRO PAGE
<img src="https://github.com/jayminDarji2003/form-validation-yup-formik/assets/122532790/d9431e01-6ca6-4c26-a1ad-8d1ae7d0800f" width="30%">

### REGISTER PAGE
<img src="https://github.com/jayminDarji2003/form-validation-yup-formik/assets/122532790/46b5596b-e0f8-4431-9e3e-c5fd5e574eac" width="30%">
<img src="https://github.com/jayminDarji2003/form-validation-yup-formik/assets/122532790/50df362b-e8e2-4c94-92e4-0041d5a668b1" width="30%">

### LOGIN PAGE
<img src="https://github.com/jayminDarji2003/form-validation-yup-formik/assets/122532790/d98964a0-c735-42b4-a9a8-048452019895" width="30%">
<img src="https://github.com/jayminDarji2003/form-validation-yup-formik/assets/122532790/5ab4e759-b676-498d-ab47-87646b2d4949" width="30%">

### HOME PAGE
<img src="https://github.com/jayminDarji2003/form-validation-yup-formik/assets/122532790/8ce7d1ea-45c4-4aa6-8ea3-ffe1d7d222b9" width="30%">

### CREATE VIDEO PAGE
<img src="https://github.com/jayminDarji2003/form-validation-yup-formik/assets/122532790/91d557fd-1800-4e76-a6f4-e19a041b1024" width="30%">

### PROFILE PAGE
<img src="https://github.com/jayminDarji2003/form-validation-yup-formik/assets/122532790/edef2d3c-f738-464a-a397-8b9418a76151" width="30%">

### BOOKMARK PAGE
<img src="https://github.com/jayminDarji2003/form-validation-yup-formik/assets/122532790/ff05524d-d631-4c49-bb73-7c413a0225b5" width="30%">

</div>


