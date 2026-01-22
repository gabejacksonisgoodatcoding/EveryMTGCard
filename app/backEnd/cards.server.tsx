import "server-only"
import { readFile } from 'fs/promises';
import path from 'path';

export type Card = {
  id: string
  name: string
  card_faces: string
  image_uris:{
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
  
export async function getCards(limit = 10): Promise <Card[]> {

  const filePath = path.join(process.cwd(), 'public', 'default-cards.json');
  const json = await readFile(filePath, 'utf-8');


  const cards: Card[] = JSON.parse(json)

  return(cards.slice(0, limit))
}




