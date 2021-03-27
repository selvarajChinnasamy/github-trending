import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Trending from "./screens/trending/trending";

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Trending />
      </SafeAreaView>
    </>
  );
};

export default App;
