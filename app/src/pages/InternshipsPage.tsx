import React from "react";
import { getInternshipListings } from "../utils/http";

interface Internship {
  readonly listingID: number;
  position: string;
  listingDescription: string;
}

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
