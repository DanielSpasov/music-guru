import { FC } from 'react';

import { PlayerProps } from '../types';
import { Vinyl } from './Vinyl';

export const Player: FC<PlayerProps> = ({
  color = 'bg-primary',
  vinylColor
}) => {
  return (
    <div
      className={`relative w-96 h-64 rounded-md ${color}`}
      data-testid="loader-player"
    >
      {/* 2 Circle buttons on the left */}
      <div className="absolute top-3 left-3 bg-neutral-900 w-8 h-8 rounded-full" />
      <div className="absolute bottom-3 left-3 bg-neutral-900 w-8 h-8 rounded-full" />

      {/* Vinyl Record */}
      <Vinyl color={vinylColor} size="lg" onPlayer />

      {/* Needle */}
      <div className="absolute bg-neutral-900 h-12 w-12 rounded-full top-2 right-16 animate-wiggle">
        <div className="absolute bg-neutral-950 h-4 w-4 rounded-full top-4 right-4" />

        <div>
          <div className="absolute rounded-sm bg-neutral-50 w-28 h-[10px] rotate-[-60deg] right-[8px] top-[88px]" />
          <div className="absolute rounded-sm bg-neutral-50 w-10 h-[10px] rotate-[-20deg] right-[87px] top-[140px]" />
          <div className="absolute rounded-sm bg-neutral-400 w-6 h-[18px] rotate-[-20deg] right-[110px] top-[141px]" />
        </div>
      </div>

      {/* Volume Control */}
      <div className="absolute bg-neutral-950 h-32 w-10 bottom-16 right-6 rounded-md">
        <div className="absolute bg-neutral-900 w-1 h-28 top-2 left-[18px] rounded-sm" />
        <div className="absolute bg-neutral-800 w-8 h-4 bottom-8 left-1 rounded-sm" />
      </div>

      {/* Stop Button */}
      <div className="absolute bg-neutral-900 h-10 w-10 bottom-3 right-6 rounded-full" />
    </div>
  );
};
