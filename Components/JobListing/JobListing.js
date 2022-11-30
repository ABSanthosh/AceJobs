import React from "react";
import FancyButton from "../FancyButton/FancyButton";
import "./JobListing.scss";

function JobListing({ postedDate, postedBy, jobTitle, jobDescription, location }) {
  return (
    <div className="JobListing">
      <div className="JobListing__top">
        <div className="JobListing__top--row">
          <div className="JobListing__top--Account">
            <span data-icon={String.fromCharCode(59475)} />
            {postedBy}
          </div>
          <div className="JobListing__top--Date">{postedDate}</div>
        </div>
        <h2>{jobTitle}</h2>
        <p className="JobListing__top--location">{location}</p>
        <p className="JobListing__top--desc">{jobDescription}</p>
      </div>
      <div className="JobListing__bottom">
        <FancyButton
          invertButton
          style={{ width: "50%", height: "35px", fontSize: "16px" }}
        >
          Contact
        </FancyButton>
        <FancyButton style={{ width: "50%", height: "35px", fontSize: "16px" }}>
          Apply
        </FancyButton>
      </div>
    </div>
  );
}

export default JobListing;
