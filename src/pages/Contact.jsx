import React from 'react';

export default function Contact() {
  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="max-w-prose text-center">
        For inquiries, please email <a href="mailto:info@edulense.com" className="text-blue-500 underline">info@edulense.com</a>.
      </p>
    </main>
  );
}
