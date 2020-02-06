import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';

export default class HomeScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => (
            <Image source={require('../assets/propelrr.png')} style={{height: 30, width: 30}}/>
        ),
    }
    render() {
        const intime = this.props.navigation.getParam('timein', 'nothing sent');

        return (
            <View style={styles.view}>
                <Text>{intime}</Text>
                <TouchableHighlight onPress={() => 
                this.props.navigation.dispatch(DrawerActions.openDrawer(),{timein: intime})}
                style={styles.touchableHighlight} underlayColor={'rgba(0,0,0,0.8)'}>
                    <Image source={require('../assets/menu.png')} style={{height: 30, width: 30}}/>
                </TouchableHighlight>
                <Text style={styles.text}>This is homescreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 26,
        color: 'purple'
    },
    touchableHighlight: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 10,
        top: 40,
    },
    open: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});