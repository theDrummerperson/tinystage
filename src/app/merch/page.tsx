// src/app/merch/page.tsx


export const metadata = {
  title: 'Merchandise | Help Us Grow',
  description:
    'Discover how you can contribute to TinyStage through merchandise.',
};


import MerchPageContent from '../../components/MerchPageContent';

export default function MerchPage() {
  // This Server Component now just renders the Client Component
  return <MerchPageContent />;
}