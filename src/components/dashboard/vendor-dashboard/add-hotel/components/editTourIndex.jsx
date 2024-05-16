import React, { useState,useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ContentTabContentEdit from "./ContentTabContentEdit";
import LocationTabContentEdit from "./LocationTabContentEdit";
import PricingTabContentEdit from "./PricingTabContentEdit";
import AttributesTabContentEdit from "./AttributesTabContentEdit";
import { BASE_URL } from "@/utils/headers";

const editTourIndex = ({uuid}) => {
 
  const touruuid= localStorage.getItem("tourUUID");
  const vendorId = localStorage.getItem("vendorID");
  const vendorName = localStorage.getItem("userName");
 
  const [receivedData, setReceivedData] = useState(
    {
      vendor:vendorId,
      uuid:touruuid,
      vendorName:vendorName,
      status:"pending",
      name: "",
      location: "",
      cost: "",
      duration: "",
      groupSize:"",

      overview:"",
      cancellationPolicy: "",

      languages: [''],
      highlights: [''],
      whatsIncluded: [''],
      whatsExcluded:[''],
      availableDates:"",
      departureDetails: "",
      inclusions:[''],
      exclusions:[''],
      knowBeforeYouGo:[''],
      additionalInfo:[''],
      itineraries:[{
        title: "",
        duration: "",
        meals:[],
        image: "",
        description: "",
        day:0
      }],
    }
  )
 

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

 
  const response = await fetch(`${BASE_URL}/api/updateTour/${receivedData.uuid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });


    if (response.ok) {
      console.log("Tour details updated successfully");
    } else {
      console.error("Failed to update tour details");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
useEffect(() => {
  const fetchTourDetails = async () => {
    try {
      
      const response = await fetch(`${BASE_URL}/api/getTour/${uuid}`);
      const data = await response.json();
      const tourDetails = Array.isArray(data) ? data[0] : data;
      setReceivedData(tourDetails);
    } catch (error) {
      console.error("Error fetching tour details:", error);
    }
  };

  fetchTourDetails();
}, [uuid]);

  const tabs = [
    {
      label: "Content",
      labelNo: 1,
      content: <ContentTabContentEdit onDataFromChild={handleDataFromChild}  onSaveChanges={handleSaveChanges} initialValues={receivedData}/>,
    },
    {
      label: "Details",
      labelNo: 2,
      content: <LocationTabContentEdit onDataFromChild={handleDataFromChild} onSaveChanges={handleSaveChanges} initialValues={receivedData}/>,
    },
    {
      label: "Important Information",
      labelNo: 3,
      content: <PricingTabContentEdit onDataFromChild={handleDataFromChild} onSaveChanges={handleSaveChanges} initialValues={receivedData}/>,
    },
    {
      label: "itinery",
      labelNo: 4,
      content: <AttributesTabContentEdit onDataFromChild={handleDataFromChild} onSaveChanges={handleSaveChanges} initialValues={receivedData}/>,
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

export default editTourIndex;
