import { useAllInternshipDays, useInternshipForIntern } from "@/hooks";
import { InternshipDay } from "@/services/types";

import { Card, Pagination, PaginationItem } from "@mui/material";
import React from "react";
import { InternshipDayItem } from "./components";

const DayReportsPage = () => {
  const { data: internship } = useInternshipForIntern();
  const { data: days } = useAllInternshipDays(internship?.internshipID || "");

  const [page, setPage] = React.useState<number>(1);

  const itemsPerPage: number = 5;
  const startIndex: number = (page - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handleChange = (
    event: React.ChangeEvent<unknown> | null,
    value: number | null
  ) => {
    event?.preventDefault();
    setPage(value ? value : 1);
  };

  const totalPages: number | undefined =
    days && Math.ceil(days?.length / itemsPerPage);

  return (
    <>
      {!internship && (
        <Card sx={{ padding: "10px" }}>You have no ongoing internship.</Card>
      )}
      {internship && days && days.length === 0 && (
        <Card sx={{ padding: "10px" }}>
          You have no day reports for this internship.
        </Card>
      )}
      {internship && days && days.length !== 0 && (
        <div>
          {days
            .slice(startIndex, endIndex)
            .map((internshipDay: InternshipDay) => (
              <InternshipDayItem
                key={internshipDay.dayID}
                data={internshipDay}
              />
            ))}

          <Pagination
            sx={{ marginY: 2, display: "flex", justifyContent: "center" }}
            count={totalPages}
            page={page}
            color="primary"
            onChange={handleChange}
            renderItem={(item) => (
              <PaginationItem
                component="button"
                {...item}
                onClick={() => handleChange(null, item.page)}
              />
            )}
          />
        </div>
      )}
    </>
  );
};

export default DayReportsPage;
