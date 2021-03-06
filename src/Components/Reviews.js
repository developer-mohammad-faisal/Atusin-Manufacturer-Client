import React, { Fragment, useEffect, useState } from "react";
import ReviewsCard from "./ReviewsCard";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://gentle-ridge-79225.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <Fragment>
      <section className="p-7">
        <h1 className="text-center text-primary text-3xl font-bold">
          Customer Reviews
        </h1>

        <div className="grid gap-8 pt-8 px-8 lg:px-16 grid-cols-1 lg:grid-cols-2">
          {reviews.map((review) => (
            <ReviewsCard key={review._id} r={review} />
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Reviews;
