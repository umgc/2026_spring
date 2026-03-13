import React from 'react';

export default function Home() {
  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to EduLense</h1>
      <p className="max-w-prose text-center">
        This is the home page of the application. Use the navigation above to
        explore other sections.
      </p>
    </main>
  );
}
