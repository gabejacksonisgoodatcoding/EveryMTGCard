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


  const cards = await getCards(floor, ceiling, page, search, colors)

  console.log("my search = " + search)
  console.log("my cards = " + cards.length)

  return (
    <>

      <Search/>
      <PageTurn/>
      <CardGrid cards={cards}></CardGrid>

    </>
  )
};