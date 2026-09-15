import type { Metadata } from "next";

import GalleryGrid from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Rallies, briefings, conferences, and coalition work. Moments from the movement.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        mode="mosaic"
        eyebrow="Photo Gallery"
        title="On the Ground"
        lede="Rallies, briefings, conferences, and coalition work. Moments from the movement."
      />

      <section className="bg-white px-8 pb-[90px] pt-16">
        <GalleryGrid />
      </section>
    </>
  );
}
