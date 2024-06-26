import { Link } from "react-router-dom";
import Slider from "react-slick";
import toursData from "../../data/tours";
import isTextMatched from "../../utils/isTextMatched";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/utils/headers";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Tours = () => {
  const [allTours, setAllTours] = useState("");
  const userId = localStorage.getItem("userId");
  const fetchAllTours = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/allTours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setAllTours(data);
      console.log(data)
     
    } catch (error) {
      console.error("Error fetching tours:", error);
     
    }
  };

  useEffect(() => {
    fetchAllTours();
  }, []);

  const handleWishlist = async (uuid) => {
    try {
     
      const response = await fetch(`${BASE_URL}/api/addToWishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid, userId }),
      });

      // If the API call is successful, update the state or UI accordingly
      if (response.ok) {
        // setIsWishlist(true);
        toast.success('Tour added to wishlist!');
     
      } else {
        // Handle API call errors
        throw new Error(`Error adding tour to wishlist: ${response.status}`);
       
      }
    } catch (error) {
      toast.success('Tour is already in wishlist');
      console.error(error.message);
    }
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  var itemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function Arrow(props) {
    let className =
      props.type === "next"
        ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-next"
        : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-prev";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <>
          <i className="icon icon-chevron-right text-12"></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12"></span>
        </>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }
  return (
    <>
      <Slider {...settings}>
        {allTours &&
          allTours.map((item) => (
            <div
              key={item?.uuid}
              data-aos="fade"
              data-aos-delay={item?.delayAnimation}
            >
              <div className="tourCard__image position-relative">
                <div className="inside-slider">
                  <Slider
                    {...itemSettings}
                    arrows={true}
                    nextArrow={<Arrow type="next" />}
                    prevArrow={<Arrow type="prev" />}
                  >
                    {item?.images?.map((slide, i) => (
                      <div className="cardImage ratio ratio-1:1" key={i}>
                        <div className="cardImage__content ">
                          <Link to={`/tour-single/${item.uuid}`}>
                            <img
                              className="col-12 js-lazy" style={{height:"100%"}}
                              src={slide}
                              alt="image"
                            />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </Slider>

                  <div
                    className="cardImage__wishlist"
                    onClick={() => handleWishlist(item.uuid)}
                  >
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12" />
                    </button>
                  </div>

                  <div className="cardImage__leftBadge">
                    {/* <div
                      className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase ${
                        isTextMatched(item?.tag, "likely to sell out*")
                          ? "bg-dark-1 text-white"
                          : ""
                      } ${
                        isTextMatched(item?.tag, "best seller")
                          ? "bg-blue-1 text-white"
                          : ""
                      }  ${
                        isTextMatched(item?.tag, "top rated")
                          ? "bg-yellow-1 text-dark-1"
                          : ""
                      }`}
                    >
                      {item.tag}
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="tourCard__content mt-10">
                <div className="d-flex items-center lh-14 mb-5">
                  <div className="text-14 text-light-1">
                    {item?.duration}+ hours
                  </div>
                  <div className="size-3 bg-light-1 rounded-full ml-10 mr-10" />
                  {/* <div className="text-14 text-light-1">{item?.tourType}</div> */}
                </div>
                <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
                  <span>{item?.name}</span>
                </h4>
                <p className="text-light-1 lh-14 text-14 mt-5">
                  {item?.location}
                </p>

                <div className="row justify-between items-center pt-15">
                  <div className="col-auto">
                    <div className="d-flex items-center">
                      <div className="d-flex items-center x-gap-5">
                        <div className="icon-star text-yellow-1 text-10" />
                        <div className="icon-star text-yellow-1 text-10" />
                        <div className="icon-star text-yellow-1 text-10" />
                        <div className="icon-star text-yellow-1 text-10" />
                        <div className="icon-star text-yellow-1 text-10" />
                      </div>

                      <div className="text-14 text-light-1 ml-10">
                        {item?.numberOfReviews} reviews
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="text-14 text-light-1">
                      From
                      <span className="text-16 fw-500 text-dark-1">
                        {" "}
                        Rs.{item.cost[0].standardPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </>
  );
};

export default Tours;
