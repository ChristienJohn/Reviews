import React from 'react';
import { Link } from 'react-router-dom';

const ReviewsList = ( {reviews} ) => (
    <>
    {reviews.map((review, key) => (
        <Link className="review-list-item" key={key} to={`/review/${review.name}`}>
            <h3> {review.title} </h3>
            <p> {review.content[0].substring(0,150)}... </p>
        </Link>
        
    ))}
    </>
);

export default ReviewsList