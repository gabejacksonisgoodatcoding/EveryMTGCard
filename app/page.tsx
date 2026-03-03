import { getCards } from "./backEnd/cards.server"
import CardGrid from "./backEnd/CardGrid";
import PageTurn from "./backEnd/PageTurner"
import Search from "./backEnd/Search";
import '@/app/globals.css';



export default async function Page({searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
})
{
  const params = await searchParams

  const page = Number(params?.p ?? "1") 
  const floor = (page - 1) * 1
  const ceiling = page * 10
  const search = params?.s ?? ""
  const cards = await getCards(floor, ceiling, page, search) ?? [];

  return (
    <>
      <Search/>
      <PageTurn/>
      <CardGrid cards={cards}></CardGrid>
    </>
  )
};