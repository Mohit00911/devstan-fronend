import React, { useState } from "react";
import CustomerInfo from "../CustomerInfo";
import PaymentInfo from "../PaymentInfo";
import OrderSubmittedInfo from "../OrderSubmittedInfo";
import { BASE_URL } from "@/utils/headers";

const Index = ({tourData}) => {
  
  const [currentStep, setCurrentStep] = useState(0);
  
  
  

  const steps = [
    {
      title: "Personal Details",
      stepNo: "1",
      stepBar: (
        <>
          <div className="col d-none d-sm-block">
            <div className="w-full h-1 bg-border"></div>
          </div>
        </>
      ),
      content: <CustomerInfo tourData={tourData}  />,
    },
    {
      title: "Payment Details",
      stepNo: "2",
      stepBar: (
        <>
          <div className="col d-none d-sm-block">
            <div className="w-full h-1 bg-border"></div>
          </div>
        </>
      ),
      content: <PaymentInfo tourData={tourData}/>,
    },
    {
      title: "Final Step",
      stepNo: "3",
      stepBar: "",
      content: <OrderSubmittedInfo />,
    },
  ];

  const renderStep = () => {
    const { content } = steps[currentStep];
    return <>{content}</>;
  };

 

    return (
      <>
        <div className="row x-gap-40 y-gap-30 items-center">
          
      </div>
     

      <div className="row">{renderStep()}</div>
   

      <div className="row x-gap-20 y-gap-20 pt-20">
       
       

        <div className="col-auto">
       
        </div>
       
      </div>
      
    </>
  );
};

export default Index;
