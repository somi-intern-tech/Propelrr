import React from 'react'

import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

const DismissKeyboardHOC = (Comp) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View)

export default class Login extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      username: '',
      password: '',
      a: '',
      time: '',
      animating: false,
      align: 'center',
      login: false,
      splashScreen: true,
    }
    setTimeout(
      () =>
        this.setState({ align: 'flex-start' }, function () {
          this.setState({
            login: true,
            splashScreen: false
          });
        }),
      3000
    );
  }
  // componentDidMount() {

  //   return fetch('http://demo2276663.mockable.io/login')
  //     .then((response) => response.json())
  //     .then((responseJson) => {

  //       this.setState({
  //         isLoading: false,
  //         dataSource: responseJson.account,
  //       })
  //     })

  //     .catch((error) => {
  //       console.log(error)
  //     });
  // }


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
  }

  componentWillUnmount() {
    clearInterval(this.Clock);
  }

  //

  handleUsernameChange = username => {
    this.setState({ a: '' })
    this.setState({ username })
  }

  handlePasswordChange = password => {
    this.setState({ password })
  }


  onLogin = () => {
    let bodyData = {
      'u': this.state.username,
      'p': this.state.password
    }
    const {
      username,
      password, time
    } = this.state

    fetch('http://demo2276663.mockable.io/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { 'username': username, 'password': password }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.validation === "hello") {

          alert(responseJson.validation + " --" + time)
          this.props.navigation.navigate('Home', { timein: time })
        }
        else {
          alert("error")
        }

      })
      .catch((error) => {
        console.error(error);
      });


  }
  handleError = a => {
    this.setState("Fill up fields")
  }

  errorto = () => {
    if (this.state.username == '' || this.state.password == '') {
      this.setState({
        a: 'Please enter your user and password'
      })
    }
    else if (this.state.username != '' && this.state.password != '') {
      this.onLogin()
    }
    else {
      this.setState({
        a: 'Invalid User or Password'
      })
    }
  }
  //goToSignup = () => this.props.navigation.navigate('Signup')

  render() {

    // if (this.state.isLoading) {
    //   return (
    //     <View style={styles.container}>
    //       <ActivityIndicator />
    //     </View>
    //   )
    // } else {
    return (

      <View style={styles.container}>
        {!this.state.splashScreen ? null : (
          <View>
            <View style={styles.con}>
              <Image source={require('../assets/propelrrlogo.png')}
                style={styles.image} />
            </View>
            <Text style={{fontSize: 28, color: 'white', fontWeight: 'bold', fontFamily: 'Times New Roman'}}>
              Drive Digital Differently
            </Text>
          </View>
        )}
        {!this.state.login ? null : (
          <View>
            <DismissKeyboardView>
              <View style={styles.con}>
                <Image source={require('../assets/propelrrlogo.png')}
                  style={styles.image} />
              </View>
              <View style={styles.container1}>
                <Text style={{ color: 'red' }}>{this.state.a}</Text>
                <View style={styles.input}>


                  <TextInput
                    name='username'
                    value={this.state.username}
                    placeholder='Username'
                    autoCapitalize='none'
                    onChangeText={this.handleUsernameChange}


                  />
                </View>
                <View style={styles.input}>

                  <TextInput
                    name='password'
                    value={this.state.password}
                    placeholder='Password'
                    secureTextEntry
                    onChangeText={this.handlePasswordChange}

                  />

                </View>

                <TouchableOpacity style={styles.button}
                  onPress={() => {
                    const {
                      username,
                      password
                    } = this.state
                    // this.state.dataSource.map((val) => {

                    //   if (username == val.user && password == val.password) {
                    //     this.onLogin()
                    //   }
                    //   else if (username.length == 0 || password.length == 0) {
                    //     // this.setState.a = "Please enter your user and password"
                    //     this.errorto()

                    //   }
                    //   else {
                    //     this.errorto()

                    //   }



                    // })\
                    this.errorto()
                  }



                  }


                >
                  <Text style={{ fontWeight: 'bold', color: 'white', fontSize: hp('2%') }}> LOGIN </Text>
                </TouchableOpacity>
              </View>
            </DismissKeyboardView>
          </View>
        )}


      </View>

    )
  }
}
// }

const styles = StyleSheet.create({

  container: {
    height: hp('100%'),
    backgroundColor: '#ff9800',
    alignItems: 'center',
    justifyContent: 'center'

  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ef6730',
    padding: hp('1.5%'),
    width: wp('80%'),
    marginTop: 10
  },

  image: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('30%'),
    width: wp('70%'),
    resizeMode: 'contain',
    marginBottom: 15
  },

  input: {
    width: wp('80%'),
    height: hp('6%'),
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: hp('2%'),
    fontStyle: "normal",


  },
  container1: {
    marginTop: -5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowOffset: { width: 8, height: 8, },
    shadowColor: 'black',
    shadowOpacity: .3,
    padding: 25,
    width: wp('90%')
  },
  con: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})


// export default createStackNavigator({

//   Home:{
//     screen: Home
//   },
//   Login:{
//     screen: Login
//   }
// })
