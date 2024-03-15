import { useEffect, useState } from "react";

const Overview = ({ tour }) => {
  console.log(tour);
  return (
    <>
      <div className="row x-gap-40 y-gap-40">
        <div className="col-12">
          <h3 className="text-22 fw-500">Overview</h3>

          <p className="text-dark-1 text-15 mt-20">
          {tour && tour.overview}
          </p>

          
        </div>

        <div className="col-md-6">
          <h5 className="text-16 fw-500">Available languages</h5>
          <div className="text-15 mt-10">
            <ul>
              {tour &&
                tour.languages &&
                tour.languages.map((item) => {
                  return (
                    <>
                      <li>{item}</li>
                    </>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <h5 className="text-16 fw-500">Cancellation policy</h5>
          <div className="text-15 mt-10">{tour && tour.cancellationPolicy}</div>
        </div>

        <div className="col-12">
          <h5 className="text-16 fw-500">Highlights</h5>
          <ul className="list-disc text-15 mt-10">
            {tour &&
              tour.highlights &&
              tour.highlights.map((item) => {
                return (
                  <>
                    <li>{item}</li>
                  </>
                );
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
                  {tour &&
                    tour.highlights &&
                    tour.highlights.map((item, index) => (
                      <div key={index}>
                        <i className="icon-check text-10 mr-10"></i> {item}
                      </div>
                    ))}
                </div>
              </div>

              <div className="col-md-6">
                <div className="text-dark-1 text-15">
                  {tour &&
                    tour.highlights &&
                    tour.highlights.map((item, index) => (
                      <div key={index}>
                        <i className="icon-close text-green-2 text-10 mr-10"></i>{" "}
                        {item}
                      </div>
                    ))}
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
