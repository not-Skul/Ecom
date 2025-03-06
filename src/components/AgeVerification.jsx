import React, { useState, useEffect } from 'react';

export const AgeVerification = () => {
  const [showModal, setShowModal] = useState(true);

  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowModal(false);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified');
    if (isVerified === 'true') {
      setShowModal(false);
    }
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Age Verification</h2>
        <p className="mb-6">
          This website sells products that are intended for use by adults who are over the age of 21.
          By entering, you confirm that you are at least 21 years of age.
        </p>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleConfirm}
            className="bg-black text-white px-6 py-3"
          >
            I AM OVER 21
          </button>
          <button
            onClick={handleReject}
            className="bg-gray-300 text-black px-6 py-3"
          >
            I AM UNDER 21
          </button>
        </div>
      </div>
    </div>
  );
};