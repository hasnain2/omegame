# OmeGame Installation


### Clone repository

```shell
git clone https://github.com/MusicAppCP/musicapp.git`
```

### Install dependencies

Navigate into the project folder and run the following command

```shell
npm install
```

### Install iOS depdencies using pods

Navigate into the ios folder and run the following command

```shell
cd ios && pods install && cd ..
```

### Run on Android

Navigate back to project folder and run the following command to run on Android

```shell
react-native run-android
```

### OR

### Run on iOS

Navigate back to project folder and run the following command to run on iOS

```shell
react-native run-ios
```



## Extra step for Android
You'll also need to manually apply a plugin to your app, from ```android/app/build.gradle```:

// 2nd line, add a new apply:
```apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"```

### Advanced Android Setup
In ```android/app/build.gradle```, if you use applicationIdSuffix or applicationId that is different from the package name indicated in ```AndroidManifest.xml``` in <manifest package="..."> tag, for example, to support different build variants: Add this in ```android/app/build.gradle```

```
defaultConfig {
    ...
    resValue "string", "build_config_package", "YOUR_PACKAGE_NAME_IN_ANDROIDMANIFEST.XML"
}
```

## Extra steps for iOS
```https://github.com/luggit/react-native-config#availability-in-build-settings-and-infoplist```


## Known Issues

### IF android released build crashes on start with error unable to find metro

- add three splash in : ```node_modules\metro-config\src\defaults\blacklist.js```

replace this part:
```
var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
```


## Video Player issue on android
 - switch to exo player, default android player lags sometime

https://github.com/ashrithks/rn-collapsing-tab-bar
https://github.com/ptomasroos/react-native-scrollable-tab-view



## NOTES
- Make sure you do not have empty lines in ```.env``` or your iOS build will fail