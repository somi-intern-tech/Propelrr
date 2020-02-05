import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import MyRequest from './MyRequest';
import ManageEvents from './ManageEvents';
import ContentComponent from './ContentComponent'
import { Dimensions } from 'react-native';

const MyDrawerNavigator = createDrawerNavigator(
    {
    Home: { screen: HomeScreen },
    Profile: { screen: Profile },
    MyRequest: { screen: MyRequest },
    ManageEvents: { screen: ManageEvents },
},
    {
        initialRouteName: 'Home',
        contentComponent: ContentComponent,
        drawerWidth: Dimensions.get('window').width,
        drawerPosition: 'left',
        drawerBackgroundColor: 'transparent',

    }
);

const AppContainer = createAppContainer(MyDrawerNavigator);

export default class DrawerNavigator extends Component {
    render() {
        return <AppContainer />;
    }
}