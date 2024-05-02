import { MyInternships } from "./components";
import { useInterns } from "@/hooks";

const ManagerDashboard = () => {
  const { data: interns } = useInterns("ONGOING");

  return (
    <>
      <MyInternships interns={interns} />
    </>
  );
};

export default ManagerDashboard;
