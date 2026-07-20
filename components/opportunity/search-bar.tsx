"use client"

import { FormEvent, useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type SearchBarProps = {
  initialValue?: string
  onSearch: (query: string) => void
}

export function SearchBar({ initialValue = "", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="예: AI, 수출, 데이터 바우처"
        className="h-11"
      />
      <Button type="submit" className="h-11 px-6">
        <Search className="h-4 w-4" />
        검색
      </Button>
    </form>
  )
}
