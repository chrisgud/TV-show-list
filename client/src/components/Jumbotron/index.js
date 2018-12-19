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
  },
  box: {
    marginTop: "1.5em"
  }
};

class Jumbotron extends Component {


  render() {
    return (
      <div className="container" style={styles.box}>
        <div className="col-md-auto">
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src={firstimage} alt="First slide" style={styles.images} />
                <div className="carousel-caption d-none d-md-block">
                  <h1 style={styles.header}>Welcome to VIST</h1>
                  <h3 style={styles.description}>Your new favorite TV organizing app</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={secondimage} alt="Second slide" style={styles.images} />
                <div className="carousel-caption d-none d-md-block">
                  <h1 style={styles.header}>Sign Up or Log In</h1>
                  <h3 style={styles.description}>Logging in gives you access to create your own personalized watchlist</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={thirdimage} alt="Third slide" style={styles.images} />
                <div className="carousel-caption d-none d-md-block">
                  <h1 style={styles.header}>Search Our Vast Library</h1>
                  <h3 style={styles.description}>Find any show you can think of in our comprehensive search engine</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={fourthimage} alt="Fourth slide" style={styles.images} />
                <div className="carousel-caption d-none d-md-block">
                  <h1 style={styles.header}>Mobile Friendly Interface</h1>
                  <h3 style={styles.description}>Don't have a computer? VIST works on Android and iPhone</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={fifthimage} alt="Fifth slide" style={styles.images} />
                <div className="carousel-caption d-none d-md-block">
                  <h1 style={styles.header}>Invite Friends to VIST</h1>
                  <h3 style={styles.description}>Invite your friends to VIST and unlock membership perks</h3>
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
