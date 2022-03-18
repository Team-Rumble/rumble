import "dotenv/config"

export default {
  "expo": {
    "owner": "teamrumble",
    "name": "Rumble",
    "slug": "rumble",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/favicon.png",
    "splash": {
      "image": "./assets/backgroundImage.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.TeamRumble.Rumble",
      "buildNumber": "1.0.0"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.TeamRumble.Rumble",
      "versionCode": 1,
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }, 
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    }
  }
}
