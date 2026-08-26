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

function getCardsAdvanced(search="", colors="", page=1){
  var advancedQuery = ""
  advancedQuery += search 
  advancedQuery += `c: ${colors}`
  advancedQuery = encodeURIComponent(advancedQuery)
  return `https://api.scryfall.com/cards/search?page=${page}&q=${advancedQuery}&unique=cards`
}
//Function that calls scryfall api and returns an array of Cards
export async function getCards(floor = 0, ceiling = 10, page = 1, search="", colors="", creature="", advanced=""): Promise <Card[]> {
  
  var myFetch
  var myQuery = ""
  myQuery +=search + " "
  colors ? myQuery +=`c:${colors} ` : myQuery+=""
  creature ? myQuery += `t:${creature} ` : myQuery+=""

  myQuery = encodeURI(myQuery);
  myFetch = `https://api.scryfall.com/cards/search?page=${page}&q=${myQuery}&unique=cards`

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




