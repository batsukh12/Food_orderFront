// Font.js
import { useFonts } from "expo-font";

export const loadFonts = () => {
  return useFonts({
    "Confortaa-Bold": require("../assets/Font/Comfortaa_Bold.ttf"),
    "Confortaa-Regular": require("../assets/Font/Comfortaa_Regular.ttf"),
    // Add other font files as needed
  });
};
