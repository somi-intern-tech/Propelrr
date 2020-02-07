import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, ScrollView, Image, Button, Alert } from 'react-native';



export default class ContentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                date + ', ' + year,
        });
    }

    componentWillUnmount() {
        clearInterval(this.Clock);
    }
    
    render() {
        // const { navigation } = this.props;


        const intime = this.props.navigation.getParam('timein', 'nothing sent');

        const d = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayName = days[d.getDay()];

    
        return (
            <TouchableOpacity activeOpacity={1} style={styles.drawerTransparent} onPress={() => this.props.navigation.goBack()}>
                <TouchableOpacity activeOpacity={1} style={styles.drawer} disabled={false}>
                    <ScrollView>
                    {/* Header */}
                    <View style={styles.header}>
                        {/* Profile */}
                        <Image source={require('../assets/propelrr.png')} style={[styles.headerImage], { height: 85, width: 85 }} />

                        {/* Name */}
                        <Text style={[styles.name, { color: 'black' }]}>Mc Kylmerr Ico</Text>

                        {/* Time and date */}
                        <View style={styles.MainContainer}>

                            <Text style={styles.TextStyle}> {this.state.time} </Text>
                            {/* <Text>Timed in at:{JSON.stringify(navigation.getParam('timein','default value'))} </Text> */}

                            <Text
                                style={{
                                    fontSize: 14,
                                    paddingBottom: 10
                                }}>
                                {dayName + ', ' + monthNames[d.getMonth()] + ' ' + this.state.date}
                            </Text>
                            <TouchableOpacity style={{ backgroundColor: '#EF5350', width: 150, height: 40 }} >
                                <View style={{ flexDirection: 'row', paddingTop: 8, paddingLeft: 19 }}>
                                    <Image source={require('../assets/clock.png')} style={{ height: 20, width: 20 }} />
                                    <Text style={{ fontSize: 18, paddingLeft: 3, color: 'white' }}>TIME OUT</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.bordertext}>Timed-in at:  {intime}</Text>
                        </View>
                    </View>


                    <View style={{ paddingTop: 30 }}>
                        {/* Home */}
                        <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={() => this.props.navigation.navigate('Home')}>
                            <View style={styles.row}>
                                <Image source={require('../assets/house.png')} style={styles.icon} />
                                <Text style={styles.text}>Home</Text>
                            </View>
                        </TouchableHighlight>

                        <View style={styles.line}></View>
                        {/* Profile */}
                        <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={() => this.props.navigation.navigate('Profile')}>
                            <View style={styles.row}>
                                <Image source={require('../assets/avatar.png')} style={styles.icon} />
                                <Text style={styles.text}>Profile</Text>
                            </View>
                        </TouchableHighlight>

                        <View style={styles.line}></View>
                        {/* My Requests */}
                        <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={() => this.props.navigation.navigate('MyRequest')}>
                            <View style={styles.row}>
                                <Image source={require('../assets/list.png')} style={styles.icon} />
                                <Text style={styles.text}>My Requests</Text>
                            </View>
                        </TouchableHighlight>

                        <View style={styles.line}></View>
                        {/* Manage Events */}
                        <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={() => this.props.navigation.navigate('ManageEvents')}>
                            <View style={styles.row}>
                                <Image source={require('../assets/manageevents.png')} style={styles.icon} />
                                <Text style={styles.text}>Manage Events</Text>
                            </View>
                        </TouchableHighlight>

                        <View style={styles.line}></View>
                        {/* Log out */}
                        <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={() =>  this.props.navigation.navigate('Login')}>
                            <View style={styles.row}>
                                <Image source={require('../assets/logout.png')} style={styles.icon} />
                                <Text style={styles.text}>Log out</Text>
                            </View>
                        </TouchableHighlight>
                    </View>


                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    drawerTransparent: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    drawer: {
        flex: 1,
        width: 250,
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        height: 380,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
    },
    headerImage: {
        borderRadius: 100,
    },
    icon: {
        height: 25,
        width: 25,
    },
    row: {

        flexDirection: 'row',
        paddingVertical: 2,
        paddingLeft: 10,
    },
    menu: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 50,
        borderRadius: 50,
        alignSelf: 'center',

    },
    name: {
        marginTop: 5,
        fontSize: 23,
        color: 'black',
    },
    text: {
        fontSize: 18,
        color: '#111',
        marginLeft: 15,
    },
    line: {
        width: '100%',
        alignSelf: 'center',
        height: .3,
        backgroundColor: 'gray',
        margin: 15
    },
    MainContainer:
    {
        alignItems: 'center',
        margin: 10

    },
    TextStyle:
    {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bordertext: {
        backgroundColor: '#d3d3d3',
        borderRadius: 15,
        fontSize: 13,
        paddingLeft: 25,
        paddingRight: 25,
        padding: 10,
        margin: 10,
        overflow: 'hidden',

    }
});