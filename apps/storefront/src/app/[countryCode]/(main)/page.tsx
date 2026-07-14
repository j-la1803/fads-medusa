import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "FADS Medusa Storefront Proof of Concept",
  description:
    "Testing Medusa as a commerce engine for Fred Astaire Dance Studios.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  return (
    <>
      <section className="bg-gray-100 px-6 py-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          FADS Medusa Storefront Proof of Concept
        </h1>

        <p className="text-lg text-gray-600">
          Testing Medusa as a commerce engine for Fred Astaire Dance Studios.
        </p>
      </section>

      <Hero />

      {region && collections?.length > 0 && (
        <div className="py-12">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      )}
    </>
  )
}