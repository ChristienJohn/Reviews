import React from 'react';

const UpvotesSection = ({ reviewName, upvotes, setReviewInfo }) => { 
    const upvoteReview = async () => {
        const result = await fetch(`/api/reviews/${reviewName}/upvote`, {
            method: 'post', 
        });
        const body = await result.json();
        setReviewInfo(body);
    }
    return (
        <div id="upvotes-section">
            <button onClick={() => upvoteReview()}>Add Upvote</button>
            <p>This review has been upvoted {upvotes} times</p>
        </div>
    );
}


export default UpvotesSection;