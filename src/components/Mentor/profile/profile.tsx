import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import ProfileInterface from "../../../Interfaces/mentorInterfaces";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import { MdVerified } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";

function Profile() {
  const navigate = useNavigate();

  const [data, setData] = useState<ProfileInterface>();

  const Logout = () => {
    localStorage.removeItem("mentorEmail");
    localStorage.removeItem("mentorToken");
    navigate(mentorEndpoints.login);
  };

  useEffect(() => {
    const mentorEmail: string | null = localStorage.getItem("mentorEmail");
    if (!mentorEmail) {
      navigate(mentorEndpoints.login);
    } else {
      const token = localStorage.getItem("mentorToken");

      mentorAxios
        .get(mentorEndpoints.profile, {
          params: { email: mentorEmail },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [navigate]);

  return (
    <div>
      <div className="wrapper">
        {data?.email && (
          <div className="profile-card js-profile-card">
            <div className="profile-card__img">
              <img src={data.image} alt={data.image} />
            </div>

            <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__name">
                {data.firstname} {data.lastname}
              </div>

              <div className="profile-card__txt">
                Email ID: <strong>{data.email}</strong>
              </div>

              <div className="profile-card__txt">
                Joining Date: <strong>{data.date}</strong>
              </div>
              <div>
                <span className="profile-card-loc__txt font-semibold ">
                  PHONE: {data.mobile}
                </span>
              </div>

              <span className="profile-card-loc__icon">
                <svg className="icon">
                  <use xlinkHref="#icon-location"></use>
                </svg>
              </span>

              <div
                className="profile-card-loc"
                // style={{ display: "flex", alignItems: "center" }}
              >
                <div className=" flex items-center gap-2 font-bold  profile-card-loc__txt">
                  Adhaar{" "}
                  {data.aadhar_image ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <IoClose style={{ color: "red" }} />
                  )}
                </div>

                <div className=" flex items-center gap-2 profile-card-loc__txt ml-2">
                  Experience{" "}
                  {data.experience_image ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <IoClose style={{ color: "red" }} />
                  )}
                </div>
              </div>

              <div className="profile-card__txt mt-4">
                Account Verification{" "}
                <div className="flex items-center justify-center">
                  {data.verification === "Pending" ? (
                    <FaClockRotateLeft
                      style={{ color: "orange", fontSize: "1.5em" }}
                    />
                  ) : data.verification == "Verify" ? (
                    <MdVerified style={{ color: "blue", fontSize: "2em" }} />
                  ) : (
                    <IoCloseCircle style={{ color: "red", fontSize: "2em" }} />
                  )}
                </div>
              </div>

              <div className="profile-card-ctr">
                <button
                  onClick={() => {
                    navigate(mentorEndpoints.profileUpdate);
                  }}
                  className="profile-card__button button--blue js-message-btn"
                >
                  EDIT
                </button>
                <button
                  onClick={Logout}
                  className="profile-card__button button--orange"
                >
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
