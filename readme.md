# IF android released build crashes on start with error unable to find metro

``` add three splash in : node_modules\metro-config\src\defaults\blacklist.js

replace this part:

var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];```


https://github.com/ashrithks/rn-collapsing-tab-bar
https://github.com/ptomasroos/react-native-scrollable-tab-view