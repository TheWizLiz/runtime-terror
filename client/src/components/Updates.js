import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import datePost from '../images/datePost.jpg';
import gameLogo from '../images/gameLogo.png';
import cashHunt from '../images/cash_hunt.jpg';

function Updates() {
  return (
    <div className="updates">
        <div class="container">
            <div class="row align-items-center">
                <h1 class="font-weight-light">Updates</h1>
            </div>

            <div class="row">
                <Carousel>
                  <Carousel.Item interval={1000}>
                    <img
                      className="d-block w-100"
                      src={gameLogo}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item interval={1000}>
                    <img
                      className="d-block w-100"
                      src={datePost}
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item interval={1000}>
                    <img
                      className="d-block w-100"
                      src={cashHunt}
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>

            </div>
        </div>
    </div>
  );
}

export default Updates;