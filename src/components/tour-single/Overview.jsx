
import { useEffect, useState } from "react";


const Overview = ({tour}) => {
  
  console.log(tour)

  return (
    <>
      <div className="row x-gap-40 y-gap-40">
        <div className="col-12">
          <h3 className="text-22 fw-500">Overview</h3>

          <p className="text-dark-1 text-15 mt-20">
            Unless you hire a car, visiting Stonehenge, Bath, and Windsor Castle
            in one day is next to impossible. Designed specifically for
            travelers with limited time in London, this tour allows you to check
            off a range of southern England&lsquo;s historical attractions in
            just one day by eliminating the hassle of traveling between each one
            independently. Travel by comfortable coach and witness your guide
            bring each UNESCO World Heritage Site to life with commentary. Plus,
            all admission tickets are included in the tour price.
          </p>

          <a
            href="#"
            className="d-block text-14 text-blue-1 fw-500 underline mt-10"
          >
            Show More
          </a>
        </div>

        <div className="col-md-6">
          <h5 className="text-16 fw-500">Available languages</h5>
          <div className="text-15 mt-10">

            {tour && tour.languages  && tour.languages.map((item)=>{
              return(
                <>
                  {item}
                </>
              )
            })}

          </div>
        </div>

        <div className="col-md-6">
          <h5 className="text-16 fw-500">Cancellation policy</h5>
          <div className="text-15 mt-10">

            {tour && tour.cancellationPolicy}

          </div>
        </div>

        <div className="col-12">
          <h5 className="text-16 fw-500">Highlights</h5>
          <ul className="list-disc text-15 mt-10">

         
          {tour && tour.highlights  && tour.highlights.map((item)=>{
              return(
                <>
                  <li>{item.highlights}</li>
                </>
              )
            })}
            
          

          </ul>
        </div>
      </div>

      <div className="mt-40 border-top-light">
        <div className="row x-gap-40 y-gap-40 pt-40">
          <div className="col-12">
            <h3 className="text-22 fw-500">What&lsquo;s Included</h3>

            <div className="row x-gap-40 y-gap-40 pt-20">
              <div className="col-md-6">
              
              
                <div className="text-dark-1 text-15">
                  <i className="icon-check text-10 mr-10"></i> {tour.whatsIncluded}
                </div>
            
                
                

              </div>

              <div className="col-md-6">
                <div className="text-dark-1 text-15">

                  <i className="icon-close text-green-2 text-10 mr-10"></i> {tour.whatsExcluded}
                </div>
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
