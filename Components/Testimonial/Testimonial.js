import React from "react";
import "./Testimonial.scss";

function Testimonial({ userName, content, rating }) {
  return (
    <div className="TestimonialWrapper">
      <img src="/Img/quote.png" />
      <p className="TestimonialWrapper__content">{content}</p>
      <div className="TestimonialWrapper__bottom">
        <h3>{userName}</h3>
        <span>
          {rating === 1
            ? "⭐️"
            : rating === 2
            ? "⭐️⭐️"
            : rating === 3
            ? "⭐️⭐️⭐️"
            : rating === 4
            ? "⭐️⭐️⭐️⭐️"
            : rating === 5
            ? "⭐️⭐️⭐️⭐️⭐️"
            : ""}
        </span>
      </div>
    </div>
  );
}

export default Testimonial;
