/**
 * drawerScreensConfig.js
 *
 * Configuration file for defining the screens in the application's drawer navigation. Each screen is associated with
 * its component, icon, and path for navigation purposes. This file centralizes the configuration for easy management
 * of drawer screens and their respective properties.
 *
 * **Structure**:
 * - `name`: The name of the screen used for navigation and identification within the drawer.
 * - `component`: The React component that renders the screen's UI.
 * - `icon`: The icon associated with the screen, typically used in the drawer menu.
 * - `path`: The path used for navigation routing.
 * - `stack`: The name of the stack navigator that the screen belongs to.
 * - `category`: The category to which the screen belongs.
 *
 * This configuration helps in dynamically generating the drawer menu and routing within the application.
 *
 * @module drawerScreens
 *
 * @example
 * import drawerScreens from './navigation/drawerScreens';
 *
 * // Example usage
 * const screen = drawerScreens.find(screen => screen.name === 'Home');
 * console.log(screen.component); // Outputs: HomeScreen component
 *
 * @author SHIVAM GAUTAM
 * @co-author PRATHAMESH GHORPADE
 */

import {voterScreens} from './VoterScreensList';

const getDrawerScreens = role => {
  console.log(role);

  switch (role) {
    case 'Voter':
      return voterScreens;
    case 'Candidate':
      return voterScreens;
    case 'Employer':
      return voterScreens;
    case 'Agriculture Equipment Seller':
      return voterScreens;
    default:
      return voterScreens;
  }
};

export default getDrawerScreens;
