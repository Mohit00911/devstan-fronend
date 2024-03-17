import React from "react";

const ItineraryContent = ({ tour }) => {

  return (
    <>
      {tour && tour.map((item, index) => (
        <div className="col-12" key={index}>
          <div className="accordion__item">
            <div className="d-flex">
              <div className="accordion__icon size-40 flex-center bg-blue-2 text-blue-1 rounded-full">
                <div className="text-14 fw-500">{item.day}</div>
              </div>

              <div className="ml-20">
                <div className="text-16 lh-15 fw-500">{item.title}</div>
                <div className="text-14 lh-15 text-light-1 mt-5">
                  {item.durationMeal}
                </div>
                <div
                  className={`accordion-collapse collapse ${item.day}`}
                  id={`collapse-${index}`}
                >
                  <div className="pt-15 pb-15">
                    {item.image && (
                      <img
                        src={item.image}
                        alt="image"
                        className="rounded-4 mt-15"
                      />
                    )}
                    <div className="text-14 lh-17 mt-15">{item.description}</div>
                  </div>
                </div>

                <div
                  className="accordion__button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                >
                  <button className="d-block lh-15 text-14 text-blue-1 underline fw-500 mt-5">
                    See details &amp; photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItineraryContent;
