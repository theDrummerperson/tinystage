// src/app/about/page.tsx
import React from 'react'; // Optional in newer Next.js/React versions but good practice

// You can also define metadata for the page (App Router)
// export const metadata = {
//   title: 'About Us | TinyStage',
//   description: 'Learn more about TinyStage and our mission.',
// };

const AboutPage = () => {
  return (
    <main className='container mx-auto px-4 py-12'>
      <h1 className='text-4xl font-bold mb-6'>About TinyStage</h1>
      <p className='text-lg mb-4'>
        Welcome to the About Us page! We are dedicated to showcasing amazing
        talent...
      </p>
      {/* Add more content here */}
    </main>
  );
};

export default AboutPage; // <<< THIS IS CRUCIAL
