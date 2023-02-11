import Link from "next/link";
import React from "react";
import "./JobCategoryBox.scss";

function JobCategoryBox({ title, href, icon, type = "", style, imageIndex }) {
  return (
    <div
      className={`JobCategoryBox JobCategoryBox--${
        type === "find" ? "find" : "active"
      }`}
      style={style}
    >
      <Link href={href}>
        <a>
          {type !== "find" ? (
            <>
              {/* <i data-icon={String.fromCharCode(icon)} /> */}
              <img src={`Img/jobs/${imageIndex + 1}.svg`} />
              <span>{title}</span>
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
