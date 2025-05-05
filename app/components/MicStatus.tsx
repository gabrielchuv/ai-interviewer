import React from 'react';
import { MdMic, MdMicOff } from "react-icons/md";

interface MicStatusProps {
  isMuted: boolean;
}

/**
 * A component to display the current microphone status
 * Useful for debugging automatic mic muting during AI speech
 */
export function MicStatus({ isMuted }: MicStatusProps) {
  return (
    <div className="fixed top-4 right-4 z-50 bg-gray-800 rounded-lg shadow-lg p-2 flex items-center space-x-2 border border-gray-700">
      {isMuted ? (
        <>
          <MdMicOff className="text-red-500" />
          <span className="text-sm text-red-500">Mic Muted</span>
        </>
      ) : (
        <>
          <MdMic className="text-green-500" />
          <span className="text-sm text-green-500">Mic Active</span>
        </>
      )}
    </div>
  );
} 