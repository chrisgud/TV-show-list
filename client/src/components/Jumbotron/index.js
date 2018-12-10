import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import firstimage from '../../Images/best-new-tv-shows-2016-ss01.jpg';
import secondimage from '../../Images/friends.jpg';
import thirdimage from '../../Images/sci-fi-tv-netflix.jpg';
// import "../../styles/Jumbotron.css";


class Jumbotron extends Component {
  
  
render() {
    return (
      <div class="container">
      <div class="col-md-auto">
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
      <div className="carousel-item active">
      <img className="d-block w-100" src={firstimage} alt="First slide" />
      <div class="carousel-caption d-none d-md-block">
        <h1>Vivamus massa velit</h1>
        <h3>tempor a tortor ac, maximus porttitor magna</h3>
      </div>
      </div>
      <div className="carousel-item">
      <img className="d-block w-100" src={secondimage} alt="Second slide" />
      <div class="carousel-caption d-none d-md-block">
        <h1>Vivamus massa velit</h1>
        <h3>tempor a tortor ac, maximus porttitor magna</h3>
      </div>
      </div>
      <div className="carousel-item">
      <img className="d-block w-100" src={thirdimage} alt="Third slide" />
      <div class="carousel-caption d-none d-md-block">
        <h1>Vivamus massa velit</h1>
        <h3>tempor a tortor ac, maximus porttitor magna</h3>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    )
  }
}


export default Jumbotron;