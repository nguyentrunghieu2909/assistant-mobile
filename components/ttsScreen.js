import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Platform, Linking, BackHandler, Modal } from 'react-native'
import Voice from 'react-native-voice'
import Tts from 'react-native-tts'
import WeatherScreen from './WeatherScreen'
import Geolocation from '@react-native-community/geolocation'
import Geocoder from 'react-native-geocoder'
import moment from 'moment';

export default class TtsScreen extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      text: '',
      status: '',
      modalVisible: false,
    }
  
    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this)
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this)
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this)
    Tts.setDefaultLanguage('en-US');
  }

  componentDidMount = () => {
    Tts.speak("Hi, I'm Jarvis.")
  }

  // Make call
  call = (param) => {
    Tts.speak('Calling');
    
    let phoneNumber = param[1];
    for (let i=2; i<param.length; i++){
      phoneNumber =  phoneNumber + param[i];
    }
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(phoneNumber)
  }

  // Message
  mess = (param) => {
    Tts.speak('Opening message');
    
    let phoneNumber = param[2];
    for (let i=3; i<param.length; i++){
      phoneNumber =  phoneNumber + param[i];
    }
    phoneNumber = `sms:${phoneNumber}`;

    Linking.openURL(phoneNumber)
  }

  // Mail
  mail = (param) => {
    Tts.speak('Opening email');
    
    let mail = param[2];
    for (let i=3; i<param.length; i++){
      mail =  mail + param[i];
    }
    mail = `mailto:${mail}`;

    Linking.openURL(mail)
  }

  // Open web
  open = (param) => {
    let endpoint = param[1];
    for (let i=2; i<param.length; i++){
      endpoint =  endpoint + ' ' + param[i];
    }
    // console.log(endpoint)

    if (endpoint.toLowerCase() === 'google'){
      Tts.speak('Opening Google')
      Linking.openURL('https://google.com')
    }

    if (endpoint.toLowerCase() === 'vnexpress'){
      Tts.speak('Opening VnExpress')
      Linking.openURL('https://vnexpress.net')
    }

    if (endpoint.toLowerCase() === 'dân trí'){
      Tts.speak('Opening web')
      Linking.openURL('https://dantri.com.vn')
    }

    if (endpoint.toLowerCase() === 'youtube'){
      Tts.speak('Opening Youtube')
      Linking.openURL('youtube://app')
    }

    if (endpoint.toLowerCase() === 'facebook'){
      Tts.speak('Opening Facebook')
      Linking.openURL('facebook://app')
    }

    if (endpoint.toLowerCase() === 'instagram'){
      Tts.speak('Opening Instagram')
      Linking.openURL('instagram://user?username=nth.bi')
    }

  }

  // Search Google
  search = (param) => {
    Tts.speak('Searching on Google')

    let endpoint = param[1];
    for (let i=2; i<param.length; i++){
      endpoint =  endpoint + `+${param[i]}`;
    }
    Linking.openURL(`https://google.com/search?q=${endpoint}`)
  }

  // Exit app
  exit = () => {
    Tts.speak('Goodbye!')
    BackHandler.exitApp()
  }

  // Today's weather
  weather = () => {
    Tts.speak("Showing today's weather")
    this.setState({ modalVisible: true })
  }

  // My location
  location = () => {
    Geolocation.getCurrentPosition(info => (
      Geocoder.geocodePosition({lat:info.coords.latitude, lng:info.coords.longitude}).then(res => {
        console.log(res[1].formattedAddress);
        Tts.speak(res[1].formattedAddress)
        this.setState({status:res[1].formattedAddress})
      })
      .catch(error => alert(error)),
      console.log(info))
    )
  }

  // Current time
  time = () => {
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    Tts.speak(`${hours}:${min}`)
    this.setState({status:`${hours}:${min}`})
  }

  // Current date
  date = () => {
    var date = moment().format('D MMMM YYYY'); //To get the Current Date
    Tts.speak(`${date}`)
    this.setState({status:`${date}`})
  }

  // Handle voice capture event
  onSpeechResultsHandler = result => {
    this.setState({ text: result.value[0] });

    // Handle words
    if (result.value[0].toLowerCase().includes("gọi")){
      let param = result.value[0].split(' ')
      this.call(param)
    }
    
    if (result.value[0].toLowerCase().includes("mở")){
      let param = result.value[0].split(' ')
      this.open(param)
    }

    if (result.value[0].toLowerCase().includes("tìm")){
      let param = result.value[0].split(' ')
      this.search(param)
    }

    if (result.value[0].toLowerCase().includes("nhắn tin")){
      let param = result.value[0].split(' ')
      this.mess(param)
    }

    if (result.value[0].toLowerCase().includes("gửi thư")){
      let param = result.value[0].split(' ')
      this.mail(param)
    }

    if (result.value[0].toLowerCase().includes("kết thúc")){
      this.exit()
    }

    if (result.value[0].toLowerCase().includes("thời tiết hôm nay")){
      this.weather()
    }

    if (result.value[0].toLowerCase().includes("tôi đang ở đâu")){
      this.location()
    }

    if (result.value[0].toLowerCase().includes("bây giờ là mấy giờ")){
      this.time()
    }

    if (result.value[0].toLowerCase().includes("hôm nay là ngày bao nhiêu")){
      this.date()
    }

    // Tts.speak(result.value[0])
  }

  // Listening to start
  onSpeechStartHandler = () => {
    this.setState({ status: 'Đang nghe...' });
  }

  // Listening to end
  onSpeechEndHandler = () => {
    this.setState({ status: 'Đã xử lý xong' });
  }

  // Listening to press button to speak
  onStartButtonPress = e => {
    Voice.start('vi-VN');
  }

  // Listening to release button to speak
  onStopButtonPress = e => {
    Voice.stop();
    Tts.stop();
  }

  // Close modal
  setModalVisible = () => {
    this.setState({modalVisible: false})
  }

  render() {
    const { modalVisible } = this.state
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Jarvis!</Text>

        <TouchableHighlight
          style={{
            borderColor: 'black',
            borderWidth: 1,
            width: 100,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          underlayColor={'gray'}
          onPressIn={e => this.onStartButtonPress(e)}
          onPressOut={e => this.onStopButtonPress(e)}
        >
          <Text>Giữ để nói</Text>
        </TouchableHighlight>

        <Text style={{ fontSize: 20, color: 'red' }}>{this.state.text}</Text>
        <Text style={{ fontSize: 20, color: 'blue' }}>{this.state.status}</Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <WeatherScreen />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Quay lại</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: '#FFF'
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 50,
    elevation: 2,
    margin: 20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
})