import { ApplicationItems } from "./components";

const MyApplicationsPage = () => {
  return (
    <>
      <ApplicationItems status="PENDING" />
      <ApplicationItems status="APPROVED" />
      <ApplicationItems status="REJECTED" />
    </>
  );
};

export default MyApplicationsPage;
