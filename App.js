// import React, { Component } from 'react';
// import DrawerNavigator from './components/DrawerNavigator';

// export default class App extends Component {
//   render() {
//     return (
//       <DrawerNavigator />
//     );
//   }
// }
import {
  createAppContainer
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './components/Login'
import DrawerNavigator from './components/DrawerNavigator'

const RootStack = createStackNavigator({
  DrawerNavigator: {
  screen: DrawerNavigator,
  navigationOptions:{
    headerShown:false
  }
},
Login: {
  screen: Login,
  navigationOptions:{
    headerShown:false
  }
}},
{
  initialRouteName: 'Login',
}
);

const App = createAppContainer(RootStack);

export default App;