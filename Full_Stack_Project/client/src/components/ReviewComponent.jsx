import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const ReviewComponent = ({ vehicleId }) => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const fetchReviews = async () => {
    const { data } = await API.get(`/vehicles/${vehicleId}/reviews`);
    setReviews(data);
  };

  const addReview = async () => {
    await API.post('/vehicles/review', { vehicleId, comment, rating });
    setComment('');
    setRating(5);
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h3>Reviews</h3>
      <div>
        {reviews.map((review) => (
          <div key={review._id}>
            <p>{review.comment}</p>
            <small>Rating: {review.rating}</small>
          </div>
        ))}
      </div>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        {[1, 2, 3, 4, 5].map((rate) => (
          <option key={rate} value={rate}>
            {rate}
          </option>
        ))}
      </select>
      <button onClick={addReview}>Submit Review</button>
    </div>
  );
};

export default ReviewComponent;
