import Reservations from "@/app/_components/Reservations";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import CabinDetail from "@/app/_components/Cabin";
import { CabinParams } from "@/app/_lib/types";

export async function generateMetadata({ params }: CabinParams) {
  const { cabinId } = await params;
  const { name, description } = await getCabin(Number(cabinId));
  return {
    title: `Cabin ${name}`,
    description: description,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: cabin.id.toString() }));
  return ids;
}

export default async function Page({ params }: CabinParams) {
  const { cabinId } = await params;
  const cabin = await getCabin(Number(cabinId));

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6">
      <CabinDetail cabin={cabin} />
      <div>
        <Suspense fallback={<Spinner />}>
          <Reservations cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
