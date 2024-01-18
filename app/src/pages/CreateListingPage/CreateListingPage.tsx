import React from "react";
import { InternshipListingForm } from "@/components";
import { FormAction } from "@/utils";

const CreateListingPage: React.FC = () => {
  return (
    <>
      <InternshipListingForm onSubmit={() => {}} action={FormAction.CREATE} />
    </>
  );
};

export default CreateListingPage;
