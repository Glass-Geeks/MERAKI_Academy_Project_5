import React from "react";
import SchoolNav from "./SchoolNav";
import './school.css'
import Tea_stu_card from "./Tea_stu_card";
const School = () => {
 

  return (
    <>
      {" "}
      <SchoolNav />
      <div>
        <img className="school-img" src="https://thumbs.dreamstime.com/b/high-school-building-26880366.jpg" alt="school" />
      </div>
      <div className="cards-stu-teacher">
        <Tea_stu_card/>
      </div>
    </>
  );
};

export default School;
