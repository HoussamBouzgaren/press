import { NewsHeader } from "@/components/news-header"
import { NewsHero } from "@/components/news-hero"
import { NewsGrid } from "@/components/news-grid"
import { NewsFooter } from "@/components/news-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <NewsHeader />
      <NewsHero />
      <NewsGrid />
      <NewsFooter />
    </div>
  )
}
