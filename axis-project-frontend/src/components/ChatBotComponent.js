import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import '../css/ChatBot.css'

const theme = {
  background: '#f5f8fb',
  fontFamily: 'sans-serif',
  headerBgColor: '#ae275f',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#ae275f',
  botFontColor: '#fff',
  userBubbleColor: '#ae275f',
  userFontColor: '#fff',
};

class ChatBotComponent extends Component {
    render() {
      console.log(this.props.speechToggle)
      return (
        <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Chat with Espa"
          speechSynthesis={{ enable: this.props.speechToggle, lang: 'en' }}
          steps={[
            {
              id: '1',
              message: 'Welcome to Esperanza Bank!! What is Your Good Name?',
              trigger: 'name',
            },
            {
              id: 'name',
              user: true,
              trigger: '3',
              validator: (value) => {
                if(!value){
                  return 'Enter Your Name';
                }
                else if (value.length < 3) {
                  return `Enter Your Name`;
              }
              return true;
              },
            },
            {
              id: '3',
              message: 'Hi {previousValue}! What are you looking for?',
              trigger: 'motive',
            },
            {
              id: 'motive',
              options: [
                { value: 'car-insurance', label: 'Car Insurance', trigger: '6' },
                { value: 'bike-insurance', label: 'Bike Insurance', trigger: '7' },
                { value: 'travel-insurance', label: 'Travel Insurance', trigger: '8' },
                { value: 'health-insurance', label: 'Health Insurance', trigger: '5' },
              ],
            },
            //car insurance start
            {
              id: '6',
              message: 'Enter Your Car Registration Number',
              trigger: 'car',
            },
            {
              id: 'car',
              user: true,
              trigger: '11',
                validator: (value) => {
                  if (!value) {
                      return 'Enter Valid Car Registration Number';
                  } else if (value.length<10) {
                      return 'Enter Valid Car Registration Number';
                  } else if (value.length > 10) {
                      return `Enter Valid Car Registration Number`;
                  }

                  return true;
              },
            },
            {
              id: '11',
              message: 'Choose Your Brand',
              trigger: 'car-brand',
            },
            {
              id: 'car-brand',
              options: [
                { value: 'tata', label: 'Tata', trigger: '12' },
                { value: 'toyota', label: 'Toyota', trigger: '12' },
                { value: 'hyundai', label: 'Hyundai', trigger: '12' },
                { value: 'datsun', label: 'Datsun', trigger: '12' },
                { value: 'maruti', label: 'Maruti', trigger: '12' },
                { value: 'honda', label: 'Honda', trigger: '12' },
                { value: 'mahindra', label: 'Mahindra', trigger: '12' },
                { value: 'others', label: 'Other', trigger: 'other' },
              ],
            },
            {
              id: '12',
              message: 'Choose Buy Year',
              trigger: 'car-year',
            },
            {
              id: 'other',
              message: 'Enter The Brand Name of Your Car',
              trigger: 'other-brand',
            },
            {
              id: 'other-brand',
              user: true,
              trigger: '12',
              validator: (value) => {
                if(!value){
                  return 'Enter Brand Name of Your Car';
                }
                else if (value.length < 3) {
                  return `Enter Brand Name of Your Car`;
              }
              return true;
              },
            },
            {
              id: 'car-year',
              options: [
                { value: '2020', label: '2020', trigger: '5' },
                { value: '2019', label: '2019', trigger: '5' },
                { value: '2018', label: '2018', trigger: '5' },
                { value: '2017', label: '2017', trigger: '5' },
                { value: '2016', label: '2016', trigger: '5' },
                { value: '2015', label: '2015', trigger: '5' },
                { value: '2014', label: '2014', trigger: '5' },
                { value: '2013', label: '2013', trigger: '5' },
                { value: '2012', label: '2012', trigger: '5' },
                { value: '2011', label: '2011', trigger: '5' },
                
              ],
            },
            //car insurance finish
           //bike insurance start
            {
              id: '7',
              message: 'Enter Your Bike Registration Number',
              trigger: 'bike',
            },
            {
              id: 'bike',
              user: true,
              trigger: '9',
                validator: (value) => {
                  if (!value) {
                      return 'Enter Valid Bike Registration Number';
                  } else if (value.length<10) {
                      return 'Enter Valid Bike Registration Number';
                  } else if (value.length > 10) {
                      return `Enter Valid Bike Registration Number`;
                  }

                  return true;
              },
            },
            {
              id: '9',
              message: 'Choose Your Brand',
              trigger: 'bike-brand',
            },
            {
              id: 'bike-brand',
              options: [
                { value: 'bajaj', label: 'Bajaj', trigger: '10' },
                { value: 'hero', label: 'Hero', trigger: '10' },
                { value: 'honda', label: 'Honda', trigger: '10' },
                { value: 'tvs', label: 'TVS', trigger: '10' },
                { value: 'yamaha', label: 'Yamaha', trigger: '10' },
                { value: 'ktm', label: 'KTM', trigger: '10' },
                { value: 'mahindra', label: 'Mahindra', trigger: '10' },
                { value: 'others', label: 'Other', trigger: 'other-bike' },
              ],
            },
            {
              id: '10',
              message: 'Choose Buy Year',
              trigger: 'bike-year',
            },
            {
              id: 'other-bike',
              message: 'Enter The Brand Name of Your Bike',
              trigger: 'other-bike-brand',
            },
            {
              id: 'other-bike-brand',
              user: true,
              trigger: '10',
              validator: (value) => {
                if(!value){
                  return 'Enter Brand Name of Your Bike';
                }
                else if (value.length < 3) {
                  return `Enter Brand Name of Your Bike`;
              }
              return true;
              },
            },
            {
              id: 'bike-year',
              options: [
                { value: '2020', label: '2020', trigger: '5' },
                { value: '2019', label: '2019', trigger: '5' },
                { value: '2018', label: '2018', trigger: '5' },
                { value: '2017', label: '2017', trigger: '5' },
                { value: '2016', label: '2016', trigger: '5' },
                { value: '2015', label: '2015', trigger: '5' },
                { value: '2014', label: '2014', trigger: '5' },
                { value: '2013', label: '2013', trigger: '5' },
                { value: '2012', label: '2012', trigger: '5' },
                { value: '2011', label: '2011', trigger: '5' },
                
              ],
            },
            //bike insurance finish
            //travel insurance start
            {
              id: '8',
              message: 'Choose Your Destination Country',
              trigger: 'choose',
            },
            {
              id: 'choose',
              options: [
                { value: 'USA', label: 'USA', trigger: 'city' },
                { value: 'Indonesia', label: 'Indonesia', trigger: 'city' },
                { value: 'Australia', label: 'Australia', trigger: 'city' },
                { value: 'Russia', label: 'Russia', trigger: 'city' },
              ],
            },
            {
              id: 'city',
              message: 'Choose Number Of Travellers',
              trigger: 'travellers',
            },
            {
              id: 'travellers',
              options: [
                { value: 'one', label: 'one', trigger: '5' },
                { value: 'two', label: 'two', trigger: '5' },
                { value: 'three', label: 'three', trigger: '5' },
                { value: 'four', label: 'four', trigger: '5' },
              ],
            },
            //travel insurance finish
            {
              id: '5',
              message: 'Please Provide Your Contact Number.',
              trigger: 'contact',
            },
            {
              id: 'contact',
              user: true,
              trigger: 'thanks',
              validator: (value) => {
                  if (!value) {
                      return 'Contact Number should be of 10 digits';
                  } else if (value.length<10) {
                      return 'Contact Number should be of 10 digits';
                  } else if (value.length > 10) {
                      return `Contact Number should be of 10 digits`;
                  }

                  return true;
              },
            },
            {
              id: 'thanks',
              message: 'Thanks! someone from our team will contact you soon.',
              end: true,
              //trigger: 'review',
            },
        
          ]}
        />
        </ThemeProvider>
      );
    }
  }
  
  export default ChatBotComponent;