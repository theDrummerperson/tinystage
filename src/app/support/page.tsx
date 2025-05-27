// src/app/support/page.tsx

// Metadata MUST be exported from a Server Component
export const metadata = {
  title: 'Support TinyStage | Help Us Grow',
  description:
    'Discover how you can contribute to TinyStage and help us continue to champion local artists and live music experiences.',
};

// Import your new Client Component
import SupportPageContent from '@/components/SupportPageContent'; // Adjust path if you placed it elsewhere

export default function SupportPage() {
  // This Server Component now just renders the Client Component
  return <SupportPageContent />;
}