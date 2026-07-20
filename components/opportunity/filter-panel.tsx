"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  OpportunityCategory,
  OpportunityRegion,
  OpportunitySort,
} from "@/types/opportunity"

type FilterPanelProps = {
  categories: OpportunityCategory[]
  regions: OpportunityRegion[]
  selectedCategory: OpportunityCategory | "ALL"
  selectedRegion: OpportunityRegion | "ALL"
  selectedSort: OpportunitySort
  onCategoryChange: (value: OpportunityCategory | "ALL") => void
  onRegionChange: (value: OpportunityRegion | "ALL") => void
  onSortChange: (value: OpportunitySort) => void
}

export function FilterPanel({
  categories,
  regions,
  selectedCategory,
  selectedRegion,
  selectedSort,
  onCategoryChange,
  onRegionChange,
  onSortChange,
}: FilterPanelProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Select
        value={selectedCategory}
        onValueChange={(value) =>
          onCategoryChange(value as OpportunityCategory | "ALL")
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="카테고리" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">전체 카테고리</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedRegion}
        onValueChange={(value) => onRegionChange(value as OpportunityRegion | "ALL")}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="지역" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">전체 지역</SelectItem>
          {regions.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedSort}
        onValueChange={(value) => onSortChange(value as OpportunitySort)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="마감일 정렬" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="deadline_asc">마감일 임박순</SelectItem>
          <SelectItem value="deadline_desc">마감일 최신순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
