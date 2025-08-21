import React from 'react';
import { cn } from '@/lib/utils';

interface CircularTextProps {
  text: string;
  className?: string;
  show?: boolean; // control visibility
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  className,
  show,
}) => {
  const id = React.useId(); // unique id for path

  return (
    <div
      className={cn(
        'fixed w-40 h-40 z-[54] pointer-events-none transition-opacity duration-700',
        show ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path
            id={id}
            d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
          />
        </defs>
        <text className="text-[10px] fill-orange-500 uppercase tracking-wider">
          <textPath href={`#${id}`} startOffset="0%">
            {text.repeat(10)}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CircularText;
