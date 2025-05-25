// src/app/merch/page.tsx
import Image from 'next/image';
import Link from 'next/link';

// Optional: Metadata for the page (App Router)
export const metadata = {
  title: 'Merchandise | TinyStage',
  description:
    'Support TinyStage and our artists by checking out our exclusive merchandise.',
};

// Dummy data for merchandise items - replace with your actual data source later
// (e.g., fetched from a CMS, a local JSON file, or an e-commerce platform API)
const merchandiseItems = [
  {
    id: 'ts-shirt-001',
    name: 'TinyStage Classic Logo Tee',
    description:
      'Show your love for live music with our classic logo t-shirt. Comfortable and stylish.',
    price: '$25.00',
    imageUrl: '/images/merch/tinystage-tee.jpg', // Replace with your actual image path
    imageAlt: 'TinyStage Classic Logo T-Shirt',
    purchaseLink: '#', // Replace with actual purchase link or remove if not applicable
    // category: 'Apparel',
  },
  {
    id: 'ts--001',
    name: 'Limited Edition Show ',
    description:
      'A beautifully designed  commemorating a special TinyStage performance. Collectible item.',
    price: '$15.00',
    imageUrl: '/images/merch/tinystage-.jpg', // Replace with your actual image path
    imageAlt: 'Limited Edition TinyStage Show ',
    purchaseLink: '#', // Replace with actual purchase link
    // category: 'Prints',
  },
  {
    id: 'ts-mug-001',
    name: 'TinyStage "Sound Check" Mug',
    description:
      'Start your day with a tune and your favorite beverage in our TinyStage mug.',
    price: '$18.00',
    imageUrl: '/images/merch/tinystage-mug.jpg', // Replace with your actual image path
    imageAlt: 'TinyStage Sound Check Mug',
    purchaseLink: '#', // Replace with actual purchase link
    // category: 'Drinkware',
  },
  // Add more items here
];

const MerchPage = () => {
  return (
    <main className='min-h-screen bg-gray-100 text-[var(--brand-black)]'>
      <div className='container mx-auto px-4 py-16 md:py-24'>
        <header className='mb-12 md:mb-16 text-center'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--brand-black)] mb-4'>
            TinyStage Merch
          </h1>
          <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            Wear your support, decorate your space, and help keep the music
            playing. Every item helps us spotlight amazing local talent.
          </p>
        </header>

        {merchandiseItems.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'>
            {merchandiseItems.map((item) => (
              <div
                key={item.id}
                className='group bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 ease-out hover:shadow-2xl'
              >
                <div className='relative w-full aspect-[4/3] overflow-hidden'>
                  {' '}
                  {/* Or aspect-[1/1] for square images */}
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    layout='fill'
                    objectFit='cover'
                    className='transition-transform duration-500 ease-out group-hover:scale-105'
                  />
                </div>
                <div className='p-6 flex flex-col flex-grow'>
                  <h2 className='text-xl lg:text-2xl font-bold text-[var(--brand-black)] mb-2'>
                    {item.name}
                  </h2>
                  <p className='text-gray-700 text-sm leading-relaxed mb-4 flex-grow'>
                    {item.description}
                  </p>
                  <div className='mt-auto'>
                    <p className='text-lg font-semibold text-[var(--brand-yellow)] mb-4'>
                      {item.price}
                    </p>
                    {item.purchaseLink && item.purchaseLink !== '#' ? (
                      <Link
                        href={item.purchaseLink}
                        target='_blank' // If it's an external store
                        rel='noopener noreferrer' // For external links
                        className='inline-block w-full text-center text-white bg-[var(--brand-black)] hover:bg-opacity-80 px-6 py-3 rounded-md font-semibold transition-colors duration-200 ease-out'
                      >
                        View Product / Purchase
                      </Link>
                    ) : (
                      <button
                        disabled
                        className='inline-block w-full text-center text-gray-500 bg-gray-200 px-6 py-3 rounded-md font-semibold cursor-not-allowed'
                      >
                        Coming Soon
                      </button>
                      // Or a "Contact to Purchase" button:
                      // <Link
                      //   href="/contact?subject=Merch Inquiry" // Example contact link
                      //   className="inline-block w-full text-center text-white bg-[var(--brand-gray-dark)] hover:bg-opacity-80 px-6 py-3 rounded-md font-semibold transition-colors duration-200 ease-out"
                      // >
                      //   Contact to Purchase
                      // </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-xl text-gray-500'>
              Our merchandise shop is currently brewing some cool stuff. Check
              back soon!
            </p>
          </div>
        )}

        {/* Optional: A section about why merch is important */}
        <section className='mt-16 md:mt-24 pt-12 border-t border-gray-200 text-center'>
          <h2 className='text-3xl font-bold text-[var(--brand-black)] mb-6'>
            More Than Just Merch
          </h2>
          <p className='text-lg text-gray-600 max-w-xl mx-auto'>
            Every t-shirt, , or mug you buy directly supports TinyStage's
            ability to host artists, improve our venue, and bring more live
            music to the community. Thank you for being a part of our journey!
          </p>
        </section>
      </div>
    </main>
  );
};

export default MerchPage;
