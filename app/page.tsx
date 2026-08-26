import { getCards } from "./backEnd/cards.server"
import CardGrid from "./backEnd/CardGrid";
import PageTurn from "./backEnd/PageTurner"
import Search from "./backEnd/Search";

type SearchParams = {
  [key: string]: string
}

export default async function Page({ searchParams }: {searchParams: Promise<SearchParams>})
{

  //Grab the search params from the url 
  //p = page
  //s = search
  //c = color
  const params = await searchParams
  const page = Number(params?.p ?? "1") 
  const floor = (page - 1) * 1
  const ceiling = page * 10
  const search = params?.s ?? ""
  const colors = params?.c ?? ""
  const advanced = params?.a ?? ""
  const creature_type = params?.t ?? ""


  const cards = await getCards(floor, ceiling, page, search, colors, creature_type, advanced)

  console.log("my search = " + search)
  console.log("my colors = " + colors)
  console.log("Advanced Search = " + advanced)
  console.log("my cards = " + cards.length)
  console.log("my creature type = " + creature_type)
  
  

  return (
    <>

      <Search/>
      <PageTurn/>
      <CardGrid cards={cards}></CardGrid>

    </>
  )
};