import StatisticsCount from "../Dashboard/StatisticsCount";
import AdminGreeting from "../../Common/Greeting/AdminGreeting";
import PieChart from "../Dashboard/PieChart";
import BarChart from "../Dashboard/BarChart";

function StatisticsPage() {
  return (
    <div className="bg-teal-100">
      <AdminGreeting />
      <StatisticsCount />
      <p className="ml-80   mt-20 flex text-lime-500 text-lg text-center font-semibold size-9 w-full">
        -COURSE PURCHASE DETAILS-
      </p>
      <div className="ml-50   flex  bg-teal-100">
        <PieChart />
      </div>
      <p className="ml-80   flex text-lime-500 text-lg text-center font-semibold size-9 w-full">
        -COURSE PURCHASE DETAILS-
      </p>

      <div className="ml-50   flex  bg-teal-100">
        <BarChart />
      </div>
    </div>
  );
}

export default StatisticsPage;
