import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';

export default class MyRequest extends Component {
    static navigationOptions = {
        drawerLabel: 'My Request',
        drawerIcon: () => (
            <Image source={require('../assets/propelrr.png')} style={{ height: 30, width: 30 }} />
        ),
    }
    render() {
        return (
            <View style={styles.view}>
                    <TouchableHighlight onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                        style={styles.touchableHighlight} underlayColor={'rgba(0,0,0,0.8)'}>
                        <Image source={require('../assets/menu.png')} style={{ height: 30, width: 30 }} />
                    </TouchableHighlight>
                    <Text style={styles.text}>This is MyRequest</Text>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    text: {
        fontSize: 26,
        color: 'white'
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