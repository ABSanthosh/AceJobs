import React from "react";
import Slugify from "../../utils/Slugify";
import FancyButton from "../FancyButton/FancyButton";
import "./JobListing.scss";

function JobListing({
  postedDate,
  postedBy,
  jobTitle,
  jobDescription,
  location,
}) {
  return (
    <div className="JobListing">
      <div className="JobListing__top">
        <div className="JobListing__top--row">
          <div className="JobListing__top--Account">
            <span data-icon={String.fromCharCode(59475)} />
            by {postedBy}
          </div>
          <div className="JobListing__top--Date">{postedDate}</div>
        </div>
        <h2>{jobTitle}</h2>
        <p className="JobListing__top--desc">{jobDescription}</p>
        <p className="JobListing__top--location">{location}</p>
      </div>
      <div className="JobListing__bottom">
        <FancyButton
          invertButton
          style={{ width: "50%", height: "35px", fontSize: "16px" }}
        >
          Contact
        </FancyButton>
        <FancyButton
          style={{ width: "50%", height: "35px", fontSize: "16px" }}
          isLink={true}
          href={`/jobs/apply/${Slugify(jobTitle)}`}
        >
          Apply
        </FancyButton>
      </div>
    </div>
  );
}

export default JobListing;
