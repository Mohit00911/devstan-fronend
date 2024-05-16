import { Link } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import MainMenu from "../MainMenu";
import CurrenctyMegaMenu from "../CurrenctyMegaMenu";
import LanguageMegaMenu from "../LanguageMegaMenu";
import MobileMenu from "../MobileMenu";
import { BASE_URL } from "@/utils/headers";

const Header1 = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("userName");
  // const history = useHistory();
  const [userData, setUserData] = useState();
  const [navbar, setNavbar] = useState(false);
  const vendorId = localStorage.getItem("vendorID");
  const userId = localStorage.getItem("userId");
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("userId");
        const response = await fetch(`${BASE_URL}/api/getUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const data = await response.json();

          setUserData(data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  function handleRedirect() {
    if (vendorId) {
      window.location.href = "/vendor-dashboard/dashboard";
    }
    if (userId) {
      window.location.href = "/dashboard/db-booking";
    }
  }

  console.log(userData);

  return (
    <>
      <header className={`header ${navbar ? "bg-dark-1 is-sticky" : ""}`}>
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link to="/" className="header-logo mr-20">
                  <img src="/img/logo/logo.png" alt="logo" />
                </Link>

                <div className="header-menu">
                  <div className="header-menu__content">
                    <MainMenu style="text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div
                className="d-flex gap-10px items-center"
                style={{ gap: "10px" }}
              >
                {token && (
                  <div className="pl-15">
                    {userData && userData.profilePic ? (
                      <img
                        src={userData.profilePic}
                        alt="image"
                        className="size-50 rounded-22 object-cover"
                      />
                    ) : (
                      <img
                        src="/img/icons/blank.png" // Provide the path to your placeholder image
                        alt="Placeholder"
                        className="size-50 rounded-22 object-cover"
                      />
                    )}
                  </div>
                )}

                {token ? (
                  <p style={{ color: "white" }} onClick={handleRedirect}>
                    {username}
                  </p>
                ) : (
                  <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                    <Link
                      to="/become-expert"
                      className="button px-30 fw-400 text-14 -white bg-white h-50 text-dark-1"
                    >
                      Become An Expert
                    </Link>
                    <Link
                      to="/signup"
                      className="button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ml-20"
                    >
                      Sign In / Register
                    </Link>
                  </div>
                )}

                <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-white">
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    />

                    <div
                      className="offcanvas offcanvas-start  mobile_menu-contnet "
                      tabIndex="-1"
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      <MobileMenu />
                      {/* End MobileMenu */}
                    </div>
                  </div>
                </div>
                {/* End mobile menu icon */}
              </div>
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
    </>
  );
};

export default Header1;
