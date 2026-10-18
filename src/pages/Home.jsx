import Hero from '../components/home/Hero'
import BooksSection from '../components/home/BooksSection'
import GamesSection from '../components/home/GamesSection'
import NewsSection from '../components/home/NewsSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <BooksSection />
      <GamesSection />
      <NewsSection />
    </main>
  )
}
