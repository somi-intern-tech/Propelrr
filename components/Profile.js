import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import { DrawerActions } from 'react-navigation-drawer'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Button } from 'native-base'
import Modal from 'react-native-modal'
import { TextInput } from 'react-native-paper'

export default class Profile extends Component {
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: () => (
      <Image
        source={require('../assets/propelrr.png')}
        style={{ height: 30, width: 30 }}
      />
    ),
  }

  componentDidMount() {
    return this.fetchProfile()
  }

  async fetchHours() {
    try {
      const response = await fetch('http://www.mocky.io/v2/5e5df65431000051002c206f')
      const responseJson = await response.json()
      this.setState({
        isLoading2: false,
        dataSource1: responseJson.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
  // http://www.amock.io/api/intern/profiledata
  async fetchProfile() {
    try {
      const response = await fetch('http://www.mocky.io/v2/5e5df50c310000ea092c2060')
      const responseJson = await response.json()
      this.setState({
        isLoading: false,
        dataSource: responseJson.profile,
      })
    } catch (error) {
      console.log(error)
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoading2: true,

      dataSource: null,
      dataSource1: null,

      datedata: null,
      nameholder: null,
      showForm: 0,
      visibleModal: null,

      isVisibleS1: true,


      cellHours: null,
      cellTimein: null,
      cellTimeout: null,
      cellOvertime: null,

      dataHolder: null,

      editValue: '',
    }
  }
  update = () => {
    if (this.state.editValue == '') {
      alert('please fill up fields')
    }
    else {
      this.setState({ visibleModal: null })
    }
  }
  renderButton = () => {
    this.setState({ visibleModal: null, isVisibleS1: true, isVisibleS2: false })
  }
  ToggleFunction = () => {
    this.setState(state => ({
      isVisibleS1: !state.isVisibleS1,
      isVisibleS2: !state.isVisibleS2,
    }))
  }
  datacontainer() {
    this.fetchProfile()

    if (this.state.showForm === 0) {
      if (this.state.isLoading) {
        <ActivityIndicator color='orange' />
      } else {
        this.fetchProfile()
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
          <View style={styles.viewStyleSix}>
            <View
              style={{
                width: wp('100%'),
                alignItems: 'center',
                // backgroundColor: 'grey',
                // marginTop: hp('1%'),
              }}>
              <View
                style={{
                  width: wp('90%'),
                  flexDirection: 'column',
                  marginTop: hp('1%'),
                  alignItems: 'center',
                  // backgroundColor: 'yellow',
                }}>
                <TouchableOpacity

                  style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // borderRadius: 10,
                    padding: 5,
                    width: wp('95%'),
                  }}>
                  <Image
                    source={require('../assets/hashtag.png')}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'stretch',
                      marginLeft: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                  <Text style={styles.info}> {idnum}</Text>
                </TouchableOpacity>

                <TouchableOpacity

                  style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // borderRadius: 10,
                    padding: 5,
                    width: wp('95%'),
                    marginTop: 3,
                  }}>
                  <Image
                    source={require('../assets/bcalendar.png')}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'stretch',
                      marginLeft: 5,
                    }}
                  />
                  <Text style={styles.info}> {birthday}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.setAddress}
                  style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // borderRadius: 10,
                    padding: 5,
                    width: wp('95%'),
                    marginTop: 3,

                  }}
                >
                  <Image
                    source={require('../assets/placeholder.png')}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'stretch',
                      marginLeft: 5,
                    }}
                  />
                  <Text style={styles.info}> {address}</Text>
                </TouchableOpacity>
                <TouchableOpacity

                  style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // borderRadius: 10,
                    padding: 5,
                    width: wp('95%'),
                    marginTop: 3,
                  }}>
                  <Image
                    source={require('../assets/mail.png')}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'stretch',
                      marginLeft: 5,
                    }}
                  />
                  <Text style={styles.info}> {email}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.setPhonenumber}
                  style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // borderRadius: 10,
                    padding: 5,
                    width: wp('95%'),
                    marginTop: 3,
                  }}>
                  <Image
                    source={require('../assets/smartphone.png')}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'stretch',
                      marginLeft: 5,
                    }}
                  />
                  <Text style={styles.info}> {number}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.setTelnumber}
                  style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // borderRadius: 10,
                    padding: 5,
                    width: wp('95%'),
                    marginTop: 3,
                  }}>
                  <Image
                    source={require('../assets/telephone.png')}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'stretch',
                      marginLeft: 5,
                    }}
                  />
                  <Text style={styles.info}> {altnumber}</Text>
                </TouchableOpacity>
                <TouchableOpacity

                  style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // borderRadius: 10,
                    padding: 5,
                    width: wp('95%'),
                    marginTop: 3,
                  }}>
                  <Image
                    source={require('../assets/teamwork.png')}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'stretch',
                      marginLeft: 5,
                    }}
                  />
                  <Text style={styles.info}> {team}</Text>
                </TouchableOpacity>
                <TouchableOpacity

                  style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // borderRadius: 10,
                    padding: 5,
                    width: wp('95%'),
                    marginTop: 3,
                  }}>
                  <Text style={styles.info}> SSS</Text>
                  <Text style={styles.info}> {SSS}</Text>
                </TouchableOpacity>
                <TouchableOpacity

                  style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // borderRadius: 10,
                    padding: 5,
                    width: wp('95%'),
                    marginTop: 3,
                  }}>
                  <Text style={styles.info}> BIR</Text>
                  <Text style={styles.info}> {BIR}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.setPersonalModal}
                  style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // borderRadius: 10,
                    padding: 5,
                    width: wp('95%'),
                    marginTop: 3,
                  }}>
                  <Text style={styles.info}> PHILHEALTH</Text>
                  <Text style={styles.info}> {phealth}</Text>
                </TouchableOpacity>
              </View>
              <Modal
                isVisible={this.state.visibleModal === 2}
                animationIn='fadeIn'
                animationOut='fadeOut'>
                {this.renderPersonalContent()}
              </Modal>
            </View>
          </View>
        )
      }
    } else if (this.state.showForm === 1) {
      this.fetchHours()
      // let dateday = this.state.dataSource1.map((val, key) => (
      //   <Text key={key}>{val.date}</Text>
      // ))
      let name = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.name}</Text>
      ))
      let position = this.state.dataSource.map(dataSource => (
        <Text key={dataSource.id}>{dataSource.position}</Text>
      ))
      if (this.state.isLoading2) {

        <ActivityIndicator color='orange' />
      } else {
        return (
          <View style={styles.viewStyleSix}>
            <SafeAreaView style={{ flex: 1 }}>
              <View
                style={{
                  width: wp('100%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: 'orange',
                  height: hp('3.2%'),
                }}>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: hp('2%'),
                    marginLeft: 25,
                    marginTop: 2,
                  }}>
                  Date
                </Text>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: hp('2%'),
                    marginRight: 15,
                    marginTop: 3,
                  }}>
                  Total hours
                </Text>
              </View>
              <View style={{ width: wp('100%') }}>
                <FlatList
                  data={this.state.dataSource1}
                  //dataSource to add data in the list
                  ItemSeparatorComponent={this.ListViewItemSeparator}
                  //List Item separator
                  renderItem={({ item }) => (
                    //Rendering Single Row
                    <TouchableOpacity
                      style={styles.rowViewContainer}
                      onPress={this.showItem.bind(
                        this,
                        item.date,
                        item.hours,
                        item.timein,
                        item.timeout,
                        item.overtime,
                      )}>
                      <Text>{item.date}</Text>
                      <Text style={{ marginRight: 50 }}> {item.hours}</Text>
                    </TouchableOpacity>
                  )}
                  // keyExtractor={(item, index) => index}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              <Modal
                isVisible={this.state.visibleModal === 1}
                animationIn='fadeIn'
                animationOut='fadeOut'>
                {this.renderModalContent()}
              </Modal>
            </SafeAreaView>
          </View>
        )
      }
    }
  }
  
  setAddress = () => {
    this.setState({ dataHolder: 'address' })
    this.setPersonalModal()
  }
  setTelnumber = () => {
    this.setState({ dataHolder: 'telnumber' })
    this.setPersonalModal()
  }
  setPhonenumber = () => {
    this.setState({ dataHolder: 'phonenumber' })
    this.setPersonalModal()
  }
  title(){
    if(this.state.dataHolder == "address"){
      return(<View s><Text>Address</Text></View>)
    }
    else if(this.state.dataHolder == "phonenumber"){
      return(<View><Text>Phone Number</Text></View>)
    }
    else if(this.state.dataHolder == "telnumber"){
      return(<View><Text>Telephone Number</Text></View>)
    }
  }
  setPersonalModal = () => this.setState({ visibleModal: 2 })
  renderPersonalContent = () => (
    <View style={styles.modalContent}>
      {this.state.isVisibleS1 ? (
        <View>
          <Text>Are you sure you want to edit?</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={this.ToggleFunction}
              style={{
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                padding: 5,
                marginTop: 5,
                marginRight:20,
                marginLeft:50
              }}>
              <Text style={{ fontWeight: 'bold' }}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.renderButton}
              style={{
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                padding: 5,
                marginTop: 5,
              }}>
              <Text style={{ fontWeight: 'bold' }}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {this.state.isVisibleS2 ? (
        <View style={{width:wp('80%')}}>
          {this.title()}
          <TextInput
          value={this.state.editValue}
            style={{
              marginLeft: 5,
              height: hp('5%'),
            }}></TextInput>
          <TouchableOpacity
            onPress={this.update}
            style={{
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              padding: 5,
              marginTop: 5,
              backgroundColor:'orange'
            }}>
            <Text style={{ fontWeight: 'bold' }}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.renderButton}
            style={{
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              padding: 5,
              marginTop: 5,
            }}>
            <Text style={{ fontWeight: 'bold' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  )
  setModal = () => this.setState({ visibleModal: 1 })
  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#008ECC',
            justifyContent: 'center',
            alignItems: 'center',
            width: wp('90%'),
          }}>
          <Text
            style={{ fontWeight: 'bold', fontSize: hp('3%'), color: 'white' }}>
            {this.state.cellDate}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Text style={{ fontWeight: 'bold' }}>Time-in </Text>
          <Text> {this.state.cellTimein} </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontWeight: 'bold' }}>Time-out </Text>
          <Text>{this.state.cellTimeout} </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontWeight: 'bold' }}>Total hours </Text>
          <Text> {this.state.cellHours} </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ fontWeight: 'bold' }}>Overtime </Text>
        <Text> {this.state.cellOvertime} </Text>
      </View>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'orange',
          borderRadius: 10,
          padding: 5,
          marginTop: 5,
        }}
        onPress={this.renderButton}>
        <Text style={{ fontWeight: 'bold' }}>CLOSE</Text>
      </TouchableOpacity>
      {/* {this.renderButton('Close', () => this.setState({visibleModal: null}))} */}
    </View>
  )

  showItem(rowData, rowData2, rowData3, rowData4, rowData5) {
    this.setState({
      cellDate: rowData.toString(),
      cellHours: rowData2.toString(),
      cellTimein: rowData3.toString(),
      cellTimeout: rowData4.toString(),
      cellOvertime: rowData5.toString(),
    })
    this.setModal()
  }
  ListViewItemSeparator = () => {
    return (
      //List Item separator View
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#606070' }} />
    )
  }

  showProfile = () => {
    this.setState({ showForm: 0 })
  }
  showHOurs = () => {
    this.setState({ showForm: 1 })
  }

  showDateModal = () => {
    this.setState({ visibleModal: 1 })
  }

  render() {
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
          <View style={styles.viewStyleSix}>
            <View
              style={{
                width: wp('100%'),
                height: hp('30%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator color='orange' />
            </View>
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
              underlayColor={'rgba(0,0,0,0.8)'}
              onPress={this.showProfile}>
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
              underlayColor={'rgba(0,0,0,0.8)'}
              onPress={this.showHOurs}>
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
          {this.datacontainer()}

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
    // backgroundColor: '#ededed',
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
    height: hp('50%'), // 70% of height device screen
    // backgroundColor: 'yellow',
    // flexDirection: 'row',
    // alignItems: 'center',
    // flexWrap:'wrap'
  },
  // viewStyleSix: {
  //   width: wp('100%'),
  //   height: hp('50%'), // 70% of height device screen
  //   // backgroundColor: 'yellow',
  //   // flexDirection: 'row',
  //   // alignItems: 'center',
  //   // flexWrap:'wrap'
  // },

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
    marginLeft: 3,
    borderWidth: 1,
    // borderRadius: 10,
    margin: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  profilebtn: {
    width: wp('50%'),
    // backgroundColor: '#ededed',
    borderRightWidth: 0.5,
    borderRightColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    // borderRadius:10
  },
  info: {
    fontSize: hp('2%'),
    fontWeight: '100',
    padding: 3,
    // color: 'white',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: wp('90%'),
  },

})
