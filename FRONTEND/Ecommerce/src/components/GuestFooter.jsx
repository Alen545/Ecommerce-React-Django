import React from 'react';

function GuestFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-gray-800 text-white text-center py-4">
      <div className="text-sm">
        &copy; {currentYear} Alen's Store. All rights reserved.
      </div>
    </footer>
  );
}

export default GuestFooter;
