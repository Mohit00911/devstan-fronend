import { useEffect, useState } from "react";
import { hotelsData } from "../../../../data/hotels";
import { BASE_URL } from "@/utils/headers";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Properties = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
const userId=localStorage.getItem("userId")
  
  const fetchWishlistItems = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/wishlist/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist items');
      }
      const data = await response.json();
      console.log(data.wishlist)
      setWishlistItems(data.wishlist);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  useEffect(() => {
    fetchWishlistItems(); // Fetch wishlist items when component mounts
  }, []);

  const handleRemoveFromWishlist = async (uuid) => {
    try {
      const response = await fetch(`${BASE_URL}/api/removeFromWishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid, userId }),
      });
  
      if (response.ok) {
        
        fetchWishlistItems(); 
        toast.success("Tour removed from wishlist!");
      } else {
        throw new Error(`Error removing tour from wishlist: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to remove tour from wishlist");
    }
  };
  return (
    <>
      {wishlistItems !== null &&
  wishlistItems.map((item) => (
    <div className="col-12" key={item.uuid}>
      <div className="row x-gap-20 y-gap-30">
        <div className="col-md-auto">
          <div className="cardImage ratio ratio-1:1 w-200 md:w-1/1 rounded-4">
            <div className="cardImage__content">
              <img
                className="rounded-4 col-12 js-lazy"
                src={item.images[0]}
                alt="image"
              />
            </div>
            <div className="cardImage__wishlist">
              <button
                className="button -blue-1 bg-white size-30 rounded-full shadow-2"
                onClick={() => handleRemoveFromWishlist(item.uuid)}
              >
                <i className="icon-trash text-12" />
              </button>
            </div>
          </div>
        </div>
        {/* End col */}

        <div className="col-md">
          <h3 className="text-18 lh-14 fw-500">{item?.name}</h3>
          <div className="d-flex x-gap-5 items-center pt-10">
            <i className="icon-star text-10 text-yellow-1" />
            <i className="icon-star text-10 text-yellow-1" />
            <i className="icon-star text-10 text-yellow-1" />
            <i className="icon-star text-10 text-yellow-1" />
            <i className="icon-star text-10 text-yellow-1" />
          </div>

          <div className="row x-gap-10 y-gap-10 items-center pt-20">
            <div className="col-auto">
              <p className="text-14">
                {item.location}
                <button
                  data-x-click="mapFilter"
                  className="text-blue-1 underline ml-10"
                >
                  Show on map
                </button>
              </p>
            </div>
            <div className="col-auto">
              <div className="size-3 rounded-full bg-light-1" />
            </div>
            <div className="col-auto">
              <p className="text-14">2 km to city center</p>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End col */}

        <div className="col-md-auto text-right md:text-left">
          <div className="d-flex flex-column justify-between h-full">
            <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
              <div className="col-auto">
                <div className="text-14 lh-14 fw-500">Exceptional</div>
                <div className="text-14 lh-14 text-light-1">3,014 reviews</div>
              </div>
              <div className="col-auto">
                <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                  {item?.ratings}
                </div>
              </div>
            </div>
            <div className="pt-24">
              <div className="fw-500">Starting from</div>
              <span className="fw-500 text-blue-1">Rs.{item.cost[0].standardPrice}</span>
            </div>
          </div>
        </div>
        {/* End col */}
      </div>
      {/* End .row */}
    </div>
  ))}

    </>
  );
};

export default Properties;
