import React, { useState } from 'react';
import { LinkIcon, CheckIcon } from '@heroicons/react/24/outline';

function CopyRoomButton() {
  const [buttonText, setButtonText] = useState('Share Room');
  const [copied, setCopied] = useState(false);

  const copyUrlToClipboard = () => {
    const appUrl = window.location.href;

    navigator.clipboard.writeText(appUrl)
      .then(() => {
        setButtonText('Copied!');
        setCopied(true);
        setTimeout(() => {
          setButtonText('Share Room');
          setCopied(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Failed to copy URL to clipboard:', error);
      });
  };

  return (
    <button 
      aria-label="Share Room URL" 
      className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl" 
      onClick={copyUrlToClipboard}
    >
      {copied ? <CheckIcon className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      <span>{buttonText}</span>
    </button>
  );
}

export default CopyRoomButton;