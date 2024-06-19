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
