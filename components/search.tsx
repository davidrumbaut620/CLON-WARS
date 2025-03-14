"use client";

import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearch?: (query: string) => void;
  defaultValue?: string;
}

export function Search({ onSearch, defaultValue = "" }: SearchProps) {
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  }, [onSearch]);

  return (
    <div className="w-full max-w-md mx-auto mb-8 relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="search"
        placeholder="Search projects..."
        value={defaultValue}
        onChange={handleSearch}
        className="w-full pl-10 rounded-full border-2 focus-visible:ring-offset-0"
      />
    </div>
  );
}