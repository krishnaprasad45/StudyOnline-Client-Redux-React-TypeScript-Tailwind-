// Mentor Dashboard.js
import { Link } from "react-router-dom";
import "./adminHome.css";

const AdminHome = () => {
  return (
    <div className="">
      <div
        className="w-1/5 bg-gradient-to-r from-white via-#002D74 to-white p-4 flex flex-col fixed"
        style={{ backgroundColor: "rgb(0, 45, 116)" }}
      >
        <Link
          className="mb-12 p-2 rounded buttonStyleAdmin"
          to={"/admin/statistics"}
        >
          <button>Statistics</button>
        </Link>
        <Link
          className="mb-12 p-2 rounded buttonStyleAdmin"
          to={"/admin/user-management"}
        >
          <button>UserManagement</button>
        </Link>

        <Link
          className="mb-12 p-2 rounded buttonStyleAdmin"
          to={"/admin/mentor-management"}
        >
          <button>MentorManagement</button>
        </Link>

        <Link
          className="mb-12 p-2 rounded buttonStyleAdmin"
          to={"/admin/sales-report"}
        >
          <button>SalesReport</button>
        </Link>

        <Link className="mb-12 p-2 rounded buttonStyleAdmin" to={""}>
          <button>Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
