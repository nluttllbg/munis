import React, { useState } from 'react';
import { Flame } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackTitle,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#18181B] via-[#222226] to-[#131315] text-[#8A867E] p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Flame className="w-8 h-8 text-[#E63926] mb-2 opacity-80" strokeWidth={1.75} />
        {fallbackTitle && (
          <span className="font-display text-sm font-semibold text-[#C4C0B8] text-center">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
