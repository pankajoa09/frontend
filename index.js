import { AppRegistry } from 'react-native';
import App from './App';
import { YellowBox } from 'react-native';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Module RNFetchBlob requires main queue setup']);
console.ignoredYellowBox = ['Remote debugger'];
AppRegistry.registerComponent('untitled', () => App);
