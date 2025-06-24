// Example content for src/components/ErrorDisplay.tsx
import React from 'react';

interface ErrorDisplayProps {
  title: string;
  message: string;
  showReset?: boolean;
  reset?: () => void;
  errorCode?: string;
  icon?: React.ReactNode;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title,
  message,
  showReset,
  reset,
  errorCode,
  icon,
}) => {
  return (
    <div>
      {icon}
      <h1>{title}</h1>
      <p>{message}</p>
      {errorCode && <p>Error Code: {errorCode}</p>}
      {showReset && reset && <button onClick={reset}>Try Again</button>}
    </div>
  );
};

export const ErrorStateSkullIcon: React.FC = () => {
  return <span>💀</span>; // Example icon
};
