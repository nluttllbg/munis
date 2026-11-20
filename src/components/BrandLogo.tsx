import React from 'react';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="#E63926" />
        <path
          d="M16.4 6.2C16.4 6.2 21.8 10.7 21.8 16.4C21.8 20.1 19.2 23.2 15.8 23.8C17.4 22.3 18.2 20.3 17.8 18.2C17.4 16.1 15.8 14.5 15.8 14.5C15.8 14.5 14.2 16.8 13.8 18.9C13.4 20.7 14.1 22.5 15.3 23.8C11.9 23.2 9.8 20.2 9.8 16.7C9.8 13.7 11.4 11.2 12.8 9.6C12.7 11.4 13.6 12.8 14.8 13.4C14.3 10.6 15.4 7.8 16.4 6.2Z"
          fill="#FAF7F2"
        />
        <path
          d="M15.8 25.8C18.3 25.8 20.5 24.4 21.5 22.4C19.8 23.5 17.8 24.1 15.8 24.1C13.8 24.1 11.8 23.5 10.1 22.4C11.1 24.4 13.3 25.8 15.8 25.8Z"
          fill="#F4A261"
        />
      </svg>
      <span className="font-display text-[19px] font-bold tracking-[-0.02em] text-[#FAF7F2]">
        Moniz Burger
      </span>
    </span>
  );
};
