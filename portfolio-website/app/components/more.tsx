import React from "react";
import CustomCard from "../customcard";
import CariemLogo from "@/public/cursiveoverlaygraphic-black.png";

const MORE_DATA = [
    {
      id: 'cariem',
      title: 'Clothing Brand Business - Cariem',
      timeline: '2025 - Present',
      description: 'Owned and operated a clothing brand handling meta ads, photoshop/illustrator design, marketing shoots, email & sms marketing, and shopify store management.',
      tags: ["Meta Ads", "Shopify", "Photoshop", "Illustrator", "Klaviyo"],
      link: "https://cariemonline.com",
      image: CariemLogo,
    },
    
  ];

export default function More() {
  return (
    <section className="flex flex-col justify-start items-start select-none font-extralight">
      <h2 className="text-3xl tracking-tight text-black mb-12 ">more</h2>

      <div className="w-full flex flex-col gap-14">
        {MORE_DATA.map((el) => (
            <CustomCard
                key={el.id}
                id={el.id}
                title={el.title}
                timeline={el.timeline}
                description={el.description}
                tags={el.tags}
                link={el.link}
                image={el.image}
                />
          ))}
      </div>
    </section>
  );
}
