"use client"

import type { Card } from "./cards.server";

export default function CardGrid({ cards }: {cards: Card[]}) {


  return (
    <>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 justify-start items-start">
        {cards.map((card) =>(
        <div className = "border p-2 flex flex-col items-center"key={card.name} >
        <h1>{card?.name}</h1>
        <a target="_blank" href={card?.purchase_uris?.tcgplayer}>
        <img className= "w-full h-auto"src={card?.image_uris.small}></img>
        </a>
        </div>))}
        
    </div>

    </>
  );
}


