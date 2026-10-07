import React from 'react';

export default function Header() {
  return (
    <header className="flex w-full shrink-0 flex-col items-start justify-start bg-transparent pt-10 md:mt-45 md:pt-0">
      <p className="normal pb-2 text-4xl font-extralight tracking-normal md:pb-3 md:text-8xl">
        Louis Ryu
      </p>

      <p className="pb-1 text-2xl font-extralight tracking-wide md:pb-2 md:text-[40px]">
        Software Developer
      </p>

      <p className="text-base font-thin tracking-wide md:text-lg">
        Designing across mediums.
      </p>
    </header>
  );
}