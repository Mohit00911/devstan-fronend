import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ContentTabContent from "./ContentTabContent";
import LocationTabContent from "./LocationTabContent";
import PricingTabContent from "./PricingTabContent";
import AttributesTabContent from "./AttributesTabContent";
import { BASE_URL } from "@/utils/headers";

const Index = () => {
  const touruuid = localStorage.getItem("tourUUID");
  const vendorId = localStorage.getItem("vendorID");
  const vendorName = localStorage.getItem("userName");

  const [receivedData, setReceivedData] = useState({
    vendor: vendorId,
    uuid: touruuid,
    vendorName: vendorName,
    status: "pending",
    name: "",

    overview: "",

    location: "",
    cost: [
      {
        standardPrice: "",
      },
      {
        deluxePrice: "",
      },
      {
        premiumPrice: "",
      },
    ],
    duration: "",
    groupSize: "",
    cancellationPolicy: "",
    languages: "",
    highlights: "",
    whatsIncluded: "",
    whatsExcluded: "",
    availableDates: "",
    departureDetails: "",
    inclusions: "",
    exclusions: "",
    knowBeforeYouGo: "",
    itineraries:[{
      title: "",
      duration: "",
      meals:[],
      image: "",
      description: "",
      day:0
    }],
    additionalInfo: "",
    tourType: "",
    images:""
  });
  
console.log(receivedData)
  const handleDataFromChild = (data) => {
    setReceivedData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      if (!vendorId) {
        console.error("Vendor ID not available");
        return;
      }

      const payload = {
        ...receivedData,
      };
console.log(payload)
      const response = await fetch(`${BASE_URL}/api/createTours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      console.log("API response:", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const tabs = [
    {
      label: "Content",
      labelNo: 1,
      content: (
        <ContentTabContent
          onDataFromChild={handleDataFromChild}
          onSaveChanges={handleSaveChanges}
        />
      ),
    },
    {
      label: "Details",
      labelNo: 2,
      content: (
        <LocationTabContent
          onDataFromChild={handleDataFromChild}
          onSaveChanges={handleSaveChanges}
        />
      ),
    },
    {
      label: "Important Information",
      labelNo: 3,
      content: (
        <PricingTabContent
          onDataFromChild={handleDataFromChild}
          onSaveChanges={handleSaveChanges}
        />
      ),
    },
    {
      label: "itinery",
      labelNo: 4,
      content: <AttributesTabContent 

onDataFromChild={handleDataFromChild}
          onSaveChanges={handleSaveChanges}
      />,
    },
  ];

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs
      className="tabs -underline-2 js-tabs"
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
    >
      <TabList className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20">
        {tabs.map((tab, index) => (
          <Tab key={index} className="col-auto">
            <button className="tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button">
              {tab.labelNo}. {tab.label}
            </button>
          </Tab>
        ))}
      </TabList>

      <div className="tabs__content pt-30 js-tabs-content">
        {tabs.map((tab, index) => (
          <TabPanel
            key={index}
            className={`-tab-item-${index + 1} ${
              tabIndex === index ? "is-tab-el-active" : ""
            }`}
          >
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
};

export default Index;
