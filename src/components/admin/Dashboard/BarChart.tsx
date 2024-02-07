import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars() {
  
  // const [history, setHistory] = useState<PaymentDetails[]>([]);

  // useEffect(() => {
  //   adminAxios.get(adminEndpoints.paymentHistory).then((response) => {
  //     setHistory(response.data);
  //   });
  // }, []);

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: ["JAN - MAR", "APR - JUN", "JUL - SEP","OCT-DEC"] }]}
      series={[{ data: [4, 3, 5,3] }, { data: [1, 6, 3,4] }, { data: [2, 5, 6,5] },]}
      width={500}
      height={400}
    />
  );
}
