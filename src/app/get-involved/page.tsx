// src/app/get-involved/page.tsx
// Optional: if you want to add some thematic images
import Link from 'next/link';

// Optional: Metadata for the page (App Router)
export const metadata = {
  title: 'Get Involved | TinyStage',
  description:
    'Discover how you can support TinyStage, find merchandise, and become part of our community.',
};

const GetInvolvedPage = () => {
  return (
    <main className='min-h-screen bg-gray-50 text-[var(--brand-black)]'>
      <div className='container mx-auto px-4 py-16 md:py-24'>
        <header className='mb-12 md:mb-16 text-center'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--brand-black)] mb-4'>
            Get Involved with TinyStage
          </h1>
          <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            TinyStage thrives on community support and enthusiasm. Here’s how
            you can play a part in celebrating local talent.
          </p>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto'>
          {/* Merchandise Section Card */}
          <section
            id='merch-section' // ID for potential hash linking from nav if it were a section here
            className='bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-out'
          >
            {/* Optional Image for Merch */}
            {/* <div className="relative h-48 w-full mb-6 rounded-md overflow-hidden">
              <Image
                src="/images/merch-banner.jpg" // Replace with your actual image path
                alt="TinyStage Merchandise"
                layout="fill"
                objectFit="cover"
              />
            </div> */}
            <h2 className='text-2xl sm:text-3xl font-bold text-[var(--brand-yellow)] mb-4'>
              Shop Our Merch
            </h2>
            <p className='text-gray-700 leading-relaxed mb-6'>
              Show your love for TinyStage and local artists by grabbing some
              exclusive gear. Every purchase helps us continue our mission.
            </p>
            <Link
              href='/merch' // Links to the top-level /merch page
              className='inline-block text-white bg-[var(--brand-black)] hover:bg-opacity-80 px-6 py-3 rounded-md font-semibold transition-colors duration-200 ease-out'
            >
              Explore Merchandise →
            </Link>
          </section>

          {/* Support Us Section Card */}
          <section
            id='support-section' // ID for potential hash linking
            className='bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-out'
          >
            {/* Optional Image for Support */}
            {/* <div className="relative h-48 w-full mb-6 rounded-md overflow-hidden">
              <Image
                src="/images/support-banner.jpg" // Replace with your actual image path
                alt="Support TinyStage"
                layout="fill"
                objectFit="cover"
              />
            </div> */}
            <h2 className='text-2xl sm:text-3xl font-bold text-[var(--brand-yellow)] mb-4'>
              Support Us
            </h2>
            <p className='text-gray-700 leading-relaxed mb-6'>
              Your contributions, big or small, make a huge difference. Help us
              provide a platform for emerging artists and create unforgettable
              musical experiences.
            </p>
            <Link
              href='/support' // Links to the top-level /support page
              className='inline-block text-white bg-[var(--brand-black)] hover:bg-opacity-80 px-6 py-3 rounded-md font-semibold transition-colors duration-200 ease-out'
            >
              Learn How to Support →
            </Link>
          </section>
        </div>

        {/* Optional: Call to action for performers */}
        <section className='mt-16 md:mt-24 pt-12 border-t border-gray-200 text-center'>
          <h2 className='text-3xl font-bold text-[var(--brand-black)] mb-6'>
            Are You an Artist?
          </h2>
          <p className='text-lg text-gray-600 max-w-xl mx-auto mb-8'>
            We're always looking for fresh talent to spotlight on the TinyStage.
            If you're a performer, we want to hear from you!
          </p>
          <Link
            href='/#booking' // Links to the booking section on the homepage
            className='inline-block text-white bg-[var(--brand-yellow)] hover:bg-opacity-90 px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 ease-out'
          >
            Submit Your Act
          </Link>
        </section>
      </div>
    </main>
  );
};

export default GetInvolvedPage;
