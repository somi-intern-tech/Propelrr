import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Picker,
} from 'react-native'
import {DrawerActions} from 'react-navigation-drawer'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {Searchbar, TextInput} from 'react-native-paper'
import Modal from 'react-native-modal'

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
      visibleModal: null,

      language: 'haxe',
      firstLanguage: 'java',
      secondLanguage: 'js',
    }
  }
  renderButton = () => {
    this.setState({visibleModal: null})
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
            {/* <View style={{margin:10}}>
              <Text style={styles.text}>+</Text>
            </View> */}
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
          <View style={{}}>
            <TouchableOpacity
              onPress={this.setModal}
              style={{
                marginTop: hp('-2%'),
                marginLeft: wp('75%'),
                backgroundColor: '#ff9501',
                borderBottomLeftRadius:20,
                borderTopLeftRadius:20
              }}>
              <Image
                source={require('../assets/add.png')}
                style={{
                  height: 65,
                  width: 65,
                  resizeMode: 'stretch',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          isVisible={this.state.visibleModal === 1}
          animationIn='fadeIn'
          animationOut='fadeOut'>
          {this.renderModalContent()}
        </Modal>
      </View>
    )
  }

  setModal = () => this.setState({visibleModal: 1})

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View
        style={{
          flexDirection: 'column',
          marginBottom:5
          // alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#008ECC',
            width: wp('90%'),
            flexDirection: 'row',
            justifyContent:'space-between',
            height:hp('5%')

          }}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: hp('3%'),
              color: 'white',
              marginLeft: 10,
              marginTop: 5,


            }}>
            Create Event
          </Text>
          <TouchableOpacity
            style={{
              // borderWidth: 1,
              // alignItems: 'center',
              // justifyContent: 'center',
              // backgroundColor: 'grey',
              marginTop: 5,
              marginRight:10
            }}
            onPress={this.renderButton}>
            <Text style={{color: 'white',fontWeight:'bold',fontSize:hp('3%')}}>X</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
            paddingLeft: 5,
          }}>
          <Text style={{}}>Event type</Text>
          <Text style={{}}>Event name</Text>
          <Text> </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            width: wp('90%'),
            height: hp('5%'),
            marginTop: 5,
          }}>
          <TextInput style={{width: wp('40%'),marginLeft:5,height: hp('5%')}}></TextInput>
          <TextInput style={{width:  wp('45%'),marginLeft:5,height: hp('5%')}}></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 5,
            
            // backgroundColor: 'grey',
          }}>
          <Text style={{marginLeft:5}}>Event Description</Text>
          <TextInput style={{width: wp('86%'),height: hp('5%'),marginLeft:5}}></TextInput>
          <Text style={{marginLeft:5}}>Venue</Text>
          <TextInput style={{width: wp('86%'),height: hp('5%'),marginLeft:5}}></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            marginTop: 5,
            // backgroundColor:'grey',
            // width:wp('35%'),
            alignItems:'center',
            justifyContent:'center'       }}>
          <TouchableOpacity
            style={{
              // borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'orange',
              borderRadius: 5,
              padding: 5,
              marginTop: 5,
              width:wp('50%')
            }}
            onPress={this.renderButton}>
            <Text style={{color: 'white'}}>CREATE</Text>
          </TouchableOpacity>

         
        </View>

        {/* {this.renderButton('Close', () => this.setState({visibleModal: null}))} */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  maincontainer: {
    // flexDirection: 'column', // 70% of height device screen
    // width: wp('100%'),
    // flexGrow:hp('100%'),
    // marginTop: '9%', // 70% of height device screen
    // height:hp('100%'),
    // backgroundColor:'grey',
    // marginTop:50,
    // alignItems:'center',
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
    // backgroundColor: '#ff9501',
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
  modalContent: {
    backgroundColor: 'white',
    // padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: wp('90%'),
  },
  picker: {
    width: 200,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
})
