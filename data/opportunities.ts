import { OpportunityDto } from "@/types/opportunity"

export const opportunityMockData: OpportunityDto[] = [
  {
    id: "ai-boucher-2026-seoul",
    title: "2026 AI 솔루션 도입 바우처 지원사업",
    organization: "중소벤처기업부",
    summary:
      "AI 도입 초기 단계 기업을 대상으로 솔루션 구매 및 실증 비용을 지원합니다.",
    deadline: "2026-08-05",
    category: "AI",
    supportAmount: "최대 7,000만원",
    region: "서울",
    tags: ["AI", "바우처", "중소기업", "DX"],
    attachments: [
      {
        label: "공고문",
        fileType: "pdf",
        url: "https://example.com/docs/ai-boucher-2026.pdf",
      },
      {
        label: "신청양식",
        fileType: "hwp",
        url: "https://example.com/docs/ai-boucher-form.hwp",
      },
    ],
    url: "https://example.com/opportunities/ai-boucher-2026",
  },
  {
    id: "startup-rnd-boost-2026",
    title: "창업성장기술개발(R&D) 디딤돌 과제",
    organization: "중소기업기술정보진흥원",
    summary:
      "창업 7년 이내 기업의 기술개발 과제를 선정해 개발비를 단계별로 지원합니다.",
    deadline: "2026-07-30",
    category: "RND",
    supportAmount: "최대 1.2억원",
    region: "전국",
    tags: ["R&D", "창업", "기술개발"],
    attachments: [
      {
        label: "사업안내",
        fileType: "pdf",
        url: "https://example.com/docs/startup-rnd-guide.pdf",
      },
    ],
    url: "https://example.com/opportunities/startup-rnd-boost-2026",
  },
  {
    id: "data-voucher-2026-growth",
    title: "데이터 바우처 수요기업 모집",
    organization: "한국데이터산업진흥원",
    summary:
      "데이터 가공 및 구매 바우처를 제공하여 데이터 기반 비즈니스 전환을 지원합니다.",
    deadline: "2026-08-18",
    category: "DATA",
    supportAmount: "최대 4,500만원",
    region: "경기",
    tags: ["데이터", "가공", "바우처"],
    attachments: [
      {
        label: "공고 상세",
        fileType: "pdf",
        url: "https://example.com/docs/data-voucher-2026.pdf",
      },
      {
        label: "FAQ",
        fileType: "link",
        url: "https://example.com/docs/data-voucher-faq",
      },
    ],
    url: "https://example.com/opportunities/data-voucher-2026-growth",
  },
  {
    id: "global-export-package-2026",
    title: "해외진출 패키지(수출 바우처) 일반트랙",
    organization: "대한무역투자진흥공사",
    summary:
      "브랜드 현지화, 바이어 발굴, 통번역, 물류 컨설팅 등 수출 전주기를 지원합니다.",
    deadline: "2026-07-25",
    category: "EXPORT",
    supportAmount: "최대 1억원",
    region: "부산",
    tags: ["해외진출", "수출", "현지화"],
    attachments: [
      {
        label: "모집 공고문",
        fileType: "pdf",
        url: "https://example.com/docs/export-package-2026.pdf",
      },
      {
        label: "신청 포털",
        fileType: "link",
        url: "https://example.com/portal/export-apply",
      },
    ],
    url: "https://example.com/opportunities/global-export-package-2026",
  },
  {
    id: "smart-factory-korea-2026",
    title: "스마트공장 구축 및 고도화 사업",
    organization: "중소벤처기업진흥공단",
    summary:
      "제조 중소기업의 생산관리 시스템, 자동화 장비, 품질관리 체계 고도화를 지원합니다.",
    deadline: "2026-09-01",
    category: "MANUFACTURING",
    supportAmount: "최대 2억원",
    region: "대구",
    tags: ["스마트공장", "제조", "자동화"],
    attachments: [
      {
        label: "세부지침",
        fileType: "docx",
        url: "https://example.com/docs/smart-factory-guideline.docx",
      },
    ],
    url: "https://example.com/opportunities/smart-factory-korea-2026",
  },
  {
    id: "brand-marketing-jumpup-2026",
    title: "브랜드 마케팅 점프업 프로그램",
    organization: "서울경제진흥원",
    summary:
      "D2C 브랜드를 대상으로 퍼포먼스 마케팅, 콘텐츠 제작, 캠페인 운영비를 지원합니다.",
    deadline: "2026-08-12",
    category: "MARKETING",
    supportAmount: "최대 3,000만원",
    region: "인천",
    tags: ["마케팅", "브랜딩", "D2C"],
    attachments: [
      {
        label: "공고문",
        fileType: "pdf",
        url: "https://example.com/docs/marketing-jumpup-2026.pdf",
      },
    ],
    url: "https://example.com/opportunities/brand-marketing-jumpup-2026",
  },
]
