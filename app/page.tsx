import { getCards } from "./backEnd/cards.server"
import CardGrid from "./backEnd/CardGrid";
  
export default async function Page() {

  const cards = await getCards(10);

  return (
    <>
      <h1>Cards</h1>
      <CardGrid cards={cards} />
    </>
  )
};