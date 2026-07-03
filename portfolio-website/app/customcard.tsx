import Image, { StaticImageData } from "next/image";

interface CustomCardProps {
  id: string;
  title: string;
  timeline: string;
  description: string;
  tags: string[];
  link: string;
  image?: StaticImageData; // Array of strings
}

export default function CustomCard({
  id,
  title,
  timeline,
  description,
  tags,
  link,
  image,
}: CustomCardProps) {
  return (
    <div className="w-full flex flex-col gap-14">
      <div
        key={id}
        className="w-full max-w-167 flex flex-col items-start text-left"
      >
        {/* Timeline Timestamp */}
        
        <span className="text-[#818181] text-sm tracking-wide ">
          {timeline}
        </span>

        {/* Position Headline */}
        <a
          href={link}
          target="_blank"
          rel=" external"
          className="flex items-center gap-2 group/link text-xl font-normal text-black hover:text-[#575757] transition-colors duration-200 mb-3"
        >
          <h3 className="tracking-tight leading-snug">{title}</h3>

          {/* External Arrow Vector Icon Indicator (Figma Nodes 12:273 and 12:275) */}
          <svg
            className="w-5 h-5 text-black group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform duration-200 ease-out shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>

        {/* Core Impact Descriptions */}
        <p className="text-black text-base leading-relaxed mb-6">
          {description}
        </p>

        {image && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 bg-neutral-100 border border-neutral-200">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-w-768px) 100vw, 668px"
              className="object-cover"
            />
          </div>
        )}

        {/* Tech Stack Skill Pill Badges */}
        <div className="w-full flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="px-4 py-1 bg-[#dfdfdf] border border-[#aeaeae] rounded-full flex items-center justify-center"
            >
              <span className="text-black text-xs font-medium tracking-wide">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
