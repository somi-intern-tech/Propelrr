import React, {Component, useState} from 'react'
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
} from 'react-native'
import {DrawerActions} from 'react-navigation-drawer'
import {LocaleConfig} from 'react-native-calendars'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import moment from 'moment'
import Modal from 'react-native-modal'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

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
        style={{height: 30, width: 30}}
      />
    ),
  }
  constructor (props) {
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
      handlerDate: '',
      endDate: "End Date",
      confirmID: null,
      handle: '',
      startDateFuture: null,
      endColor: 'grey'
    }
  }

  componentDidMount () {
    var that = this

    var date = new Date().getDate() //Current Date
    var year = new Date().getFullYear() //Current Year
    that.setState({
      //Setting the value of the date time
      date: date + ',' + year,
    })
  }
  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={{color: 'white'}}>{text}</Text>
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
    this.setState({startDate: moment(date).format('MMMM DD, YYYY')})

    // console.warn('A date has been picked: ', this.state.startDate)
    this.hideDatePickerStart()
  }
  handleConfirmStartFuture = date => {
    this.setState({startDateFuture: moment(date).format('MMMM DD, YYYY')})

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
    this.setState({endDate: moment(date).format('MMMM DD, YYYY'),endColor: 'black'})

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
          <Text style={{paddingBottom: 10}}>FROM</Text>
          <TouchableOpacity
            onPress={this.showDatePickerStart}
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text>{this.state.startDate}</Text>
          </TouchableOpacity>

          <Text style={{paddingTop: 10, paddingBottom: 10}}>TO</Text>

          <TouchableOpacity
            onPress={this.showDatePickerEnd}
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text style={{color: this.state.endColor}}>{this.state.endDate}</Text>
          </TouchableOpacity>

          {/* Datepicker of Start */}
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisibleStart}
            mode='date'
            onConfirm={this.handleConfirmStartFuture}
            onCancel={this.hideDatePickerStart}
            minimumDate={moment().toDate()}
            date={new Date(this.state.pickerdate)}
          />
          {/* Datepicker of End */}
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisibleEnd}
            mode='date'
            onConfirm={this.handleConfirmEnd}
            onCancel={this.hideDatePickerEnd}
            minimumDate={new Date(this.state.startDateFuture)}
            // date={new Date(this.state.endDate)}
          />
        </View>
      )
    } else {
      // future

      return (
        <View>
          <Text style={{paddingBottom: 10}}>FROM</Text>
          <TouchableOpacity
            onPress={this.showDatePickerStart}
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text>{this.state.startDateFuture}</Text>
          </TouchableOpacity>

          <Text style={{paddingTop: 10, paddingBottom: 10}}>TO</Text>

          <TouchableOpacity
            onPress={this.showDatePickerEnd}
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text style={{color: this.state.endColor}}>{this.state.endDate}</Text>
          </TouchableOpacity>

          {/* Datepicker of Start */}
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisibleStart}
            mode='date'
            onConfirm={this.handleConfirmStartFuture}
            onCancel={this.hideDatePickerStart}
            minimumDate={moment().toDate()}
            date={new Date(this.state.pickerdate)}
          />
          {/* Datepicker of End */}
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisibleEnd}
            mode='date'
            onConfirm={this.handleConfirmEnd}
            onCancel={this.hideDatePickerEnd}
            minimumDate={new Date(this.state.startDateFuture)}
            // date={new Date(this.state.endDate)}
          />
        </View>
      )
    }
  }

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Image
            source={require('../assets/calendar.png')}
            style={{height: 23, width: 23}}
          />
          <Text style={{fontSize: 22, paddingLeft: 4}}>
            {this.state.clickedDate}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          {this.renderButton('CLOSE', () =>
            this.setState({
              visibleModal: null,
              isVisibleT1: true,
              visibleModalT2: false,
              isVisibleT2: false,
              endDate: 'End Date',
              endColor: 'grey'
            }),
          )}
        </View>
      </View>

      {this.state.isVisibleT2 ? (
        <View
          style={{width: '100%', justifyContent: 'flex-start', marginTop: 20}}>
          {/* <Modal isVisible={this.state.visibleModalT2 === 2} style={styles.bottomModal}> */}
          {/* {this.datePicker()} */}

          {this.condition()}

          <TextInput
            placeholder='Reason...'
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              width: '100%',
              marginTop: 8,
            }}
            multiline={true}
          />
        </View>
      ) : null}

      {this.state.isVisibleT2 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
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
            <TouchableOpacity
            // onPress={}
            >
              <Text style={{fontSize: 16, padding: 8, color: 'white'}}>
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
              <Text style={{fontSize: 16, padding: 8, color: 'white'}}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {this.state.isVisibleT1 ? (
        <View style={[styles.modalFooter]}>
          <View style={{height: 150}}></View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              backgroundColor: '#ff9800',
            }}
            onPress={this.ToggleFunction}>
            <Text style={{fontSize: 16, padding: 8, color: 'white'}}>
              REQUEST LEAVE
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  )

  // btnDate = () => {
  //   // this.setState({
  //   //     visibleModal: false,isDatePickerVisible:false,setDatePickerVisibility:false
  //   // })

  //   const showDatePicker = () => {
  //     this.setState({setDatePickerVisibility: true, isDatePickerVisible: true})
  //   }

  //   const hideDatePicker = () => {
  //     this.setState({
  //       setDatePickerVisibility: false,
  //       isDatePickerVisible: false,
  //     })
  //   }

  //   const handleConfirm = date => {
  //     console.warn('A date has been picked: ', date)
  //     hideDatePicker()
  //   }

  //   return (
  //     <View>
  //       <Text style={{paddingBottom: 10}}>FROM</Text>
  //       {this.condition()}
  //       <Text style={{paddingTop: 10, paddingBottom: 10}}>TO</Text>

  //       <TouchableOpacity
  //         onPress={showDatePicker}
  //         style={{
  //           borderBottomColor: '#000000',
  //           borderBottomWidth: 1,
  //           width: '100%',
  //         }}>
  //         <Text style={{color: 'gray'}}> End date</Text>
  //       </TouchableOpacity>
  //       <DateTimePickerModal
  //         isVisible={this.state.isDatePickerVisible}
  //         mode='date'
  //         onConfirm={handleConfirm}
  //         onCancel={hideDatePicker}
  //         minimumDate={this.state.pickerdate}
  //       />
  //     </View>
  //   )
  // }

  render () {
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

    return (
      <View style={styles.view}>
        {/* <Text>{intime}</Text> */}
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.openDrawer(), {
              timein: intime,
            })
          }
          style={styles.touchableHighlight}
          underlayColor={'rgba(0,0,0,0.8)'}>
          <Image
            source={require('../assets/menu.png')}
            style={{height: 30, width: 30}}
          />
        </TouchableHighlight>
        <View
          style={{
            width: '100%',
            height: 40,
            backgroundColor: '#008ECC',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              color: 'white',
            }}>
            {dayName + ', ' + monthNames[d.getMonth()] + ' ' + this.state.date}
          </Text>
        </View>
        <Modal isVisible={this.state.visibleModal === 1}>
          {this.renderModalContent()}
        </Modal>

        <Calendar
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            this.setState({
              visibleModal: 1,
              clickedDate: moment(day.dateString).format('MMMM DD, YYYY'),
              pressedDate: moment(day.dateString).format('YY MM DD'),
              pickerdate: moment(day.dateString).toDate(),
              startDateFuture: moment(day.dateString).format('MMMM DD, YYYY'),
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
            [outputDate]: {selected: true, selectedColor: 'orange'},
            // [datePressed]: {selected: true, selectedColor: 'blue' }
          }}
          style={{
            width: '90%',
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
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 15,
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            },
          }}
        />
      </View>
    )
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
    color: 'purple',
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
    fontWeight: 'bold',
  },
  container: {
    height: 500,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#A9A9A9',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 'auto',
    justifyContent: 'space-between',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalFooter: {
    justifyContent: 'flex-end',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})
