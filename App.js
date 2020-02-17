
import {
  createAppContainer
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from './components/Login';
import HomeScreen from './components/HomeScreen';
import ManageEvents from './components/ManageEvents';
import MyRequest from './components/MyRequest';
import Profile from './components/Profile';
import ContentComponent from './components/ContentComponent'
import { Dimensions } from 'react-native';
// const RootStack = createStackNavigator({
//   DrawerNavigator: {
//   screen: DrawerNavigator,
//   navigationOptions:{
//     headerShown:false
//   }
// },
// Login: {
//   screen: Login,
//   navigationOptions:{
//     headerShown:false
//   }
// }},
// {
//   initialRouteName: 'Login',
// }
// );
// const App = createAppContainer(RootStack);
// export default App;

const AuthStackNavigation = createStackNavigator(
  {
    Home: { screen: (HomeScreen) },
  Profile: { screen: Profile },
  MyRequest: { screen: MyRequest },
  ManageEvents: { screen: ManageEvents },
  Login: { screen: Login }
  },
  {headerMode:'none'})

// const DashboardStack = createStackNavigator({ // For header options
//   HomeScreen: HomeScreen,
//   ManageEvents : ManageEvents,
//   MyRequest: MyRequest,
//   Profile : Profile
// })


const DrawerNav = createDrawerNavigator({
  Login: { screen: Login },

  Home: { screen: (HomeScreen) },
  Profile: { screen: Profile,navigationOptions:{
    title:'PROFILE'
  } },
  MyRequest: { screen: MyRequest },
  ManageEvents: { screen: ManageEvents },

},
  {
    // initialRouteName: 'Home',
    contentComponent: ContentComponent,
    drawerWidth: Dimensions.get('window').width,
    drawerPosition: 'left',
    drawerBackgroundColor: 'transparent',
    

  }
);





const MainNavigation = createSwitchNavigator({
  HomeDrawer: DrawerNav,
  AuthStack: AuthStackNavigation, // You will use this.props.navigation.replace('HomeDrawer') after login process.
})
const App = createAppContainer(MainNavigation)
export default App // Stack, Drawer, Switch naviagtions return react component.
