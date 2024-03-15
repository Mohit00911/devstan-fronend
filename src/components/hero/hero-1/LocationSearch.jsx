
import { useState, useEffect } from "react";
import { State, City } from "country-state-city";

const SearchBar = ({ onLocationSelect }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    loadOptions(searchValue);
  }, [searchValue]);

  const fetchLocationOptions = (inputValue) => {
    const indianStates = State.getStatesOfCountry("IN")
      .filter((state) =>
        state.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((state) => ({
        label: state.name,
        value: { name: state.name, location: state.name }, 
      }));
    const indianCities = City.getCitiesOfCountry("IN")
      .filter((city) =>
        city.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((city) => ({
        label: city.name,
        value: { name: city.name, location: city.name }, 
      }));
    const filteredOptions = indianStates.concat(indianCities);

    return filteredOptions;
  };

  const handleOptionClick = (item) => {
    setSearchValue(item.value.name);
    setSelectedItem(item.value);
    onLocationSelect(item.value);
  };

  const loadOptions = (inputValue) => {
    const options = fetchLocationOptions(inputValue);
    setLocationOptions(options);
  };



  return (
    <>
       <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">

        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">Location</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Where are you going?"
              className="js-search js-dd-focus"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        {/* End location Field */}


        <div className="shadow-2 dropdown-menu min-width-400" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {/* ... (previous code) */}
              {locationOptions.map((item, index) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                    selectedItem && selectedItem.name === item.value.name
                      ? "active"
                      : ""
                  }`}
                  key={index}

                  role="button"
                  onClick={() => handleOptionClick(item)}
                >
                  <div className="d-flex">
                    <div className="icon-location-2 text-light-1 text-20 pt-4" />
                    <div className="ml-10">
                      <div className="text-15 lh-12 fw-500 js-search-option-target">

                        {item.value.name}
                      </div>
                      <div className="text-14 lh-12 text-light-1 mt-5">
                        {item.value.location}

                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
