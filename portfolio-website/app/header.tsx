import React from 'react';

export default function Header() {
  return (
    <header className="w-full flex flex-col justify-start items-start bg-transparent mt-45">
      <p className="normal text-8xl font-extralight pb-3 tracking-normal">
        Louis Ryu
      </p>

      <p className="font-extralight text-[40px] pb-2 tracking-wide">
        Software Developer
      </p>

        <p className="font-thin tracking-wide text-lg">
        Designing across mediums.
      </p>
    </header>
  );
}