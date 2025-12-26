"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FilterType } from "../_lib/types";

const filters: FilterType[] = ["all", "small", "medium", "large"];

type FilterProps = {
  currentFilter: FilterType;
};

const Filter = ({ currentFilter }: FilterProps) => {
  const [active, setActive] = useState<FilterType>(currentFilter);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (filter: FilterType) => {
    setActive(filter);

    // create new URLSearchParams object
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);

    // update the URL (imperative navigation)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex mb-8 border border-primary-700 rounded-sm overflow-hidden">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleClick(filter)}
          className={`
            px-4 py-2 font-medium transition-colors 
            ${
              active === filter
                ? "bg-primary-400 text-primary-900"
                : "hover:bg-primary-700 text-primary-200"
            }
          `}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Filter;
