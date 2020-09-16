import React, { useState, useEffect } from 'react';
import ReviewsList from '../components/ReviewsList';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';
import NotFoundPage from './NotFoundPage';
import reviewContent from './review-content';

const ReviewPage = ( {match} ) => {

    const name = match.params.name;
    const review = reviewContent.find(review => review.name === name);

    const [reviewInfo, setReviewInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/reviews/${name}`);
            const body = await result.json();
            setReviewInfo(body);
        }
        fetchData();
    }, [name]);

    if (!review) return <NotFoundPage />

    const otherReviews = reviewContent.filter(review => review.name !== name);

    return (
    <>
    <h1> {review.title} </h1>
    <UpvotesSection reviewName={name} upvotes={reviewInfo.upvotes} setReviewInfo={setReviewInfo} />
    {review.content.map((paragraph, key) => (
        <p key={key}> {paragraph} </p>
    ))}

    <CommentsList comments={reviewInfo.comments} />
    <AddCommentForm reviewName={name} setReviewInfo={setReviewInfo} />
    <h3>Other Reviews:</h3>
    <ReviewsList reviews={otherReviews} />


    </>
    );
}

export default ReviewPage;