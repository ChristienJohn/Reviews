import React, { Fragment } from 'react';
import ReviewsList from '../components/ReviewsList';
import NotFoundPage from './NotFoundPage';
import reviewContent from './review-content';

const ReviewPage = ( {match} ) => {
    const name = match.params.name;
    const review = reviewContent.find(review => review.name === name);

    if (!review) return <NotFoundPage />

    const otherReviews = reviewContent.filter(review => review.name !== name);

    return (
    <>
    <h1> {review.title} </h1>
    {review.content.map((paragraph, key) => (
        <p key={key}> {paragraph} </p>
    ))}

    <h3>Other Reviews:</h3>
    <ReviewsList reviews={otherReviews} />


    </>
    );
}

export default ReviewPage;