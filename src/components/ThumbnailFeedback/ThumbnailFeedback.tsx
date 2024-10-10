import React, { useState } from 'react';
import ThumbnailFeedbackForm from './ThumbnailFeedbackForm';
import ThumbnailFeedbackFeedback from './ThumbnailFeedbackFeedback';

interface ThumbnailFeedbackProps {
  apiUrl: string; // API URL to upload the image
}

const ThumbnailFeedback: React.FC<ThumbnailFeedbackProps> = ({ apiUrl }) => {
  const [feedbackData, setFeedbackData] = useState<{
    feedback: string;
    score: number | null;
  }>({ feedback: '', score: null });

  return (
    <div className="mx-auto p-4 rounded-lg border border-border shadow-sm bg-card dark:bg-background text-foreground dark:text-muted-foreground">
        <h2 className="text-lg font-medium mb-4 text-center">Thumbnails</h2>
        <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4">

          <ThumbnailFeedbackForm apiUrl={apiUrl} setFeedback={setFeedbackData} />

          <ThumbnailFeedbackFeedback
              feedback={feedbackData.feedback}
              score={feedbackData.score}
          />
      </div>
    </div>
  );
};

export default ThumbnailFeedback;
