import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native'
import {DrawerActions} from 'react-navigation-drawer'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {Searchbar} from 'react-native-paper'

export default class ManageEvents extends Component {
  static navigationOptions = {
    drawerLabel: 'Manage Events',
    drawerIcon: () => (
      <Image
        source={require('../assets/propelrr.png')}
        style={{height: 30, width: 30}}
      />
    ),
  }
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: null,
      firstQuery: '',
    }
  }
  async componentDidMount () {
    try {
      const response = await fetch('http://demo6819551.mockable.io/events')
      const responseJson = await response.json()
      this.setState({
        isLoading: false,
        dataSource: responseJson.data,
      })
      // alert(dataSource)
    } catch (error) {
      console.log(error)
    }
  }
  render () {
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
              <Text style={styles.text}>MANAGE EVENTS</Text>
            </View>
          </View>
          <View style={styles.viewStyleThree}>
            {/* <Searchbar
              placeholder='Search'
              onChangeText={query => {
                this.setState({firstQuery: query})
              }}
              value={this.state.firstQuery}
            /> */}
            {/* <Text>hihihiihhi</Text> */}
          </View>

          <View style={styles.viewStyleFour}>
            <FlatList
              data={this.state.dataSource}
              //dataSource to add data in the list
              ItemSeparatorComponent={this.ListViewItemSeparator}
              //List Item separator
              renderItem={({item}) => (
                //Rendering Single Row
                <TouchableOpacity
                  style={styles.rowViewContainer}
                  // onPress={this.showItem.bind(
                  //   this,
                  //   item.category,
                  //   // item.hours,
                  //   // item.timein,
                  //   // item.timeout,
                  //   // item.overtime,
                  // )}
                >
                  <View style={{flexDirection: 'column', marginRight: 45}}>
                    <Text>{item.event}</Text>
                    <Text style={{marginBottom: 5}}>
                      {item.start} - {item.end}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontWeight: 'bold'}}>{item.status}</Text>
                  </View>
                </TouchableOpacity>
              )}
              // keyExtractor={(item, index) => index}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={{backgroundColor:'yellow',width:50,}}>
          <TouchableOpacity style={{backgroundColor:'yellow',width:50,height:50}}>
            <Text>HJi</Text>
          </TouchableOpacity>
        </View>
        </View>
       
      </View>
    )
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
    borderBottomWidth: hp('.04%'),
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
    height: hp('5%'), // 70% of height device screen
    width: wp('100%'),
    backgroundColor: 'grey',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ededed',
    // flexDirection: 'row',
    // marginTop: 10,
  },
  viewStyleFour: {
    height: hp('70%'), // 70% of height device screen
    width: wp('100%'),
    backgroundColor: '#ff9501',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ededed',
    // flexDirection: 'row',
    marginTop: 10,
  },

  rowViewContainer: {
    padding: 10,
    fontSize: 18,
    // height: 44,
    marginLeft: 3,
    borderWidth: 1,
    borderRadius: 10,
    margin: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 24,
    color: '#008ECC',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
})
