export type OpportunityCategory =
  | "AI"
  | "RND"
  | "EXPORT"
  | "DATA"
  | "MANUFACTURING"
  | "MARKETING"

export type OpportunityRegion =
  | "전국"
  | "서울"
  | "경기"
  | "인천"
  | "부산"
  | "대구"
  | "대전"

export type OpportunityAttachment = {
  label: string
  fileType: "pdf" | "hwp" | "docx" | "link"
  url: string
}

export type OpportunityDto = {
  id: string
  title: string
  organization: string
  summary: string
  deadline: string
  category: OpportunityCategory
  supportAmount: string
  region: OpportunityRegion
  tags: string[]
  attachments: OpportunityAttachment[]
  url: string
}

export type OpportunitySort = "deadline_asc" | "deadline_desc"

export type OpportunitySearchParams = {
  query?: string
  category?: OpportunityCategory | "ALL"
  region?: OpportunityRegion | "ALL"
  sortByDeadline?: OpportunitySort
}
