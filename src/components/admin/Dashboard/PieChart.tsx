import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { CourseInterface } from "../../../Interfaces/courseInterface";
import { adminAxios } from "../../../Constraints/axiosInterceptors/adminAxiosInterceptors";
import adminEndpoints from "../../../Constraints/endpoints/adminEndpoints";

export default function BasicPie() {
  const [courses, setCourses] = useState<CourseInterface[]>([]);

  useEffect(() => {
    adminAxios.get(adminEndpoints.courses).then((response) => {
      setCourses(response.data);
    });
  }, []);
  
  return (
    
    <PieChart
      series={[
        {
          data: courses.map((course, index) => ({
            id: index,
            value: 10,
            label: course.title,
          })),
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          cx: 180,
          cy: 152,
        },
      ]}
      width={400}
      height={600}
      title="My Pie Chart" 
    />
  );
}
