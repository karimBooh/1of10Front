import React from 'react';

interface ThumbnailFeedbackPreviewProps {
  selectedImage: File | null;
}

const ThumbnailFeedbackPreview: React.FC<ThumbnailFeedbackPreviewProps> = ({
  selectedImage,
}) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedImage]);

  return (
    <div>
      {previewUrl && (
        <div>
          <h3>Preview:</h3>
          <img
            src={previewUrl}
            alt="Selected file"
            className="max-w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ThumbnailFeedbackPreview;
