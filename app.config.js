module.exports = {
  "name": "Charter Operator",
  "slug": "charter-operator",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "scheme": "charter",
  "owner": "bitmetro",
  "originalFullName": "@bitmetro/charter-operator",
  "currentFullName": "@bitmetro/charter-operator",
  "userInterfaceStyle": "light",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "supportsTablet": true,
    "infoPlist": {
      "NSCameraUsageDescription": "Allow $(PRODUCT_NAME) to access camera.",
      "NSMicrophoneUsageDescription": "Allow $(PRODUCT_NAME) to access your microphone"
    }
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#ffffff"
    },
    "permissions": [
      "android.permission.CAMERA"
    ]
  },
  "web": {
    "favicon": "./assets/favicon.png"
  },
  "plugins": [
    [
      "expo-barcode-scanner",
      {
        "cameraPermission": "Allow $(PRODUCT_NAME) to access camera."
      }
    ]
  ],
  "extra": {
    server: process.env.SERVER,
    "eas": {
      "projectId": "d90937a4-6d0b-413f-a052-8f5abecfada7"
    }
  },
  "runtimeVersion": {
    "policy": "sdkVersion"
  },
  "updates": {
    "url": "https://u.expo.dev/d90937a4-6d0b-413f-a052-8f5abecfada7"
  }
}

