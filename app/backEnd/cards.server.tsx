import "server-only"
import { readFile } from 'fs/promises';
import path from 'path';
import { encode } from "punycode";

export type Card = {
  id: string
  name: string
  card_faces: string
  layout: string
  image_uris?: {
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
//Function that calls scryfall api and returns an array of Cards
export async function getCards(floor = 0, ceiling = 10, page = 1, search=""): Promise <Card[]> {

  const encodedSearch = encodeURIComponent(search)
  const res = await fetch(
    `https://api.scryfall.com/cards/search?page=${page}&q=${encodedSearch}&unique=cards`
  );
  const data = await res.json() 


  const cards: Card[] = data.data

  return(cards)
}




