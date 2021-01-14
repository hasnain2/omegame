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