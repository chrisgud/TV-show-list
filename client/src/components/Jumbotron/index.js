import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import firstimage from '../../Images/watching-tv.webp';
import secondimage from '../../Images/marvel-holiday-2018-ss06.jpg';
import thirdimage from '../../Images/the-sinner.jpg';
import fourthimage from '../../Images/fresh-off-the-boat-tv-review.jpg';
import fifthimage from '../../Images/breaking-bad.jpg'


const styles = {
  header: {
    backgroundColor: "white",
    color: "black"
  },
  description: {
    backgroundColor: "white",
    color: "black",
    paddingBottom: "1em"
  },
  images: {
    height: "48em",
    border: "10px solid black"
  }
};

class Jumbotron extends Component {


  render() {
    return (
      <div className="container">
        <div className="col-md-auto">
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src={firstimage} alt="First slide" />
                <div className="carousel-caption d-none d-md-block">
                  <h1 style={styles.header}>Welcome to VIST</h1>
                  <h3 style={styles.description}>Your new favorite TV organizing app</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={secondimage} alt="Second slide" />
                <div className="carousel-caption d-none d-md-block">
                  <h1 style={styles.header}>Vivamus massa velit</h1>
                  <h3 style={styles.description}>tempor a tortor ac, maximus porttitor magna</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={thirdimage} alt="Third slide" />
                <div className="carousel-caption d-none d-md-block">
                  <h1 style={styles.header}>Vivamus massa velit</h1>
                  <h3 style={styles.description}>tempor a tortor ac, maximus porttitor magna</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={fourthimage} alt="Fourth slide" />
                <div className="carousel-caption d-none d-md-block">
                  <h1 style={styles.header}>Vivamus massa velit</h1>
                  <h3 style={styles.description}>tempor a tortor ac, maximus porttitor magna</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={fifthimage} alt="Fifth slide" />
                <div className="carousel-caption d-none d-md-block">
                  <h1 style={styles.header}>Vivamus massa velit</h1>
                  <h3 style={styles.description}>tempor a tortor ac, maximus porttitor magna</h3>
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
