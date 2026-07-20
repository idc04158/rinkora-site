export const brand = {
  name: "Rinkora",
  nameKo: "린코라",
  tagline: "Growth Opportunity Platform",
  taglineKo: "기업 성장 기회 플랫폼",
  description:
    "린코라는 기업 성장에 필요한 기회를 연결하는 플랫폼입니다. 지원사업 검색부터 AI 추천, 전문가 매칭, 해외진출까지 이어지는 성장 여정을 제공합니다.",
}

export const diagnosisLabels = {
  primary: "무료 일본 진출 진단",
  secondary: "일본 진출 준비도 확인하기",
  start: "무료 일본 진출 진단 시작하기",
  checkStage: "우리 브랜드 준비도 확인하기",
} as const

export const successMetrics = [
  { value: "700+", label: "누적 브랜드 리드" },
  { value: "300+", label: "누적 상담" },
  { value: "13+", label: "전문 분야" },
  { value: "10+", label: "운영 웨비나" },
] as const

export const whyExpansionHubReasons = [
  {
    title: "정보는 많지만, 방향은 없습니다",
    description:
      "일본 진출 정보는 넘쳐나지만, 우리 브랜드에 맞는 우선순위와 순서를 정하기 어렵습니다.",
  },
  {
    title: "분야마다 다른 전문가를 찾아야 합니다",
    description:
      "물류, 인증, 마케팅, 유통—각각 다른 업체를 찾고 조율하는 과정 자체가 진출의 장벽이 됩니다.",
  },
  {
    title: "검증 없이 선택하면 리스크가 큽니다",
    description:
      "실적과 역량을 확인하기 전에 파트너를 선택하면, 비용과 시간을 잃을 수 있습니다.",
  },
  {
    title: "그래서 운영체계가 필요합니다",
    description:
      "누가, 언제, 어떤 순서로 연결해야 하는지를 설계하고 관리하는 허브가 있어야 일본 진출이 실행됩니다.",
  },
] as const

export const expansionJourneySteps = [
  {
    step: "01",
    title: "일본 시장에 진출해도 될까?",
    description:
      "우리 브랜드·제품이 일본 시장에 맞는지, 지금이 적기인지부터 고민합니다.",
  },
  {
    step: "02",
    title: "무엇부터 준비해야 할까?",
    description:
      "현지화, 가격, 포지셔닝—어디서부터 손대야 할지 막막할 때가 많습니다.",
  },
  {
    step: "03",
    title: "인증·규제, 정말 필요한가?",
    description:
      "PSE, 식품·화장품 규제, 통관—내 카테고리에 무엇이 필요한지 불분명합니다.",
  },
  {
    step: "04",
    title: "물류와 재고, 어떻게 가져가야 할까?",
    description:
      "배송, 통관, 3PL—실물이 움직이기 시작하면 변수가 급격히 늘어납니다.",
  },
  {
    step: "05",
    title: "어디서 팔아야 할까?",
    description:
      "EC, 리테일, D2C—채널 선택과 입점 전략을 정하지 못하면 실행이 멈춥니다.",
  },
  {
    step: "06",
    title: "일본 소비자에게 어떻게 알릴까?",
    description:
      "현지 마케팅, PR, 인플루언서—브랜드 인지도를 쌓는 방법을 모릅니다.",
  },
  {
    step: "07",
    title: "진출 이후, 어떻게 성장시킬까?",
    description:
      "첫 매출 이후 KPI 관리, 채널 확대, 현지화 심화까지 이어갈 체계가 필요합니다.",
  },
] as const

export const hubOperatingSteps = [
  {
    step: "01",
    title: "진단",
    period: "1–2주",
    description: "브랜드 현황과 일본 진출 준비도를 함께 파악합니다.",
    output: "진출 준비 진단 리포트",
  },
  {
    step: "02",
    title: "로드맵 설계",
    period: "2–4주",
    description: "단계별 우선순위와 일정을 브랜드 상황에 맞게 설계합니다.",
    output: "맞춤형 진출 로드맵",
  },
  {
    step: "03",
    title: "전문가 연결",
    period: "2–4주",
    description: "필요한 시점에 검증된 전문가를 연결합니다. (상담 후 공개)",
    output: "실행 전문가 매칭",
  },
  {
    step: "04",
    title: "실행 지원",
    period: "3개월~",
    description: "진행 상황을 관리하며 실행이 멈추지 않도록 돕습니다.",
    output: "실행 관리 & 이슈 대응",
  },
  {
    step: "05",
    title: "성과 관리",
    period: "지속",
    description: "KPI를 점검하고 다음 단계를 함께 설계합니다.",
    output: "성과 리뷰 & 확장 전략",
  },
] as const

export const verificationOperations = [
  {
    title: "분야별 검증 기준",
    description:
      "13개 전문 분야마다 실적, 일본 현지 역량, 레퍼런스를 기준으로 심사합니다. 회사 목록을 공개하는 것이 아니라, 연결 전 품질을 보장하는 체계입니다.",
  },
  {
    title: "단계별 연결 관리",
    description:
      "브랜드의 진출 단계에 맞춰, 필요한 시점에 필요한 분야의 전문가를 연결합니다. 무작위 추천이 아니라 로드맵 기반 연결입니다.",
  },
  {
    title: "지속적 품질 관리",
    description:
      "브랜드 피드백, 정기 리뷰, 네트워크 갱신을 통해 실행 품질을 관리합니다. 한 번 연결하고 끝이 아닙니다.",
  },
] as const

export const partnerNetworkFields = [
  "시장 진입 전략",
  "마케팅·PR",
  "이커머스 운영",
  "물류·3PL",
  "통관·인증",
  "법률·행정",
  "상표·지재권",
  "번역·현지화",
  "결제·정산",
  "오프라인·리테일",
  "크리에이티브·디자인",
  "인플루언서·SNS",
  "데이터·분석",
] as const

export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const mainNavigation: NavItem[] = [
  { label: "지원사업", href: "/grants" },
  { label: "AI 추천", href: "/ai/recommend" },
  { label: "신청가이드", href: "/resources" },
  { label: "로그인", href: "/auth/login" },
]

export const footerNavigation = {
  growth: [
    { label: "지원사업 검색", href: "/grants" },
    { label: "회원 혜택", href: "/#member-benefits" },
    { label: "사업자 인증", href: "/verify" },
    { label: "AI 추천", href: "/ai/recommend" },
  ],
  services: [
    { label: "서비스 카테고리", href: "/#services" },
    { label: "해외진출 (일본)", href: "/expansion" },
    { label: "마케팅", href: "/services/marketing" },
    { label: "법률/행정", href: "/services/legal" },
  ],
  content: [
    { label: "시장 뉴스", href: "/news" },
    { label: "인사이트 컬럼", href: "/insights/column" },
    { label: "리포트", href: "/reports" },
    { label: "웨비나", href: "/webinar" },
  ],
  company: [
    { label: "린코라 소개", href: "/about" },
    { label: "파트너 네트워크 참여", href: "/partner" },
    { label: "문의하기", href: "/contact" },
  ],
} as const
