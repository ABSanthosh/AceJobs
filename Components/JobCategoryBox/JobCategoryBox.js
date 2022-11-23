import Link from "next/link";
import React from "react";
import "./JobCategoryBox.scss";

function JobCategoryBox({ title, href, subTitle, type = "" }) {
  return (
    <div
      className={`JobCategoryBox JobCategoryBox--${
        type === "find" ? "find" : "active"
      }`}
    >
      <Link href={href}>
        <a>
          {type !== "find" ? (
            <>
              <span>{title}</span>
              <span>{subTitle}</span>
            </>
          ) : (
            <>
              <img src="Img/ArrowCircleUpRight.svg" />
              <span>{title}</span>
            </>
          )}
        </a>
      </Link>
    </div>
  );
}

export default JobCategoryBox;
