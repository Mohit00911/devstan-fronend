
const ImportantInfo = ({tour}) => {

  return (
    <div className="row x-gap-40 y-gap-40 justify-between pt-20">
      <div className="col-lg-4 col-md-6">
        <div className="fw-500 mb-10">Inclusions</div>
        <ul className="list-disc">

         
          <li>{tour && tour.inclusions}</li>

        </ul>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="fw-500 mb-10">Departure details</div>

        
        <div className="text-15">
        {tour && tour.departureDetails}

        </div>
      </div>

      <div className="col-lg-3 col-md-6">

      
        <div className="fw-500 mb-10">Know before you go</div>
        <ul className="list-disc">
       
          <li>  {tour && tour.knowBeforeYouGo}</li>

        </ul>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="fw-500 mb-10">Exclusions</div>

        
        <ul className="list-disc">
        <li>  {tour && tour.exclusions}</li>

        </ul>
      </div>

      <div className="col-12">
        <div className="fw-500 mb-10">Additional information</div>
        <ul className="list-disc">

        <li>  {tour && tour.additionalInfo}</li>

        </ul>
      </div>
    </div>
  );
};

export default ImportantInfo;
