import ReviewGallery from "./ReviewGallery";

const DetailsReview2 = ({tour}) => {
  console.log(tour)
  return (
    <div className="row y-gap-40">
    {tour && tour.map((item)=>{
      return(
        <>
        <div className="col-lg-12">
        <div className="row x-gap-20 y-gap-20 items-center">
          {/* <div className="col-auto">
            <img src="/img/avatars/2.png" alt="image" />
          </div> */}
          <div className="col-auto">
            <div className="fw-500 lh-15">{item.name}</div>
            <div className="text-14 text-light-1 lh-15">March 2022</div>
          </div>
        </div>
        {/* End .row */}

        <h5 className="fw-500 text-blue-1 mt-20">{item.text}</h5>
        <p className="text-15 text-dark-1 mt-10">
         {item.comment
      }
        </p>

        {/* <ReviewGallery /> */}
{/* 
        <div className="d-flex x-gap-30 items-center pt-20">
          <button className="d-flex items-center text-blue-1">
            <i className="icon-like text-16 mr-10" />
            Helpful
          </button>
          <button className="d-flex items-center text-light-1">
            <i className="icon-dislike text-16 mr-10" />
            Not helpful
          </button>
        </div> */}
      </div>
        </>
      )
    })}
      
      {/* End .col */}

      <div className="col-auto">
        <a href="#" className="button -md -outline-blue-1 text-blue-1">
          Show all 116 reviews{" "}
          <div className="icon-arrow-top-right ml-15"></div>
        </a>
      </div>
      {/* End .col-auto */}
    </div>
  );
};

export default DetailsReview2;
