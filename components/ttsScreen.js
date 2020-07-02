import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Platform, Linking } from 'react-native'
import axios from 'axios'
import Voice from 'react-native-voice'
import Tts from 'react-native-tts'

export default class TtsScreen extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      text: '',
      status: '',
      userPayload: '',
      userSession: ''
    }
  
    Voice.onSpeechStart = this.onSpeechStartHandler
    Voice.onSpeechEnd = this.onSpeechEndHandler
    Voice.onSpeechResults = this.onSpeechResultsHandler
    // Tts.setDefaultLanguage('en-US');
  }

  // Make call
  call = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber)
  }

  // Open web
  open = (endpoint) => {
    if (endpoint.toLowerCase() === 'google'){
      Linking.openURL('https://google.com')
    }

    if (endpoint.toLowerCase() === 'vnexpress'){
      Linking.openURL('https://vnexpress.net')
    }

    if (endpoint.toLowerCase() === 'youtube'){
      Linking.openURL('youtube://app')
    }

    if (endpoint.toLowerCase() === 'facebook'){
      Linking.openURL('facebook://app')
    }
  }

  search = (param) => {
    console.log(param)
    let endpoint = param[1];
    for (let i=2; i<param.length; i++){
      endpoint =  endpoint + `+${param[i]}`;
    }
    Linking.openURL(`https://google.com/search?q=${endpoint}`)
  }

  // Handle voice capture event
  onSpeechResultsHandler = result => {
    this.setState({ text: result.value[0] });

    // Handle 'call' word
    if (result.value[0].includes("call")){
      let endpoint = result.value[0].split(' ')
      this.call(endpoint[endpoint.length-1])
    }
    
    if (result.value[0].includes("open")){
      let endpoint = result.value[0].split(' ')
      this.open(endpoint[endpoint.length-1])
    }

    if (result.value[0].includes("search")){
      let param = result.value[0].split(' ')
      this.search(param)
    }

    // Tts.speak(result.value[0])
  }

  // Listening to start
  onSpeechStartHandler = () => {
    this.setState({ status: 'Listening...' });
  }

  // Listening to end
  onSpeechEndHandler = () => {
    this.setState({ status: 'Voice Processed' });
  }

  // Listening to press button to speak
  onStartButtonPress = e => {
    Voice.start('en-US');
  }

  // Listening to release button to speak
  onStopButtonPress = e => {
    Voice.stop();
    Tts.stop();
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Beer Advisor!</Text>

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
          <Text>Talk</Text>
        </TouchableHighlight>

        <Text style={{ fontSize: 20, color: 'red' }}>{this.state.text}</Text>
        <Text style={{ fontSize: 20, color: 'blue' }}>{this.state.status}</Text>
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
  }
  })