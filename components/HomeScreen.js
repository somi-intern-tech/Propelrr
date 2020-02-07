import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image, Alert, TextInput, Button } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { LocaleConfig } from 'react-native-calendars';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from "moment"
import Modal from 'react-native-modal';

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
            clickedDate: '',
            visibleModal: null,
            isVisible: true
            // modalVisible: false,
        };
    }



    componentDidMount() {
        var that = this;

        var date = new Date().getDate(); //Current Date
        var year = new Date().getFullYear(); //Current Year
        that.setState({
            //Setting the value of the date time
            date:
                date + ',' + year,
        });
    }
    renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={{ color: 'white' }}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
    ToggleFunction = () => {

        this.setState(state => ({

            isVisible: !state.isVisible,
            isInvisible: !state.isInvisible
        }));

    };

    renderModalContent = () => (
        <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Image source={require('../assets/calendar.png')} style={{ height: 23, width: 23 }} />
                    <Text style={{ fontSize: 22, paddingLeft: 4 }}>
                        {this.state.clickedDate}
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    {this.renderButton('CLOSE', () => this.setState({ visibleModal: null }))}
                </View>
            </View>
            {
                this.state.isInvisible ?
                    <View style={{ width: '100%', justifyContent: 'flex-start', marginTop: 20 }}>
                        <Text style={{paddingBottom: 10}}>FROM</Text>
                        <TextInput
                            placeholder="Start Date"
                            style={{ borderBottomColor: '#000000', borderBottomWidth: 1, width: '100%', marginBottom: 20 }}
                        />
                        <Text style={{paddingBottom: 10}}>TO</Text>
                        <TextInput
                            placeholder="End Date"
                            style={{ borderBottomColor: '#000000', borderBottomWidth: 1, width: '100%', marginBottom: 40 }}
                        />
                        <TextInput
                            placeholder="Reason..."
                            style={{ borderBottomColor: '#000000', borderBottomWidth: 1, width: '100%' }}
                        />

                    </View>

                    : null

            }
            {
                this.state.isInvisible ?
                <View>
                    <View style={[styles.modalFooter], { alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#ff9800', }}>
                        <TouchableOpacity
                            // onPress={}
                        >

                            <Text style={{ fontSize: 16, padding: 8, color: 'white' }}>
                                SUBMIT REQUEST
                             </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.modalFooter], { alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#A9A9A9', }}>
                    <TouchableOpacity
                        onPress={this.ToggleFunction}
                    >

                        <Text style={{ fontSize: 16, padding: 8, color: 'white' }}>
                            CANCEL
                         </Text>
                    </TouchableOpacity>
                </View>
                </View>
                    : null

            }
            {

                this.state.isVisible ?
                    <View style={[styles.modalFooter], { alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#ff9800', }}>
                        <TouchableOpacity
                            onPress={this.ToggleFunction}
                        >

                            <Text style={{ fontSize: 16, padding: 8, color: 'white' }}>
                                REQUEST LEAVE
                             </Text>
                        </TouchableOpacity>
                    </View>
                    : null

            }

        </View>

    );

    render() {
        const intime = this.props.navigation.getParam('timein', 'nothing sent');
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
                <Modal isVisible={this.state.visibleModal === 1}>
                    {this.renderModalContent()}
                </Modal>
                <Calendar
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => { this.setState({ visibleModal: 1, clickedDate: moment(day.dateString).format('MMMM DD, YYYY') }) }}
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
        height: 400,
        justifyContent: 'space-between'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalFooter: {
        justifyContent: 'flex-end',
    }
});