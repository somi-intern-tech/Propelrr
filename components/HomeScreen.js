import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image, Alert } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { LocaleConfig } from 'react-native-calendars';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from "moment"

LocaleConfig.locales['en'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    // today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'en';

export default class HomeScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => (
            <Image source={require('../assets/propelrr.png')} style={{ height: 30, width: 30 }} />
        ),
    }
    constructor(props) {
        super(props);

        this.state = {
            items: {},
            datess: '',
            time: ''
        };
    }
    GetTime() {

        // Creating variables to hold time.
        var date, TimeType, hour, minutes, seconds, fullTime;

        // Creating Date() function object.
        date = new Date();

        // Getting current hour from Date object.
        hour = date.getHours();

        // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
        if (hour <= 11) {

            TimeType = 'AM';

        }
        else {

            // If the Hour is Not less than equals to 11 then Set the Time format as PM.
            TimeType = 'PM';

        }
        // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
        if (hour > 12) {
            hour = hour - 12;
        }
        // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format. 
        if (hour == 0) {
            hour = 12;
        }
        // Getting the current minutes from date object.
        minutes = date.getMinutes();

        // Checking if the minutes value is less then 10 then add 0 before minutes.
        if (minutes < 10) {
            minutes = '0' + minutes.toString();
        }

        //Getting current seconds from date object.
        seconds = date.getSeconds();

        // If seconds value is less than 10 then add 0 before seconds.
        if (seconds < 10) {
            seconds = '0' + seconds.toString();
        }
        // Adding all the variables in fullTime variable.
        fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();
        // Setting up fullTime variable in State.
        this.setState({
            time: fullTime
        });
    }


    componentDidMount() {
        this.Clock = setInterval(() => this.GetTime(), 1000);
        var that = this;

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        that.setState({
            //Setting the value of the date time
            date:
                date + ',' + year,
        });
    }

    componentWillUnmount() {
        clearInterval(this.Clock);
    }
    render() {
        const intime = this.props.navigation.getParam('timein', 'nothing sent');
        const datePressed = ""
        const outputDate = moment().format("YYYY-MM-DD")
        const d = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayName = days[d.getDay()];
        return (
            <View style={styles.view}>
                {/* <Text>{intime}</Text> */}
                <TouchableHighlight onPress={() =>
                    this.props.navigation.dispatch(DrawerActions.openDrawer(), { timein: intime })}
                    style={styles.touchableHighlight} underlayColor={'rgba(0,0,0,0.8)'}>
                    <Image source={require('../assets/menu.png')} style={{ height: 30, width: 30 }} />
                </TouchableHighlight>
                <View style={{ width: 380, height: 40, backgroundColor: '#008ECC', justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 25,
                            color: 'white',
                        }}>
                        {dayName + ', ' + monthNames[d.getMonth()] + ' ' + this.state.date}
                    </Text>
                </View>
                <Calendar
                    // Initially visible month. Default = Date()
                    current={Date()}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => { console.log('selected day', day) }}
                    // onDayPress={(day) => { datePressed = day }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => { console.log('selected day', day) }}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => { console.log('month changed', month) }}
                    markedDates={{
                        [outputDate]: { selected: true, selectedColor: 'blue' },
                        // [datePressed]: {selected: true, selectedColor: 'blue' }
            }}
                    style={{
                    height: 350,
                    width: 350,
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
                            justifyContent: 'space-between'
                        }

                    }
                }}
                />
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
    },
    container: {
        height: 500
    },
});