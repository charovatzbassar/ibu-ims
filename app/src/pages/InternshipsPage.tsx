import React from "react";
import { getInternshipListings } from "../utils/http";

const InternshipsPage: React.FC = () => {
  const [internships, setInternships] = React.useState([]);

  React.useEffect(() => {
    getInternshipListings().then((data) => {
      setInternships(data);
    });
  }, []);

  console.log(internships);

  return (
    <>
      {internships.map((internship) => (
        <div key={internship.listingID}>
          {internship.position} - {internship.listingDescription}
        </div>
      ))}
    </>
  );
};

export default InternshipsPage;
