import React, { Component } from 'react';

import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";

import '../css/Carousel.css';

class CarouselComponent extends Component {

  state = {
    carouselConfig: this.props.config
  }

    render() {
        return (
              
                <MDBCarousel
                  activeItem={1}
                  length={this.state.carouselConfig.length}
                  showControls={true}
                  showIndicators={true}
                  className="z-depth-1"
                  id="mdb_carousel"
                >
                  {
                    this.state.carouselConfig.map((carouselElement, index) => {
                      return(
                        <MDBCarouselInner>
                          <MDBCarouselItem itemId={`${index+1}`}>
                            <MDBView id="mdb_view">
                              <a href={carouselElement.navigationPath}>
                                <img className="d-block w-100" height="330px" width="100%"
                                  src={carouselElement.bannerSrc}                                
                                />
                              </a>
                              
                            </MDBView>
                          </MDBCarouselItem>
                        </MDBCarouselInner>
                      )
                    })
                  }
                  </MDBCarousel>
                  
    )
  }
}

export default CarouselComponent;