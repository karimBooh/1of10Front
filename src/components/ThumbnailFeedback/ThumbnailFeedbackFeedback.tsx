import React from 'react';

interface FeedbackProps {
  feedback: string;
  score: number | null;
}

const ThumbnailFeedbackFeedback: React.FC<FeedbackProps> = ({
  feedback,
  score,
}) => {
  return (
    <div className="flex-1 p-4 rounded-lg border border-border shadow-sm text-left">
      <div className="font-semibold">Feedback</div>
      <div className="text-sm">{feedback || 'No feedback available'}</div>
        <br/>
      {score !== null && <div><div className="font-semibold">score</div>  <p className="text-sm">{score} / 10</p></div>}
</div>
  );
};

export default ThumbnailFeedbackFeedback;
