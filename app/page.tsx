'use client'

import { useEffect, useState } from "react";


export default function Home() {



  type Card = {
    name: string
    image_uris?:{
      small: string;
      normal: string;
      large: string;
      png: string;
      art_crop: string;
      border_crop: string;
    }
    purchase_uris?: {
      tcgplayer: string;
      cardmarket: string;
      cardhoarder: string;
    }

  }
  const [cards, setCards] = useState<Card[]>([]);
  const [display, setDisplay] = useState<Card[]>([])


  useEffect(() =>{
    fetch('/default-cards.json').then(res => res.json()).
    then((data: Card | Card[]) => {
      const allCards = Array.isArray(data) ? data : [data];
      setCards(allCards);
      setDisplay(allCards.slice(0, 10));
      }).catch(console.error);

    

  }, []);



  function displayCards(){
    

    return display.map((card) =>(
    <div key={card.name}>
    <h1>{card?.name}</h1>
    <a target="_blank" href={card?.purchase_uris?.tcgplayer}>
      <img src={card?.image_uris.small}></img>
    </a>
    </div>
    ));
  }


  return (
    <>
    {displayCards()}
    </>
  );
}
