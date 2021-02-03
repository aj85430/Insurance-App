import React, { Component } from 'react';
import '../App.css';
/* import { Switch, Route, Link , Redirect} from "react-router-dom"; */
import {getCardConfig} from '../Configs/cardConfig'
import CardComponent from '../DyanamicComponents/CardComponent';
import CarouselComponent from './CarouselComponent';
import ChatBotComponent from './ChatBotComponent';


class HomePage extends Component {

    state = {
        showChat: false,
        speechToggle : true
      };
    
      startChat = () => {
        this.setState({
          speechToggle : true,
          showChat: true
        });
      };
    
      hideChat = () => {
        this.setState({
            speechToggle : false,
            showChat: false
        });
      };

    render() {
        const config = getCardConfig();
        return (
            <div>
                <div className="container-fluid">
                    <CarouselComponent config={config}/>
                </div>
                <div className="container my-5">
                  <div className="row" >
                        {
                            config.map(item => {
                                return <CardComponent key={item.productID} config={item} history={this.props.history}/>
                            })
                        }
                  </div>
                </div>
                <div className="bot">
                    <div style={{ display: this.state.showChat ? "" : "none" }}>
                        <ChatBotComponent speechToggle={this.state.speechToggle}/>
                    </div>
                </div>
                <div className="btn_chatbot">
                    {!this.state.showChat ? (
                        <button id="btn1" onClick={() => this.startChat()}>
                        Chat with Espa...{" "}
                        </button>
                    ) : (
                        <button id="btn2" onClick={() => this.hideChat()}>
                        Close chat...{" "}
                        </button>
                    )}
                </div><br /><br />
            </div>
        );
    }
}

export default HomePage;