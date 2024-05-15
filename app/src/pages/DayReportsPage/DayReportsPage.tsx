import { useAllInternshipDays, useInternshipForIntern } from "@/hooks";

const DayReportsPage = () => {
  const { data: internship } = useInternshipForIntern();
  const { data: days } = useAllInternshipDays(internship?.internshipID || "");

  console.log(days);

  return <>DayReportsPage</>;
};

export default DayReportsPage;
