import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native'
import {DrawerActions} from 'react-navigation-drawer'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {Button} from 'native-base'

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

  componentDidMount () {
    // return fetch('http://demo6513183.mockable.io/profiledata')
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState({
    //       isLoading: false,
    //       dataSource: responseJson.data,
    //     })
    //   })

    //   .catch(error => {
    //     console.log(error)
    //   })
    // {this.fetchProfile}.

    return fetch('http://demo6819551.mockable.io/userdate')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.profile,
        })
      })

      .catch(error => {
        console.log(error)
      })
  }

  fetchHours () {
    return fetch('http://demo6513183.mockable.io/profiledata')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
        })
      })
      .done()

      .catch(error => {
        console.log(error)
      })
  }
  fetchProfile () {
    return fetch('http://demo6819551.mockable.io/userdate')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.profile,
        })
      })

      .catch(error => {
        console.log(error)
      })
  }
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: null,
      datedata: null,
      nameholder: null,
    }
  }

  showItem (rowData) {
    //Alert on the click of list Item
    alert(rowData.toString())
  }
  ListViewItemSeparator = () => {
    return (
      //List Item separator View
      <View style={{height: 0.5, width: '100%', backgroundColor: '#606070'}} />
    )
  }
  data () {}

  render () {
    // return (
    // <View style={styles.maincontainer}>
    //   <View style={styles.container}>
    //     <View style={styles.container1}>
    //       <View style={styles.viewStyleOne}>
    //         <TouchableOpacity
    //           onPress={() =>
    //             this.props.navigation.dispatch(DrawerActions.openDrawer())
    //           }
    //           style={styles.touchableHighlight}
    //           underlayColor={'rgba(0,0,0,0.8)'}>
    //           <Image
    //             source={require('../assets/menu.png')}
    //             style={{
    //               height: hp('7%'),
    //               width: wp('7%'),
    //               resizeMode: 'contain',
    //             }}
    //           />
    //         </TouchableOpacity>
    //       </View>
    //       <View style={styles.viewStyleTwo}>
    //         <Text style={styles.text}>PROFILE</Text>
    //       </View>
    //     </View>
    //   </View>

    //   <View style={styles.viewStyleThree}>
    {
      /* <FlatList
            data={this.state.datedata}
            //dataSource to add data in the list
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //List Item separator
            renderItem={({item}) => (
              //Rendering Single Row
              <Text
                style={styles.rowViewContainer}
                onPress={this.showItem.bind(this, item)}>
                {item}
              </Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          /> */
    }
    //         {this.data}
    //       </View>
    //     </View>
    //   )
    // }
    if (this.state.isLoading) {
      return (
        <View style={styles.maincontainer}>
          <View style={styles.container}>
            <View style={styles.container1}>
              <View style={styles.viewStyleOne}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.dispatch(DrawerActions.openDrawer())
                  }
                  style={styles.touchableHighlight}
                  underlayColor={'rgba(0,0,0,0.8)'}>
                  <Image
                    source={require('../assets/menu.png')}
                    style={{
                      height: hp('7%'),
                      width: wp('7%'),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.viewStyleTwo}>
                <Text style={styles.text}>PROFILE</Text>
              </View>
            </View>
          </View>

          <View style={styles.viewStyleThree}></View>
          <View>
            <ActivityIndicator />
          </View>
        </View>
      )
    } else {
      // let data = this.state.dataSource

      let name = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.name}</Text>
      ))
      let position = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.position}</Text>
      ))
      let idnum = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.id}</Text>
      ))
      let birthday = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.birthday}</Text>
      ))
      let number = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.number}</Text>
      ))

      let altnumber = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.altnumber}</Text>
      ))
      let email = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.email}</Text>
      ))
      let team = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.team}</Text>
      ))
      let address = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.address}</Text>
      ))
      let SSS = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.SSS}</Text>
      ))
      let BIR = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.BIR}</Text>
      ))
      let phealth = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.Philhealth}</Text>
      ))
      return (
        <View style={styles.maincontainer}>
          <View style={styles.container}>
            <View style={styles.container1}>
              <View style={styles.viewStyleOne}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.dispatch(DrawerActions.openDrawer())
                  }
                  style={styles.touchableHighlight}
                  underlayColor={'rgba(0,0,0,0.8)'}>
                  <Image
                    source={require('../assets/menu.png')}
                    style={{
                      height: hp('7%'),
                      width: wp('7%'),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.viewStyleTwo}>
                <Text style={styles.text}>PROFILE</Text>
              </View>
            </View>
          </View>

          <View style={styles.viewStyleThree}>
            {/* <FlatList
              data={this.state.dataSource}
              //dataSource to add data in the list
              ItemSeparatorComponent={this.ListViewItemSeparator}
              //List Item separator
              renderItem={({item}) => (
                //Rendering Single Row
                <Text
                  style={styles.rowViewContainer}
                  onPress={this.showItem.bind(this, item.date)}>
                  {item.date}
                </Text>
              )}
              keyExtractor={(item, index) => index}
            /> */}
            {/* <View
              style={{
                width: wp('100%'),
                height: hp('20%'),
                backgroundColor: 'orange',
                flexDirection: 'column',
              }}>
              <Text style={{fontSize:hp('8%'),}}>MC</Text> 
           
            </View> 
           */}

            {/* <View style={styles.viewStyleFive}>
            
            </View> */}
            <View
              style={{
                flexDirection: 'column',
                top: hp('-.5%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/logo.png')}
                style={{
                  width: wp('30%'),
                  height: hp('15%'),
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: hp('3%'),
                  // marginTop: hp('-2%'),
                  fontWeight: '500',
                  // color: 'white',
                }}>
                {name}
              </Text>
              <Text
                style={{
                  fontSize: hp('2%'),
                  marginTop: hp('.5%'),
                  fontWeight: '500',
                  // color: 'white',
                }}>
                {position}
              </Text>
            </View>
          </View>
          <View style={styles.viewStyleFour}></View>

          <View style={styles.viewStyleFive}>
            <TouchableOpacity
              style={styles.profilebtn}
              underlayColor={'rgba(0,0,0,0.8)'}>
              <Text
                style={{
                  fontSize: hp('2%'),
                  fontWeight: 'bold',
                  // color: 'white',
                }}>
                PERSONAL
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profilebtn}
              underlayColor={'rgba(0,0,0,0.8)'}>
              <Text
                style={{
                  fontSize: hp('2%'),
                  fontWeight: 'bold',
                  // color: 'white',
                }}>
                HOURS
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewStyleSix}>
          <Text style={styles.info}>{idnum}</Text>
          <Text style={styles.info}>{birthday}</Text>
          <Text style={styles.info}>{number}</Text>
          <Text style={styles.info}>{altnumber}</Text>
          <Text style={styles.info}>{email}</Text>
          <Text style={styles.info}>{team}</Text>
          <Text style={styles.info}>{address}</Text>
          <Text style={styles.info}>{SSS}</Text>
          <Text style={styles.info}>{BIR}</Text>
          <Text style={styles.info}>{phealth}</Text>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    // flexDirection: 'column', // 70% of height device screen
    // // width: wp('100%'),
    // // flexGrow:hp('100%'),
    // // marginTop: '9%', // 70% of height device screen
    // height:hp('100%'),
    // backgroundColor:'grey',
    // // marginTop:50,
    // // alignItems:'center',
    // justifyContent:'center',
  },

  container: {
    // flexDirection: 'row', // 70% of height device screen
    width: wp('100%'),
    height: hp('7%'),
    marginTop: '9%', // 70% of height device screen
    // backgroundColor:'green',
  },
  container1: {
    flexDirection: 'row', // 70% of height device screen
    width: wp('100%'),
    height: hp('7%'),
    // left: 10,
    borderBottomWidth: hp('.05%'),
    // backgroundColor:'red',
  },
  container2: {
    width: wp('100%'),
    // flexGrow:hp('100%'),
    // marginTop: '9%', // 70% of height device screen
    height: hp('100%'),
    // backgroundColor: 'yellow',
    // marginTop:50,
    // alignItems:'center',
    // justifyContent: 'center',
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
    height: hp('25%'), // 70% of height device screen
    width: wp('100%'),
    // backgroundColor: '#ff9501',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ededed',
    // flexDirection: 'row',
  },
  viewStyleFour: {
    height: hp('3%'), // 70% of height device screen
    width: wp('100%'),
    // backgroundColor: '#ee6730',
    backgroundColor: '#008ECC',

    // borderTopEndRadius: 50,
    // borderTopStartRadius: 50,
    // marginTop: hp('8%'),
    // alignItems:'center',
    // justifyContent:'center'
  },
  viewStyleFive: {
    height: hp('6%'), // 70% of height device screen
    width: wp('100%'),
    // backgroundColor: '#008ECC',
    // backgroundColor: '#ee6730',
    flexDirection: 'row',
    // borderTopEndRadius: 50,
    // borderTopStartRadius: 50,
    // marginTop: hp('1%'),
  },
  viewStyleSix: {
    width: wp('100%'),
    height: hp('60%'), // 70% of height device screen
    // backgroundColor: 'grey',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  text: {
    fontSize: 24,
    color: '#008ECC',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },

  rowViewContainer: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  profilebtn: {
    width: wp('50%'),
    backgroundColor: '#ededed',
    borderRightWidth: 0.5,
    borderRightColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    // borderRadius:10
  },
  info: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    // color: 'white',
  },
})
