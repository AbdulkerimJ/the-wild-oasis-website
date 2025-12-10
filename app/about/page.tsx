import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about The Wild Oasis and our mission to connect people with nature.',
}

const page = () => {
  return (
    <div>about</div>
  );
};

export default page;