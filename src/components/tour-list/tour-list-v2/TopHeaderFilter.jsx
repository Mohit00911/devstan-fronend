import { BASE_URL } from "@/utils/headers";
import { useEffect } from "react";

const TopHeaderFilter = ({locationParam}) => {
  const location=locationParam
  console.log(locationParam)
  useEffect(() => {
    const fetchToursByCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/allTours`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: location,

          }),
        });
        const data = await response.json();
      console.log(data)
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchToursByCategories();
  }, []);
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="text-18">
            <span className="fw-500">3,269 properties</span> in Europe
          </div>
        </div>
        {/* End .col */}

        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-auto">
              <button className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1">
                <i className="icon-up-down text-14 mr-10" />
                Sort
              </button>
            </div>
            {/* End .col */}

            <div className="col-auto d-none xl:d-block">
              <button
                data-bs-toggle="offcanvas"
                data-bs-target="#listingSidebar"
                className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
              >
                <i className="icon-up-down text-14 mr-10" />
                Filter
              </button>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}
    </>
  );
};

export default TopHeaderFilter;
