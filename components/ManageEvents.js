import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Picker,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { DrawerActions } from 'react-navigation-drawer'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Searchbar, TextInput } from 'react-native-paper'
import Modal from 'react-native-modal'
import RNPickerSelect from 'react-native-picker-select'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'

var respo = [
  'Gary Viray - Going',
  'Mitchelle Viray - Going',
  'Vino Bolisay - Pending',
  'Dexter Loor - Going',
  'Allen Cerezo - Pending',
]
export default class ManageEvents extends Component {
  static navigationOptions = {
    drawerLabel: 'Manage Events',
    drawerIcon: () => (
      <Image
        source={require('../assets/propelrr.png')}
        style={{ height: 30, width: 30 }}
      />
    ),
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: null,
      firstQuery: '',
      visibleModal: null,
      startDate: '',
      startDateHolder: '',
      endDate: '',
      endDateHolder: '',
      isDatePickerVisibleStart: false,
      setDatePickerVisibilityStart: false,
      isDatePickerVisibleEnd: false,
      setDatePickerVisibilityEnd: false,
      language: 'haxe',
      firstLanguage: 'java',
      secondLanguage: 'js',
      text: '',
      cellEvent: null,
      cellType: null,
      cellStart: null,
      cellEnd: null,
      cellStatus: null,
      cellPlace: null,
      holder: 'bianca -going',
      selectEvent: undefined,
      items: [
        {
          label: 'Holiday',
          value: 'holiday',
        },
        {
          label: 'Internal Event',
          value: 'internal event',
        },
      ],
      eventName: undefined,
      items2: [
        {
          label: 'Creator',
          value: 'creator',
        },
        {
          label: 'Guest',
          value: 'guest',
        },
      ],
      eventType: undefined,
      items3: [
        {
          label: 'Holiday',
          value: 'holiday',
        },
        {
          label: 'Internal Event',
          value: 'internal event',
        },
        {
          label: 'Meeting',
          value: 'eventmeeting',
        },
      ],
      statusName: undefined,
      items4: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Going',
          value: 'going',
        },
        {
          label: 'Not Going',
          value: 'not going',
        },
      ],
    }
    this.arrayholder = []
    this.inputRefs = {}
  }
  renderButton = () => {
    this.setState({ visibleModal: null, startDate: '', endDate: '' })
  }

  createEvent = () => {
    if (this.state.eventType == '' || this.state.eventName == '') {
      alert('please fill up fields')
    }
    else {
      alert('successfuly created an event')
      this.setState({ visibleModal: null })

    }
  }
  async componentDidMount() {
    try {
      const response = await fetch('http://www.amock.io/api/intern/events')
      const responseJson = await response.json()
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson.data,
        },
        function () {
          this.arrayholder = responseJson.data
        },
      )
      // alert(dataSource)
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      this.setState({
        selectEvent: undefined,
      })
    }, 1000)

    // parent can also update the `items` prop
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat([{ value: 'meeting', label: 'Meeting' }]),
      })
    }, 2000)
    // return fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState(
    //       {
    //         isLoading: false,
    //         dataSource: responseJson.data,
    //       },
    //       function () {
    //         this.arrayholder = responseJson.data
    //       },
    //     )
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })
  }
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.event ? item.event.toUpperCase() : ''.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      text: text,
    })
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    )
  }
  showItem(rowData, rowData2, rowData3, rowData4, rowData5, rowData6) {
    this.setState({
      cellEvent: rowData.toString(),
      cellType: rowData2.toString(),
      cellStart: rowData3.toString(),
      cellEnd: rowData4.toString(),
      cellStatus: rowData5.toString(),
      cellPlace: rowData6.toString(),
    })
    this.setDataModal()
  }
  //---------START DATE-----------
  showDatePickerStart = () => {
    this.setState(state => ({
      setDatePickerVisibilityStart: !state.setDatePickerVisibilityStart,
      isDatePickerVisibleStart: !state.isDatePickerVisibleStart,
    }))
  }
  hideDatePickerStart = () => {
    this.setState({
      setDatePickerVisibilityStart: false,
      isDatePickerVisibleStart: false,
    })
  }
  handleConfirmStart = date => {
    this.setState({
      startDate: moment(date).format('MMMM DD, YYYY'),
      startDateHolder: moment(date).format('YYYY-MM-DD'),
    })
    // console.warn('A date has been picked: ', this.state.startDate)
    this.hideDatePickerStart()
  }

  //------------------------------

  // --------END DATE-------------
  showDatePickerEnd = () => {
    this.setState(state => ({
      setDatePickerVisibilityEnd: !state.setDatePickerVisibilityEnd,
      isDatePickerVisibleEnd: !state.isDatePickerVisibleEnd,
    }))
  }

  hideDatePickerEnd = () => {
    this.setState({
      setDatePickerVisibilityEnd: false,
      isDatePickerVisibleEnd: false,
    })
  }

  handleConfirmEnd = date => {
    this.setState({
      endDate: moment(date).format('MMMM DD, YYYY'),
      endDateHolder: moment(date).format('YYYY-MM-DD'),
    })

    // console.warn('A date has been picked: ', this.state.startDate)
    this.hideDatePickerEnd()
  }
  // -----------------------------
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
                <Text style={styles.text}>MANAGE EVENTS</Text>
              </View>
            </View>

            {/* <View style={styles.viewStyleThree}> */}
            {/* <TextInput
                style={{
                  height: hp('5%'),
                  width: wp('80%'),
                  marginLeft: 10,
                }}></TextInput> */}
            <View style={styles.viewStyleThree}>
              <TextInput
                style={styles.textInputStyle}
                onChangeText={text => this.SearchFilterFunction(text)}
                value={this.state.text}
                // underlineColorAndroid='transparent'
                placeholder='Search Here'
              />
              <TouchableOpacity onPress={this.setSettingModal}>
                <Image
                  source={require('../assets/settings.png')}
                  style={{
                    height: hp('7%'),
                    width: wp('7%'),
                    resizeMode: 'contain',
                    marginLeft: 5,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.viewStyleFour}>
              <ActivityIndicator color='orange' />
            </View>
            <View>
              <TouchableOpacity
                onPress={this.setModal}
                style={{
                  marginTop: hp('-12%'),
                  marginLeft: wp('75%'),
                  backgroundColor: '#ff9501',
                  borderBottomLeftRadius: 20,
                  borderTopLeftRadius: 20,
                  height: 65,
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
          <Modal
            isVisible={this.state.visibleModal === 2}
            animationIn='fadeIn'
            animationOut='fadeOut'>
            {this.renderSettingModal()}
          </Modal>
          <Modal
            isVisible={this.state.visibleModal === 3}
            animationIn='fadeIn'
            animationOut='fadeOut'>
            {this.renderDataModal()}
          </Modal>

        </View>
      )
    } else {
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
              <TextInput
                style={styles.textInputStyle}
                onChangeText={text => this.SearchFilterFunction(text)}
                value={this.state.text}
                // underlineColorAndroid='transparent'
                placeholder='Search Here'
              />
              <TouchableOpacity onPress={this.setSettingModal}>
                <Image
                  source={require('../assets/settings.png')}
                  style={{
                    height: hp('7%'),
                    width: wp('7%'),
                    resizeMode: 'contain',
                    marginLeft: 5,
                  }}
                />
              </TouchableOpacity>
              {/* </View> */}
            </View>

            {/* </View> */}

            <View style={styles.viewStyleFour}>
              <FlatList
                data={this.state.dataSource}
                //dataSource to add data in the list
                ItemSeparatorComponent={this.ListViewItemSeparator}
                //List Item separator
                renderItem={({ item }) => (
                  //Rendering Single Row
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('98%'), borderWidth: 1, padding: 3, marginBottom: 5 }}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{}}>EVENT NAME</Text>

                      <Text style={{ fontWeight: 'bold', marginBottom: 5, fontSize: 20 }}>{item.event}</Text>
                      {/* <Text style={{ marginBottom: 5 }}>{item.start} to</Text>
                      <Text>{item.end}</Text> */}
                    </View>
                    <View style={{}}>
                      <Text style={{}}>STATUS</Text>

                      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.status}</Text>
                      <Text style={{}}>ROLE</Text>

                      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.role}</Text>

                    </View>


                    <TouchableOpacity
                      style={styles.rowViewContainer}
                      onPress={this.showItem.bind(
                        this,
                        item.event,
                        item.type,
                        item.start,
                        item.end,
                        item.status,
                        item.place,
                      )}>
                      <Text style={{ fontWeight: 'bold', color: 'white' }}>VIEW</Text>
                    </TouchableOpacity>
                  </View>
                )}

                keyExtractor={(item, index) => index.toString()}
              />
              {/* <FlatList
              data={this.state.dataSource}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              renderItem={({item}) => ( <TouchableOpacity
                style={styles.rowViewContainer}>
                <Text style={styles.textStyle}>{item.title}</Text>
                </TouchableOpacity>
              )}
              enableEmptySections={true}
              style={{marginTop: 10}}
              keyExtractor={(item, index) => index.toString()}
            /> */}
            </View>
            <View>
              <TouchableOpacity
                onPress={this.setModal}
                style={{
                  marginTop: hp('-12%'),
                  marginLeft: wp('75%'),
                  backgroundColor: '#ff9501',
                  borderBottomLeftRadius: 20,
                  borderTopLeftRadius: 20,
                  height: 65,
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
          <Modal
            isVisible={this.state.visibleModal === 2}
            animationIn='fadeIn'
            animationOut='fadeOut'>
            {this.renderSettingModal()}
          </Modal>
          <Modal
            isVisible={this.state.visibleModal === 3}
            animationIn='fadeIn'
            animationOut='fadeOut'>
            {this.renderDataModal()}
          </Modal>
        </View>
      )
    }
  }
  setModal = () => this.setState({ visibleModal: 1 })

  setSettingModal = () => this.setState({ visibleModal: 2 })

  setDataModal = () => this.setState({ visibleModal: 3 })

  renderSettingModal = () => (
    <View style={styles.modalContent}>
      <View
        style={{
          flexDirection: 'column',
          marginBottom: 5,
          // alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#008ECC',
            width: wp('90%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: hp('5%'),
            marginLeft: 2.2
          }}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: hp('3%'),
              color: 'white',
              marginLeft: 10,
              marginTop: 5,
            }}>
            Advanced Search
          </Text>
          <TouchableOpacity
            style={{
              // borderWidth: 1,
              // alignItems: 'center',
              // justifyContent: 'center',
              // backgroundColor: 'grey',
              marginTop: 5,
              marginRight: 10,
            }}
            onPress={this.renderButton}>
            <Text
              style={{ color: 'white', fontWeight: 'bold', fontSize: hp('3%') }}>
              X
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
            paddingLeft: 5,
          }}>
          <Text style={{}}>Event name</Text>
          <Text style={{}}>Event type</Text>
          <Text> </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            width: wp('90%'),
            height: hp('5%'),
            marginTop: 5, marginLeft: 5
          }}>
          <TextInput
            style={{
              width: wp('38%'),
              marginLeft: 5,
              height: hp('5%'),
            }}></TextInput>
          <RNPickerSelect
            placeholder={{
              label: 'Select an event...',
              value: null,
            }}
            items={this.state.items3}
            onValueChange={value => {
              this.setState({
                eventType: value,
              })
            }}
            onUpArrow={() => {
              this.inputRefs.picker.togglePicker()
            }}
            onDownArrow={() => {
              this.inputRefs.company.focus()
            }}
            style={{ ...pickerSelectStyles }}
            value={this.state.eventType}
            ref={el => {
              this.inputRefs.picker2 = el
            }}
            useNativeAndroidPickerStyle={true} //android only
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
            paddingLeft: 5,
          }}>
          <Text style={{}}>From</Text>
          <Text style={{}}>To</Text>
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
          <TouchableOpacity
            onPress={this.showDatePickerStart}
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              width: wp('45%'),
            }}>
            <Text>
              {this.state.startDate}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.showDatePickerEnd}
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              width: wp('45%'),
            }}>
            <Text>
              {this.state.endDate}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
            paddingLeft: 5,
          }}>
          <Text style={{}}>Role</Text>
          <Text style={{}}>Status</Text>
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
          <RNPickerSelect
            placeholder={{
              label: 'Select a role...',
              value: null,

            }}
            items={this.state.items2}
            onValueChange={value => {
              this.setState({
                eventName: value,
              })
            }}
            onUpArrow={() => {
              this.inputRefs.picker.togglePicker()
            }}
            onDownArrow={() => {
              this.inputRefs.company.focus()
            }}
            style={{ ...pickerSelectStyles }}
            value={this.state.eventName}
            ref={el => {
              this.inputRefs.picker2 = el
            }}
            useNativeAndroidPickerStyle={true} //android only
          />
          <RNPickerSelect
            placeholder={{
              label: 'Select a status...',
              value: null,

            }}
            items={this.state.items4}
            onValueChange={value => {
              this.setState({
                statusName: value,
              })
            }}
            onUpArrow={() => {
              this.inputRefs.picker.togglePicker()
            }}
            onDownArrow={() => {
              this.inputRefs.company.focus()
            }}
            style={{ ...pickerSelectStyles }}
            value={this.state.statusName}
            ref={el => {
              this.inputRefs.picker2 = el
            }}
            useNativeAndroidPickerStyle={true} //android only
          />

        </View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            marginTop: 5,
            // backgroundColor:'grey',
            // width:wp('35%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              // borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'orange',
              borderRadius: 5,
              padding: 5,
              marginTop: 5,
              width: wp('50%'),
            }}
            onPress={this.renderButton}>
            <Text style={{ color: 'white' }}>SEARCH</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={this.state.isDatePickerVisibleStart}
        mode='date'
        onConfirm={this.handleConfirmStart}
        onCancel={this.hideDatePickerStart}
        minimumDate={new Date('1990-01-01')}
        date={moment().toDate()}
        maximumDate={new Date('2999-12-31')}
      />
      {/* Datepicker of End */}
      <DateTimePickerModal
        isVisible={this.state.isDatePickerVisibleEnd}
        mode='date'
        onConfirm={this.handleConfirmEnd}
        onCancel={this.hideDatePickerEnd}
        minimumDate={new Date(this.state.startDateHolder)}
        date={moment().toDate()}
        maximumDate={new Date('2999-12-31')}
      />
    </View>
  )

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View
        style={{
          flexDirection: 'column',
          marginBottom: 5,
          // alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#008ECC',
            width: wp('90%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: hp('5%'),
          }}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: hp('3.5%'),
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
              marginRight: 10,
            }}
            onPress={this.renderButton}>
            <Text
              style={{ color: 'white', fontWeight: 'bold', fontSize: hp('3%') }}>
              X
            </Text>
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
          <RNPickerSelect
            placeholder={{
              label: 'Select an event...',
              value: null,
            }}
            items={this.state.items}
            onValueChange={value => {
              this.setState({
                selectEvent: value,
              })
            }}
            onUpArrow={() => {
              this.inputRefs.name.focus()
            }}
            onDownArrow={() => {
              this.inputRefs.picker2.togglePicker()
            }}
            style={{ ...pickerSelectStyles }}
            value={this.state.selectEvent}
            ref={el => {
              this.inputRefs.picker = el
            }}
            useNativeAndroidPickerStyle={false} //android only
          // hideIcon={true}
          />
          <TextInput
            style={{
              width: wp('45%'),
              marginLeft: 5,
              height: hp('5%'),
            }}></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 5,

            // backgroundColor: 'grey',
          }}>
          <Text style={{ marginLeft: 5 }}>Event Description</Text>
          <TextInput
            style={{
              width: wp('86%'),
              height: hp('5%'),
              marginLeft: 5,
            }}></TextInput>
          <Text style={{ marginLeft: 5 }}>Venue</Text>
          <TextInput
            style={{
              width: wp('86%'),
              height: hp('5%'),
              marginLeft: 5,
            }}></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            marginTop: 5,
            // backgroundColor:'grey',
            // width:wp('35%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              // borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'orange',
              borderRadius: 5,
              padding: 5,
              marginTop: 5,
              width: wp('50%'),
            }}
            onPress={this.createEvent}>
            <Text style={{ color: 'white' }}>CREATE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
  renderDataModal = () => (
    <View style={styles.modalContent}>
      <View
        style={{
          flexDirection: 'column',
          marginBottom: 5,
          // alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#008ECC',
            width: wp('90%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: hp('5%'),
          }}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: hp('3%'),
              color: 'white',
              marginLeft: 10,
              marginTop: 5,
            }}>
            {this.state.cellType}
          </Text>
          <TouchableOpacity
            style={{
              // borderWidth: 1,
              // alignItems: 'center',
              // justifyContent: 'center',
              // backgroundColor: 'grey',
              marginTop: 5,
              marginRight: 10,
            }}
            onPress={this.renderButton}>
            <Text
              style={{ color: 'white', fontWeight: 'bold', fontSize: hp('3%') }}>
              X
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            marginTop: 5,
            paddingLeft: 5,
          }}>
          <View style={{ flexDirection: 'column', marginRight: wp('8%') }}>
            <Text style={{ fontSize: hp('2%'), margin: 3 }}>WHAT:</Text>
            <Text style={{ fontSize: hp('2%'), margin: 3 }}>WHERE:</Text>

            <Text style={{ fontSize: hp('2%'), margin: 3 }}>WHEN:</Text>
            <Text style={{ fontSize: hp('2%'), margin: 3 }}></Text>

            <Text style={{ fontSize: hp('2%'), margin: 3, marginTop: 6 }}>
              WHO:
            </Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: hp('2%'), margin: 3 }}>
              {this.state.cellEvent}
            </Text>
            <Text style={{ fontSize: hp('2%'), margin: 3 }}>
              {this.state.cellPlace}
            </Text>
            <Text style={{ fontSize: hp('2%'), margin: 3 }}>
              {this.state.cellStart} to
            </Text>
            <Text style={{ fontSize: hp('2%'), margin: 3 }}>
              {this.state.cellEnd}
            </Text>
            {respo.map((item, key) => (
              <Text key={key} style={{ fontSize: hp('2%'), marginTop: 3 }}>
                {item}
              </Text>
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            marginTop: 5,
            // backgroundColor:'grey'
          }}>
          <TouchableOpacity
            style={{
              // borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'grey',
              marginTop: 5,
              marginLeft: wp('60%'),
              backgroundColor: 'orange',
              width: wp('25%'),
              borderRadius: 5,
              padding: 2,
            }}
            onPress={this.AddItemsToArray}>
            {/* // onPress={this.renderButton}> */}
            <Text style={{ color: 'white', fontSize: 20 }}>JOIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

AddItemsToArray = () => {
  //Adding Items To Array.
  respo.push(holder)
  alert(respo)
  // Showing the complete Array on Screen Using Alert.
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
    height: hp('5%'), // 70% of height device screen
    width: wp('100%'),
    // backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // backgroundColor: '#ededed',
    // flexDirection: 'row',
    marginTop: 5,
  },
  viewStyleFour: {
    height: hp('80%'), // 70% of height device screen
    width: wp('100%'),
    // backgroundColor: 'grey',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ededed',
    // flexDirection: 'row',
    marginTop: 5,
  },

  rowViewContainer: {
    padding: 8,
    fontSize: 18,
    height: 40,
    // borderWidth: .5,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange'
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
  textStyle: {
    padding: 10,
  },
  textInputStyle: {
    borderWidth: 1,
    // paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
    width: wp('88%'),
    height: 30,
    marginLeft: 5,
  },
  viewStyle: {
    // justifyContent: 'center',
    // flex: 1,
    // marginTop: 40,
    // padding: 16,
  },
})
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    // paddingTop: 13,
    // paddingHorizontal: 10,
    // paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    width: wp('40%'),
    marginLeft: 5,
    height: hp('5%')

  },
})

