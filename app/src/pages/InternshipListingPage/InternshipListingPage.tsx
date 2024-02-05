import { useInternshipListing } from "@/hooks";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { InternshipListingContent } from "./components";

const InternshipListingPage = () => {
  const { listingID } = useParams();
  const { data, isPending, isError } = useInternshipListing(listingID || "");

  return (
    <>
      {isPending && <CircularProgress />}
      {!isPending && !isError && <InternshipListingContent data={data} />}
    </>
  );
};

export default InternshipListingPage;
