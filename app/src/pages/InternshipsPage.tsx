import React from "react";
import { getInternshipListings } from "../services/internshipListings";
import { Internship } from "../utils/types";

const InternshipsPage: React.FC = () => {
  const [internships, setInternships] = React.useState([]);

  React.useEffect(() => {
    getInternshipListings().then((data) => {
      setInternships(data);
    });
  }, []);

  return (
    <>
      {internships.map((internship: Internship) => (
        <div key={internship.listingID}>
          {internship.position} - {internship.listingDescription}
        </div>
      ))}
    </>
  );
};

export default InternshipsPage;
