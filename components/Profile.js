import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native'
import {DrawerActions} from 'react-navigation-drawer'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default class Profile extends Component {
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: () => (
      <Image
        source={require('../assets/propelrr.png')}
        style={{height: 30, width: 30}}
      />
    ),
  }
  render () {
    return (


      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={styles.viewStyleOne}>
            <TouchableHighlight
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }
              style={styles.touchableHighlight}
              underlayColor={'rgba(0,0,0,0.8)'}>
              <Image
                source={require('../assets/menu.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.viewStyleTwo}>
            <Text style={styles.text}>PROFILE</Text>
          </View>
          {/* <View style={styles.viewStyleThree}>
          <Text style={styles.textStyle}> 3 </Text>
        </View> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
////////////
  container: {
    flex: 1,
    flexDirection: 'row', // 70% of height device screen
    width: wp('100%'),
    height: hp('20%'),
    marginTop: '9%', // 70% of height device screen
  },
  container1: {
    flex: 1,
    flexDirection: 'row', // 70% of height device screen
    width: wp('100%'),
    height: hp('7%'),
    // left: 10,
    borderBottomWidth:hp('.04%')

  },
  viewStyleOne: {
    height: hp('6.5%'), // 70% of height device screen
    width: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',

    // left: 10,
  },
  viewStyleTwo: {
    height: hp('7%'), // 70% of height device screen
    width: wp('72%'),
    justifyContent: 'center',
    alignItems: 'center',
    left: 13,
    // backgroundColor:'grey'
  },
  viewStyleThree: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  text: {
    fontSize: 24,
    

    color: '#008ECC',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
})
