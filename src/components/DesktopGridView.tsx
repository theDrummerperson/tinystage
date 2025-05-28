// src/components/DesktopGridView.tsx
'use client';

import React from 'react';

import PhotoGridItem, { PhotoGridItemData } from './PhotoGridItem'; // Assuming PhotoGridItem.tsx exists in the same directory

// Re-define or import the Photo data type if it's not PhotoGridItemData
// For consistency, let's use PhotoGridItemData if it's the same structure
interface PhotoData extends PhotoGridItemData {}

interface DesktopGridViewProps {
  images: PhotoData[];
  onImageClick: (index: number) => void; // For lightbox functionality
}

const DesktopGridView: React.FC<DesktopGridViewProps> = React.memo(({ images, onImageClick }) => {
  if (images.length === 0) {
    return <p className="col-span-full text-center text-brand-gray-light py-8">No images to display.</p>;
  }

  return (
    // Increased gap for better spatial relationship
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {images.map((img, idx) => (
        <PhotoGridItem
          key={`${img.src}-${idx}`}
          photo={img}
          isPriority={idx < 3} // Eager load first few images in the grid
          onImageClick={() => onImageClick(idx)} // Pass click handler for lightbox
        />
      ))}
    </div>
  );
});

DesktopGridView.displayName = 'DesktopGridView';
export default DesktopGridView;
// No need to export PhotoData from here if PhotoGridItemData handles it,
// or if PhotoData is defined/imported within PhotoSplash.tsx