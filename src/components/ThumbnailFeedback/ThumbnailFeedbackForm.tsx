import React, { useState, useEffect, useRef } from 'react';
import ThumbnailFeedbackPreview from './ThumbnailFeedbackPreview';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

interface ThumbnailFeedbackFormProps {
  apiUrl: string; // API URL to upload the image
  setFeedback: (feedback: { feedback: string; score: number | null }) => void; // Feedback handler
}

const ThumbnailFeedbackForm: React.FC<ThumbnailFeedbackFormProps> = ({
  apiUrl,
  setFeedback,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedImage(file);
    setUploadSuccess(null);
    setUploadError(null);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFeedback({ feedback: '', score: null });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      handleUpload();
    }
  }, [selectedImage]);

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('thumbnail', selectedImage, selectedImage.name);
    setUploading(true);

    try {
      const response = await fetch(apiUrl, {
        headers: {
          accept: 'application/json',
        },
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = JSON.parse(await response.json()); // Properly parse response as JSON

        setFeedback({
          feedback: data.feedback || 'No feedback provided',
          score: data.score,
        });
        setUploadSuccess(data.message || 'Image uploaded successfully!');
      } else {
        const errorData = await response.json();
        setUploadError(errorData.message || 'Failed to upload image.');
      }
    } catch (error) {
      setUploadError('An error occurred during the upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setUploadSuccess(null);
    setUploadError(null);
    setFeedback({ feedback: '', score: null });

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="relative flex-1 p-4 rounded-lg border border-border shadow-sm text-center">
      <div className="flex items-baseline">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
          ref={inputRef}
        />
        {selectedImage && (
          <Button
            onClick={handleReset}
            className="text-red-500 hover:text-red-700 focus:outline-none"
            aria-label="Reset"
            size="icon"
          >
            &#10005;
          </Button>
        )}
      </div>

      <ThumbnailFeedbackPreview selectedImage={selectedImage} />

      {uploading && <p className="mt-4 text-primary">Uploading...</p>}
      {uploadSuccess && (
        <p className="mt-4 text-green-500 dark:text-green-300">
          {uploadSuccess}
        </p>
      )}
      {uploadError && (
        <p className="mt-4 text-red-500 dark:text-red-300">{uploadError}</p>
      )}
    </div>
  );
};

export default ThumbnailFeedbackForm;
