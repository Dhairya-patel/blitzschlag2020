import React, { Component } from "react";
import "./Event.css";
import TrackSlider from "./Trackslider";
import TrackSliderMob from "./Trackslidermob.js";
export default class Event extends Component {
  rendercar() {
    if (window.innerWidth > 700) {
      return <TrackSlider></TrackSlider>;
    } else {
      return <TrackSliderMob />;
    }
  }
  render() {
    return (
      <div style={{background:'#f8f7c9', height:'100vh'}}>
        <h1 style={{color:'#451521'}}>Events</h1>
        <br></br>
        <br></br>
        {this.rendercar()}
      </div>
    );
  }
}
