import React from "react";
import DashboardPageEdit from "../../../../components/dashboard/vendor-dashboard/add-hotel/editTourIndex";
import { useParams } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Vendor Add Hotel || GoTrip - Travel & Tour ReactJs Template",
  description: "GoTrip - Travel & Tour ReactJs Template",
};

export default function VendorAddHotel() {
  const { tourId } = useParams();
  console.log(tourId)
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPageEdit uuid={tourId}/>
    </>
  );
}
