import React from "react";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import { store } from "./src/Store";
import { useFonts } from "expo-font";
import { customFonts } from "./src/const";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  return fontsLoaded ? (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  ) : null;
}
