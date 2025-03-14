"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "@/components/search";
import { useCallback } from "react";

interface ClientSearchProps {
  defaultValue?: string;
}

export function ClientSearch({ defaultValue = "" }: ClientSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleSearch = useCallback((query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    
    // Preserve the current scroll position by using replace instead of push
    router.replace(`/?${params.toString()}#search-section`, { scroll: false });
  }, [router, searchParams]);

  return (
    <Search 
      defaultValue={defaultValue}
      onSearch={handleSearch}
    />
  );
}