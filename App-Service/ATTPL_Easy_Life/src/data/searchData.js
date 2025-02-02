/**
 * searchScreensConfig.js
 *
 * This file consolidates the screens from both the drawer navigation and the app screens into a single configuration.
 * The combined list of screens is exported to be used for search functionality, enabling a unified view of all available
 * screens within the application. This approach helps in dynamically generating search results and navigation options
 * based on the unified screen list.
 *
 * **Imports**:
 * - `appScreens`: Configuration for app screens, typically including main and additional screens.
 * - `drawerScreens`: Configuration for screens included in the drawer navigation.

 * **Exports**:
 * - `searchScreens`: A unified list of screens combining both `drawerScreens` and `appScreens`, which can be used for search functionality.
 *
 * **Usage**:
 * - This configuration is useful for implementing search features within the application, where users can search and
 *   navigate to various screens. By merging `drawerScreens` and `appScreens`, the search functionality has access to
 *   all the relevant screens.
 *
 * @module searchScreens
 *
 * @example
 * import searchScreens from './searchScreens';
 *
 * // Example usage
 * searchScreens.forEach(screen => {
 *   console.log(screen.name); // Outputs the name of each screen
 * });
 *
 * @author SHIVAM GAUTAM
 * @co-author PRATHAMESH GHORPADE
 */

import appScreens from './appScreens';
import {voterScreens} from './VoterScreensList';

const searchScreens = [...voterScreens, ...appScreens];

export default searchScreens;
