import { Metadata } from "next";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: asText(page.data.title),
    description: page.data.meta_description,
  };
}

export default async function Home() {
  const client = createClient();

  const page = await client.getSingle("homepage");

  
  //@ts-ignore
  const buttonLink = page.data.slices[0]?.primary.buttonLink as any



  if(buttonLink.url.includes('http://')){
    throw new Error('http:// is not allowed, please use https://')
  }


  return <SliceZone slices={page.data.slices} components={components} />;
}
