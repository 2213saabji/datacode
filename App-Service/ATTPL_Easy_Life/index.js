/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Root from './Root'; // Importing the main component

// Register the main component
AppRegistry.registerComponent(appName, () => Root);
