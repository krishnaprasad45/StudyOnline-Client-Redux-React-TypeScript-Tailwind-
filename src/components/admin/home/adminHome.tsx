// Mentor Dashboard.js
import { Link } from "react-router-dom";
import "./adminHome.css";
import { GoGraph } from "react-icons/go";
import { FaUserCog } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";

function AdminHome()  {
  return (
    <div className="">
      <div className="  p-4 flex flex-col fixed h-full  bg-slate-400">
        <Link
          className="mb-12 p-2 rounded buttonStyleAdmin"
          to={"/admin/statistics"}
        >
          <button className="flex items-center gap-2">
            <GoGraph className="ml-2" style={{ color: "black" }} /> Statistics
          </button>
        </Link>
        <Link
          className="mb-12 p-2 rounded buttonStyleAdmin"
          to={"/admin/user-management"}
        >
          <button className="flex items-center gap-2">
            <FaUserCog className="ml-2" style={{ color: "black" }} />
            User Management
          </button>
        </Link>

        <Link
          className="mb-12 p-2 rounded buttonStyleAdmin"
          to={"/admin/mentor-management"}
        >
          <button className="flex items-center gap-2">
            <FaChalkboardTeacher className="ml-2" style={{ color: "black" }} />
            Mentor Management
          </button>
        </Link>

        <Link
          className="mb-12 p-2 rounded buttonStyleAdmin"
          to={"/admin/sales-report"}
        >
          <button className="flex items-center gap-2">
            <TbReport className="ml-2" style={{ color: "black" }} />
            Sales Report
          </button>
        </Link>

        <Link className="mb-12 p-2 rounded buttonStyleAdmin" to={"/admin/login"}>
          <button className="flex items-center gap-2">
            <IoLogOut className="ml-2" style={{ color: "black" }} />
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AdminHome;
