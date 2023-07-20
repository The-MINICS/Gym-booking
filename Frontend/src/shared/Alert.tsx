import React from 'react';

type Props = {
  children: React.ReactNode;
  type: string;
}

const Alert = ({ type, children }: Props) => {
  const alertClasses = `px-4 py-2 rounded ${
    type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
  }`;

  return <div className={alertClasses}>{children}</div>;
};

export default Alert;
