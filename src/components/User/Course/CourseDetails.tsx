import { useLocation } from "react-router-dom";

import { CourseInterface } from "../../../Interfaces/courseInterface";
import StripeBtn from "../../Common/Stripe/StripeButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interfaces/common";

function CourseDetails() {
  const { state } = useLocation();
  const selectedCourse: CourseInterface = state.selectedCourse;
  const userStore = useSelector((state: RootState) => state.user);
  const courseId = userStore.user.courseId;

  return (
    <section className="text-gray-700 body-font overflow-hidden ml-30 bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-3/5 mx-auto flex flex-wrap">
          <video
            autoPlay
            controls
            className="lg:w-1/2 w-full ml-30 object-cover object-center rounded border border-gray-200"
            src={selectedCourse.introvideo}
            style={{ width: '50%', height: 'auto' }} 
          >
            Your browser does not support the video tag.
          </video>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              COURSE NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {selectedCourse.title}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <svg
                    key={index}
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed text-lg font-semibold">
              {selectedCourse.subtitle}
            </p>
            <p></p>
            <p className="leading-relaxed text=xlg mb-2">
              {selectedCourse.description}
            </p>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ₹{selectedCourse.fee}/-
              </span>

              <div className="customStyles">
          <p className="bg-color-black-400 font-normal text-base" style={{ color: 'red' }}>
            {courseId ? (
              "You need to finish the current course to purchase this course"
            ) : (
              <StripeBtn
                price ={selectedCourse.fee}
                title={selectedCourse.title}
                createdby={selectedCourse.createdby}
                courseId={selectedCourse._id}
                
              />
            )}
          </p>
        </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseDetails;
