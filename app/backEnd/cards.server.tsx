import "server-only"


export type Card = {
  id: string
  name: string
  card_faces?:{
    image_uris?:{
      small: string;
      normal: string;
      large: string;
      png: string;
      art_crop: string;
      border_crop: string;
    }
  }[]
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
export async function getCards(floor = 0, ceiling = 10, page = 1, search="", colors=""): Promise <Card[]> {
  
  const formated_colors = `c:${colors}`


  const wholeQuery = encodeURIComponent(search + " " + formated_colors)

  const myFetch = `https://api.scryfall.com/cards/search?page=${page}&q=${wholeQuery}&unique=cards`

  console.log(myFetch)

  const res = await fetch(
    myFetch, {headers:{
      "User-Agent" : "EveryMTGCard/0.1.0",
    }}
  );


  const data = await res.json() 

  var cards: Card[] = data.data

  if(!cards){
    cards = []
  }

  return cards
}




