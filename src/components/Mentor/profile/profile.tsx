import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interfaces/common";
import { ProfileInterface } from "../../../Interfaces/mentorInterfaces";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import MentorApis from "../../../Constraints/apis/MentorApis";

function Profile() {
  const navigate = useNavigate();

  const [data, setData] = useState<ProfileInterface>();
  const APIURL: string = useSelector((state: RootState) => state.APIURL.url);

  const Logout = () => {
    localStorage.removeItem("mentorEmail");
    localStorage.removeItem("mentorToken");
    navigate("/mentor/login");
  };

  useEffect(() => {
    const mentorEmail: string | null = localStorage.getItem("mentorEmail");
    if (!mentorEmail) {
      navigate("/mentor/login");
    } else {
      
      const token = localStorage.getItem("mentorToken");
     
    mentorAxios.get(MentorApis.profile, {
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
  }, [APIURL]);

  return (
    <div>
      <div className="wrapper">
        {data?.email && (
          <div className="profile-card js-profile-card">
            <div className="profile-card__img">
              <img
                src={`${APIURL}/public/images/${data.image}`}
                alt={data.image}
              />
            </div>

            <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__name">{data.firstname} {data.lastname}</div>
             
              <div className="profile-card__txt">
                Email ID: <strong>{data.email}</strong>
              </div>

              <div className="profile-card__txt">
                Joining Date: <strong>{data.date}</strong>
              </div>

              <div className="profile-card-loc">
                <span className="profile-card-loc__icon">
                  <svg className="icon">
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                </span>

                <span className="profile-card-loc__txt mr-2">
                  PHONE: {data.mobile}
                </span>

                <span
                  className="profile-card-loc__txt"
                  style={{ color: data.aadhar_image ? "green" : "red" }}
                >
                  Adhaar: {data.aadhar_image ? " Updated " : " Not Updated "}
                </span>

                <div
                  className="profile-card-loc__txt ml-2"
                  style={{ color: data.experience_image ? "green" : "red" }}
                >
                   Experience:{" "}
                  {data.experience_image ? " Updated " : " Not Updated "}
                </div>
              </div>

              <div className="profile-card__txt">
                Account Verification: <p style={{color: "orange"}}> pending</p>

              </div>

              <div className="profile-card-ctr">
                <button
                  onClick={() => {
                    navigate("/mentor/profile-update");
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
