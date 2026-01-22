"use client"

import type { Card } from "./cards.server";

export default function CardGrid({ cards }: {cards: Card[]}) {

  function getCardImage(card: Card) {
    let image;
    if (card.image_uris) {
      image = card.image_uris.small;
    } else if (card.card_faces) {
      image = card.card_faces[0].image_uris.small;
    }
    return image;
  }

  return (
    <>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 justify-start items-start">
        {cards.map((card) =>(
        
        <div className = "border p-2 flex flex-col items-center"key={card.id} >
        <h1>{card?.name}</h1>
        <a target="_blank" href={card?.purchase_uris?.tcgplayer}>
        <img className= "w-full h-auto"src={getCardImage(card)}></img>
        </a>
        </div>))}

    </div>

    </>
  );
}


