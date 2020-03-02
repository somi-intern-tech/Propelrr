import React, {Component} from 'react'
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
import {DrawerActions} from 'react-navigation-drawer'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Modal from 'react-native-modal'

export default class MyRequest extends Component {
  static navigationOptions = {
    drawerLabel: 'My Request',
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
      statusColor:null,
      cellDate: null,
      visibleModal: null,


    }
  }
  async componentDidMount () {
    try {
      const response = await fetch('http://www.amock.io/api/intern/requests')
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
  setColor (colorstate) {
    this.setState({
      statusColor: colorstate,
    })
    // alert(colorstate)
  }



  showItem (rowData) {
    this.setState({
      cellDate: rowData.toString(),
      
    })
    this.setModal()
  }
  ListViewItemSeparator = () => {
    return (
      //List Item separator View
      <View style={{height: 0.5, width: '100%', backgroundColor: '#606070'}} />
    )
  }

  renderButton = () => {
    this.setState({visibleModal: null})
  }

  setModal = () => this.setState({visibleModal: 1})
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
            style={{fontWeight: 'bold', fontSize: hp('3%'), color: 'white'}}>
            {this.state.cellDate}
          </Text>
        </View>
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
        <Text style={{fontWeight: 'bold'}}>CLOSE</Text>
      </TouchableOpacity>
      {/* {this.renderButton('Close', () => this.setState({visibleModal: null}))} */}
    </View>
  )

  render () {
    
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
                <Text style={styles.text}>MY REQUESTS</Text>
              </View>
            </View>

            <View style={styles.viewStyleThree}>
              {/* <FlatList
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
                      <Text>{item.category}</Text>
                      <Text style={{marginBottom: 5}}>
                        {item.start} - {item.end}
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: this.state.statusColor}}>
                        {item.status}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                // keyExtractor={(item, index) => index}
                keyExtractor={(item, index) => index.toString()}
              /> */}
              <ActivityIndicator color='orange'/>
            </View>
          </View>
        </View>
      )
    }
    else{
      let stat = this.state.dataSource.map(dataSource => {
        <Text key={0}>{dataSource.status}</Text>
  
        if (stat == 'APPROVED') {
          this.setColor.bind(this, 'black')

        } else if (dataSource.status == 'DECLINED') {
        }
        else{
          this.setColor.bind(this, 'black')
        }
        // alert(this.state.statusColor)

      })
              // alert(this.state.statusColor)

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
                <Text style={styles.text}>MY REQUESTS</Text>
              </View>
            </View>

            <View style={styles.viewStyleThree}>
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
                      <Text>{item.category}</Text>
                      <Text style={{marginBottom: 5}}>
                        {item.start} - {item.end}
                      </Text>
                    </View>
                    <View>
                      <Text style={{fontWeight:'bold'}}>
                        {item.status}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                // keyExtractor={(item, index) => index}
                keyExtractor={(item, index) => index.toString()}
              />
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
    height: hp('90%'), // 70% of height device screen
    width: wp('100%'),
    // backgroundColor: '#ff9501',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ededed',
    // flexDirection: 'row',
    marginTop: 10,
  },
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
    // height: 44,
    marginLeft: 3,
    borderWidth: 1,
    borderRadius: 10,
    margin: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:wp('98%')
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
