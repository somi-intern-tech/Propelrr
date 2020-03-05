import React, { Component, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native'
import { DrawerActions } from 'react-navigation-drawer'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import moment from 'moment'
import Modal from 'react-native-modal'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}
LocaleConfig.defaultLocale = 'en'

export default class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
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
      items: {},
      clickedDate: '',
      visibleModal: null,
      visibleModalT2: null,
      isVisibleT1: true,
      pressedDate: 0,
      isDatePickerVisibleStart: false,
      setDatePickerVisibilityStart: false,
      isDatePickerVisibleEnd: false,
      setDatePickerVisibilityEnd: false,
      pickerdate: '',
      startDate: moment().format('MMMM DD, YYYY'),
      currentDate: moment().format('YYYY-MM-DD'),
      handlerDate: '',
      endDate: 'End Date',
      confirmID: null,
      handle: '',
      startDateFuture: null,
      endColor: 'grey',
      marked: null,
      nextDay: [],
      array: [],
      endDateHolder: '',
      startDateHolder: '',
      eventHolder: [],
      dataSource: null,
      dateValue: '',
      eventType: '',
      isLoading: true,
      reason: ''
    }
  }

  async componentDidMount() {
    var that = this
    var date = new Date().getDate() //Current Date
    var year = new Date().getFullYear() //Current Year
    that.setState({
      //Setting the value of the date time
      date: date + ', ' + year,
    })
    // try {
    //   const response = await fetch('http://www.amock.io/api/intern/calendar')
    //   const responseJson = await response.json()
    //   this.setState({            
    //     isLoading: false,
    //     dataSource: responseJson.dates,    
    //   })
    // }
    // catch (error) {
    //   console.log(error)
    // }
  }
  markedDate = () => {
    if (this.state.endDate == 'End Date' || this.state.reason == '') {
      alert('please fill up fields')
    }
    else {
      this.setState({ visibleModal: null, isVisibleT1: true, visibleModalT2: false, isVisibleT2: false, endDate: 'End Date', endColor: 'grey', })
    }
    //   // alert("yo")

    //   this.state.dataSource.map(val => {
    //     // this.setState({ marked: this.state.startDate.reduce((c, v) => Object.assign(c, { [v]: { selected: true, selectedColor: 'orange' } }), {}) })
    //     const result = Object.values(val.events).length
    //     if (result == 1) {
    //       {
    //         this.singleEvent()
    //       }
    //     } else if (result > 1) {
    //       {
    //         this.multiEvents()
    //       }
    //     }
    //   })
  }
  // multiEvents = () => {
  //   this.state.dataSource.map(val => {
  //     this.setState({
  //       // dateValue: val.events,
  //       // nextDay: this.state.nextDay.push(this.dateValue),
  //       marked: val.events.reduce(
  //         (c, v) => Object.assign(c, {[v]: {periods: [{color: 'blue'}]}}),
  //         {},
  //       ),
  //       eventType: 'multi-period',
  //     })
  //   })
  // }
  // singleEvent = () => {
  //   this.state.dataSource.map(val => {
  //     this.setState({
  //       // dateValue: val.events,
  //       // nextDay: this.state.nextDay.push(this.dateValue),
  //       marked: val.events.reduce(
  //         (c, v) => Object.assign(c, {[v]: {marked: true, color: 'blue'}}),
  //         {},
  //       ),
  //       eventType: '',
  //     })
  //   })
  // }
  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={{ color: 'white', fontSize: 25 }}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
  ToggleFunction = () => {
    this.setState(state => ({
      // isVisibleT1: true,
      isVisibleT1: !state.isVisibleT1,
      isVisibleT2: !state.isVisibleT2,
    }))
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
  handleConfirmStartPast = date => {
    this.setState({
      startDate: moment(date).format('MMMM DD, YYYY'),
      startDateHolder: moment(date).format('YYYY-MM-DD'),
    })

    // console.warn('A date has been picked: ', this.state.startDate)
    this.hideDatePickerStart()
  }
  handleConfirmStartFuture = date => {
    this.setState({
      startDateFuture: moment(date).format('MMMM DD, YYYY'),
      startDateHolder: moment(date).format('YYYY-MM-DD'),
    })

    // console.warn('A date has been picked: ', this.state.startDate)
    this.hideDatePickerStart()
  }

  //-----------------------------

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
      endColor: 'black',
      endDateHolder: moment(date).format('YYYY-MM-DD'),
    })

    // console.warn('A date has been picked: ', this.state.startDate)
    this.hideDatePickerEnd()
  }
  // -----------------------------

  condition = () => {
    if (moment().format('YY MM DD') > this.state.pressedDate) {
      //return to current date
      //past
      return (
        <View>
          <Text style={{ paddingBottom: 10 }}>FROM</Text>
          <TouchableOpacity
            onPress={this.showDatePickerStart}
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text>{this.state.startDate}</Text>
          </TouchableOpacity>

          <Text style={{ paddingTop: 10, paddingBottom: 10 }}>TO</Text>

          <TouchableOpacity
            onPress={this.showDatePickerEnd}
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text style={{ color: this.state.endColor }}>
              {this.state.endDate}
            </Text>
          </TouchableOpacity>

          {/* Datepicker of Start */}
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisibleStart}
            mode='date'
            onConfirm={this.handleConfirmStartFuture}
            onCancel={this.hideDatePickerStart}
            minimumDate={moment().toDate()}
            date={new Date(this.state.startDate)}
            maximumDate={new Date('2999-12-31')}
          />
          {/* Datepicker of End */}
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisibleEnd}
            mode='date'
            onConfirm={this.handleConfirmEnd}
            onCancel={this.hideDatePickerEnd}
            minimumDate={new Date(this.state.startDateFuture)}
            date={new Date(this.state.startDateFuture)}
            maximumDate={new Date('2999-12-31')}
          // date={new Date(this.state.endDate)}
          />
        </View>
      )
    } else {
      // future

      return (
        <View>
          <Text style={{ paddingBottom: 10 }}>FROM</Text>
          <TouchableOpacity
            onPress={this.showDatePickerStart}
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text>{this.state.startDateFuture}</Text>
          </TouchableOpacity>

          <Text style={{ paddingTop: 10, paddingBottom: 10 }}>TO</Text>

          <TouchableOpacity
            onPress={this.showDatePickerEnd}
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text style={{ color: this.state.endColor }}>
              {this.state.endDate}
            </Text>
          </TouchableOpacity>

          {/* Datepicker of Start */}
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisibleStart}
            mode='date'
            onConfirm={this.handleConfirmStartFuture}
            onCancel={this.hideDatePickerStart}
            minimumDate={moment().toDate()}
            date={new Date(this.state.startDateFuture)}
            maximumDate={new Date('2999-12-31')}
          />
          {/* Datepicker of End */}
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisibleEnd}
            mode='date'
            onConfirm={this.handleConfirmEnd}
            onCancel={this.hideDatePickerEnd}
            minimumDate={new Date(this.state.startDateFuture)}
            date={new Date(this.state.startDateFuture)}
            maximumDate={new Date('2999-12-31')}
          // date={new Date(this.state.endDate)}
          />
        </View>
      )
    }
  }

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <View style={{ alignItems: 'center', flexDirection: 'row', margin: 10 }}>
          <Image
            source={require('../assets/calendar.png')}
            style={{ height: 23, width: 23 }}
          />
          <Text style={{ fontSize: hp('3%'), paddingLeft: 4, color: 'white', fontSize: 25 }}>
            {this.state.clickedDate}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end'}}>
          {this.renderButton('X', () =>
            this.setState({
              visibleModal: null,
              isVisibleT1: true,
              visibleModalT2: false,
              isVisibleT2: false,
              endDate: 'End Date',
              endColor: 'grey',
            }),
          )}
        </View>
      </View>

      {this.state.isVisibleT2 ? (
        <View
          style={{ width: '90%', justifyContent: 'flex-start', marginTop: 20, margin: 15 }}>
          {this.condition()}

          <TextInput
            value={this.state.reason}
            placeholder='Reason...'
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              width: '100%',
              marginTop: 8,
            }}
            multiline={true}
            allowFontScaling={true}
            number={10}
          />
        </View>
      ) : null}

      {this.state.isVisibleT2 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            margin: 15,
          }}>
          <View
            style={
              ([styles.modalFooter],
              {
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                backgroundColor: '#ff9800',
              })
            }>
            <TouchableOpacity onPress={this.markedDate}>
              <Text style={{ fontSize: 16, padding: 8, color: 'white' }}>
                SUBMIT REQUEST
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              ([styles.modalFooter],
              {
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                backgroundColor: '#A9A9A9',
              })
            }>
            <TouchableOpacity onPress={this.ToggleFunction}>
              <Text style={{ fontSize: 16, padding: 8, color: 'white' }}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {this.state.isVisibleT1 ? (
        <View style={[styles.modalFooter]}>
          <View style={{ height: 150 }}></View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              backgroundColor: '#ff9800',
            }}
            onPress={this.ToggleFunction}>
            <Text style={{ fontSize: 16, padding: 8, color: 'white' }}>
              REQUEST LEAVE
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  )

  render() {
    const intime = this.props.navigation.getParam('timein', 'nothing sent')
    const outputDate = moment().format('YYYY-MM-DD')
    const d = new Date()
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    var dayName = days[d.getDay()]
    // {
    //   if (this.state.isLoading) {
    //     return (
    //       <View style={styles.maincontainer}>
    //         <View style={styles.container}>
    //           <View style={styles.container1}>
    //             <View style={styles.viewStyleOne}>
    //               <TouchableHighlight
    //                 onPress={() =>
    //                   this.props.navigation.dispatch(DrawerActions.openDrawer())
    //                 }
    //                 style={styles.touchableHighlight}
    //                 underlayColor={'rgba(0,0,0,0.8)'}>
    //                 <Image
    //                   source={require('../assets/menu.png')}
    //                   style={{height: 30, width: 30}}
    //                 />
    //               </TouchableHighlight>
    //             </View>

    //             <View style={styles.viewStyleTwo}>
    //               <Text style={styles.text}>HOME</Text>
    //             </View>
    //           </View>

    //           <View style={styles.container3}>
    //             <ActivityIndicator color='orange' />
    //           </View>
    //         </View>
    //       </View>
    //     )
    //   } else {
    //     this.markedDate()
    //   }
    // }
    // if (this.state.isLoading) {
    // return (
    //     <View style={styles.maincontainer}>
    //       <View style={styles.container}>
    //         <View style={styles.container1}>
    //           <View style={styles.viewStyleOne}>
    //             <TouchableHighlight
    //               onPress={() =>
    //                 this.props.navigation.dispatch(DrawerActions.openDrawer())
    //               }
    //               style={styles.touchableHighlight}
    //               underlayColor={'rgba(0,0,0,0.8)'}>
    //               <Image
    //                 source={require('../assets/menu.png')}
    //                 style={{height: 30, width: 30}}
    //               />
    //             </TouchableHighlight>
    //           </View>
    //           <View style={styles.viewStyleTwo}>
    //             <Text style={styles.text}>HOME</Text>
    //           </View>
    //         </View>
    //         <View style={styles.container3}>
    //           <ActivityIndicator color='orange' />
    //         </View>
    //       </View>
    //     </View>
    //   )
    // } 
    // else {
    // if (this.state.showForm === 0) {
    return (
      <View style={styles.maincontainer}>
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
                  style={{ height: 30, width: 30 }}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.viewStyleTwo}>
              <Text style={styles.text}>HOME</Text>
            </View>
            <View style={styles.viewStyleThree}>
              {/* <Text style={styles.textStyle}> 3 </Text> */}
            </View>
          </View>
        </View>
        {/* ----------------CALENDAR---------------------- */}
        <View style={styles.container2}>
          <View
            style={{
              width: wp('100%'),
              height: hp('5%'),
              backgroundColor: '#008ECC',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                color: 'white',
              }}>
              {dayName +
                ', ' +
                monthNames[d.getMonth()] +
                ' ' +
                this.state.date}
            </Text>
          </View>
          <Modal isVisible={this.state.visibleModal === 1}>
            {this.renderModalContent()}
          </Modal>
          <View style={styles.calendarContainer}>
            <Calendar
              // Handler which gets executed on day press. Default = undefined
              onDayPress={day => {
                this.setState({
                  visibleModal: 1,
                  clickedDate: moment(day.dateString).format(
                    'MMMM DD, YYYY',
                  ),
                  pressedDate: moment(day.dateString).format('YY MM DD'),
                  pickerdate: moment(day.dateString).toDate(),
                  startDateFuture: moment(day.dateString).format(
                    'MMMM DD, YYYY',
                  ),
                  startDateHolder: moment(day.dateString).format(
                    'YYYY-MM-DD',
                  ),
                })
              }}
              // onDayPress={(day) => { datePressed = day }}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={day => {
                console.log('selected day', day)
              }}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={month => {
                console.log('month changed', month)
              }}
              markedDates={{
                [this.state.currentDate]: { selected: true, selectedColor: '#008ECC' },
              }}
              // markedDates={this.state.marked}
              markingType={this.state.eventType}
              style={{
                width: wp('95%'),
              }}
              // Specify theme properties to override specific styles for calendar parts. Default = {}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: 'black',
                selectedDayBackgroundColor: '#ff9800',
                // selectedDayTextColor: 'blue',
                todayTextColor: 'white',
                dayTextColor: 'black',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'black',
                monthTextColor: 'grey',
                indicatorColor: 'grey',
                textDayFontFamily: 'Arial',
                textMonthFontFamily: 'Arial',
                textDayHeaderFontFamily: 'Arial',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: hp('2%'),
                textMonthFontSize: hp('2.3%'),
                textDayHeaderFontSize: hp('1.8%'),
                'stylesheet.calendar.header': {
                  week: {
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                  },
                },
              }}
            />
          </View>

          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <Text style={{ marginVertical: 5 }}>LEGENDS:</Text>
            <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    backgroundColor: 'pink',
                    height: 15,
                    width: 15,
                    borderRadius: 15,
                  }}></View>
                <Text> Holiday</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    backgroundColor: 'orange',
                    height: 15,
                    width: 15,
                    borderRadius: 15,
                  }}></View>
                <Text> Internal Event</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    backgroundColor: 'yellow',
                    height: 15,
                    width: 15,
                    borderRadius: 15,
                  }}></View>
                <Text> Meeting</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    backgroundColor: 'blue',
                    height: 15,
                    width: 15,
                    borderRadius: 15,
                  }}></View>
                <Text> Vacation Leave</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    backgroundColor: 'grey',
                    height: 15,
                    width: 15,
                    borderRadius: 15,
                  }}></View>
                <Text> Out of the Office Access</Text>
              </View>

            </View>
          </View>
        </View>
      </View>
    )
  }
}
//   }
// }

const styles = StyleSheet.create({
  view: {
    flex: 65,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  open: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },

  button: {
    // backgroundColor: '#A9A9A9',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    // padding: 22,
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 'auto',
    justifyContent: 'space-between',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#008ECC',

  },
  modalFooter: {
    justifyContent: 'flex-end',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

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
  container3: {
    width: wp('100%'),
    // flexGrow:hp('100%'),
    // marginTop: '9%', // 70% of height device screen
    height: hp('90%'),
    // backgroundColor: 'yellow',
    // marginTop:50,
    alignItems: 'center',
    justifyContent: 'center',
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
  text: {
    fontSize: 24,
    color: '#008ECC',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  calendarContainer: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
