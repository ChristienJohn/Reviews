import React, { Fragment } from 'react';
import ReviewsList from '../components/ReviewsList';
import reviewContent from './review-content';

const ReviewsListPage = () => (
    <>
    <h1>Reviews!</h1>
    <ReviewsList reviews={reviewContent} />
    </>
    
);

export default ReviewsListPage;