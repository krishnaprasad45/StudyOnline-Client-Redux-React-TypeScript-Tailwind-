import { useLocation } from "react-router-dom";

import { CourseInterface } from "../../../Interfaces/courseInterface";

function CourseDetails() {
  const { state } = useLocation();
  const selectedCourse: CourseInterface = state.selectedCourse;

  return (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4 ml-20">
      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <h1
            className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
              uppercase
        block-letters
						"
          >
            {selectedCourse.title}
          </h1>
        </div>
        {selectedCourse.introvideo ? (
          <video autoPlay muted loop controls={false} width="400" height="200">
            <source src={selectedCourse.introvideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          "Not updated"
        )}
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl leading-20 text-gray-800">
            {selectedCourse.subtitle}
          </h1>

          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-lg leading-6 text-gray-800 font-semibold">
            Price:{" "}
            <span className="text-2xl text-black-600">
              {selectedCourse.fee}/-
            </span>
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-4 leading-6 border-b text-lg border-gray-200 flex items-center  justify-between">
          <p className="text-base leading-4 text-gray-800">
            Course Duration : {selectedCourse.duration}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-8 border-b border-gray-200 flex items-center justify-between w-full">
          <p className="text-base leading-6 text-gray-800">
            {selectedCourse.description}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">
            Created At : {selectedCourse.createdat}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">
            Created By : {selectedCourse.createdby}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
      </div>
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden mt-14">
        {selectedCourse.banner ? (
          <img
            className="w-full"
            alt="Banner image"
            src={selectedCourse.banner}
          />
        ) : (
          "Not updated"
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
