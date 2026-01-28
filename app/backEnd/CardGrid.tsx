"use client"
import { useState, useEffect } from "react";
import type { Card } from "./cards.server";

interface RenderCardHoverProps {
  card: Card;
  pos: { x: number; y: number };
}

function RenderCardHover({ card, pos }: RenderCardHoverProps){


  function getCardImageNormal(card: Card){
    let image;
    if (card.image_uris) {
      image = card.image_uris.normal;
    } else if (card.card_faces) {
        image = card.card_faces[0].image_uris.normal;
      }
    return image;
  }

    let image = getCardImageNormal(card);
    const imgWidth = 240;
    const imgHeight = 360;
    const x = Math.min(pos.x + 20, window.innerWidth - imgWidth);
    const y = Math.min(pos.y + 20, window.innerHeight - imgHeight);
    
    return(
        <div className = "fixed z-50 p-2 border-2 pointer-events-none border-white" 
        style={{
        left: x,
        top: y,
        width: 240
      }}>
        <img className = "" src={image} loading="lazy"></img>
        </div>
    )
  }

export default function CardGrid({ cards }: {cards: Card[]}) {

  const [isHovering, setIsHovering] = useState(false);
  const [hoverCard, setHoverCard] = useState<Card>()
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function getCardImageSmall(card: Card) {
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
        {cards.filter(card => card.layout === 'normal').map((card) =>( 
        
        <div 
        onMouseMove={(e) => {
        setPos({
          x: e.clientX,
          y: e.clientY
        });
      }}
      onMouseLeave = {()=>setIsHovering(false)} 
      onMouseEnter = {() => {setIsHovering(true); setHoverCard(card)}} 
      className = "border p-2 flex flex-col items-center"key={card.id} >

        <h1>{card?.name}</h1>
        <a target="_blank" href={card?.purchase_uris?.tcgplayer}>
        <img  className= "w-full h-auto"src={getCardImageSmall(card)} loading="lazy"></img>
        </a>

        </div>))}
    </div>
    {isHovering && hoverCard && <RenderCardHover card={hoverCard} pos={pos} />}
    </>
  );
}


