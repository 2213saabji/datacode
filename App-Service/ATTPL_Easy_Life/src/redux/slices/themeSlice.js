import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {darkTheme, lightTheme} from '../../Theme/themes';

// Function to get theme from AsyncStorage
const getStoredTheme = async () => {
  try {
    const storedTheme = await AsyncStorage.getItem('theme');
    if (storedTheme === 'dark') return darkTheme;
    if (storedTheme === 'light') return lightTheme;
  } catch (error) {
    console.error('Failed to load theme from storage:', error);
  }
  return darkTheme; // Default theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkTheme: false,
    theme: lightTheme,
  },
  reducers: {
    setTheme: (state, action) => {
      state.isDarkTheme = action.payload === 'dark';
      state.theme = state.isDarkTheme ? darkTheme : lightTheme;
      AsyncStorage.setItem('theme', action.payload);
    },
    toggleTheme: state => {
      const newTheme = state.isDarkTheme ? 'light' : 'dark';
      state.isDarkTheme = !state.isDarkTheme;
      state.theme = state.isDarkTheme ? darkTheme : lightTheme;
      AsyncStorage.setItem('theme', newTheme);
    },
    setDarkTheme: state => {
      state.isDarkTheme = true;
      state.theme = darkTheme;
      AsyncStorage.setItem('theme', 'dark');
    },
    setLightTheme: state => {
      state.isDarkTheme = false;
      state.theme = lightTheme;
      AsyncStorage.setItem('theme', 'light');
    },
  },
});

export const {setTheme, toggleTheme, setDarkTheme, setLightTheme} =
  themeSlice.actions;
export default themeSlice.reducer;
