import {useState} from 'react';
import './Rating.css';

function Rating({initialRating = 0, onRatingChange, readOnly = false}) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    if (!readOnly) {
      setRating(value);
      if (onRatingChange) {
        onRatingChange(value);
      }
    }
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hover || rating) ? 'filled' : ''} ${
            readOnly ? 'readonly' : ''
          }`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
        >
          ★
        </span>
      ))}
      {!readOnly && rating > 0 && (
        <span className="rating-value">{rating} / 5</span>
      )}
    </div>
  );
}

export default Rating;
