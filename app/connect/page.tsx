"use client";

import { useState } from "react";

type Lang = "EN" | "JP" | "KR";

type ServiceCard = {
  icon: string;
  title: string;
  description: string;
};

type Copy = {
  heroHeadline: string;
  heroDescription: string[];
  tokyoNote: string;
  servicesTitle: string;
  servicesCards: ServiceCard[];
  contentExamplesTitle: string;
  contactTitle: string;
  contactDescription: string;
  viewLabel: string;
};

type ContentExample = {
  type: "newsletter" | "webinar";
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;
  url: string;
};

const EMAIL = "partner@rinkorab2b.com";
const MEETING_URL = "https://calendar.app.google/J4Q8Cz75t1s25jbC7";

const contentExamples: ContentExample[] = [
  {
    type: "newsletter",
    title: {
      KR: "체험단부터 PR까지, 일본 인플루언서 마케팅 A to Z",
      EN: "From Seeding to PR: Japanese Influencer Marketing A to Z",
      JP: "体験団からPRまで、日本インフルエンサーマーケティング A to Z",
    },
    description: {
      KR: "일본 인플루언서 마케팅 전략 웨비나",
      EN: "A webinar about Japanese influencer marketing strategies",
      JP: "日本のインフルエンサーマーケティング戦略ウェビナー",
    },
    image: "/content_newsletter1.png",
    url: "https://event-us.kr/kjbiz/event/108800",
  },
  {
    type: "webinar",
    title: {
      KR: "일본 시장에서 ‘신뢰받는 브랜드’ 만들기",
      EN: "Building a Trusted Brand in the Japanese Market",
      JP: "日本市場で『信頼されるブランド』を作る方法",
    },
    description: {
      KR: "일본 시장 진출 브랜딩 전략 웨비나",
      EN: "A webinar about brand strategy for entering the Japanese market",
      JP: "日本市場参入のためのブランディング戦略ウェビナー",
    },
    image: "/content_webinar1.png",
    url: "https://event-us.kr/kjbiz/event/119989",
  },
  {
    type: "webinar",
    title: {
      KR: "K-코스메틱, 일본시장 성공진출전략",
      EN: "K-Cosmetics: Successful Entry Strategy for the Japanese Market",
      JP: "Kコスメの日本市場成功進出戦略",
    },
    description: {
      KR: "K-뷰티 브랜드의 일본 시장 진출 사례와 전략",
      EN: "Case studies and strategies for K-beauty brands entering Japan",
      JP: "Kビューティーブランドの日本市場進出事例と戦略",
    },
    image: "/content_webinar2.png",
    url: "https://event-us.kr/hostcenter/channel/kjbiz/118581/overview",
  },
];

const translations: Record<Lang, Copy> = {
  EN: {
    heroHeadline: "Helping Korean Brands Enter the Japanese Market",
    heroDescription: [
      "RINKORA helps Korean brands enter the Japanese market by researching and organizing buyer networks, distribution structures, and market insights.",
      "We also connect brands with trusted partners across logistics, certification, payments, and marketing to provide the infrastructure needed for successful expansion into Japan.",
    ],
    tokyoNote: "Currently visiting Tokyo for industry networking.",
    servicesTitle: "What we do",
    servicesCards: [
      {
        icon: "🎤",
        title: "Webinar",
        description: "Industry webinars about Japanese market entry.",
      },
      {
        icon: "📰",
        title: "Newsletter",
        description:
          "Curated market insights for Korean brands expanding to Japan.",
      },
      {
        icon: "✍️",
        title: "Blog Marketing",
        description: "Naver blog marketing management for B2B service companies.",
      },
    ],
    contentExamplesTitle: "Content Examples",
    contactTitle: "Let's connect",
    contactDescription:
      "If you are interested in webinar collaboration, newsletters, or blog marketing services, feel free to contact us.",
    viewLabel: "View",
  },
  JP: {
    heroHeadline: "韓国ブランドの日本市場進出を支援",
    heroDescription: [
      "RINKORAは、日本市場へ進出する韓国ブランドのために",
      "バイヤー、流通構造、市場情報を調査・整理しています。",
      "さらに、物流・認証・決済・マーケティングなど",
      "各分野の専門パートナー企業とブランドをつなぎ、",
      "日本進出に必要な実行インフラを提供しています。",
    ],
    tokyoNote: "現在、業界ネットワーキングのため東京に滞在しています。",
    servicesTitle: "私たちの取り組み",
    servicesCards: [
      {
        icon: "🎤",
        title: "Webinar",
        description: "日本市場参入に関する業界ウェビナー。",
      },
      {
        icon: "📰",
        title: "Newsletter",
        description: "日本進出を目指す韓国ブランド向けの市場インサイト。",
      },
      {
        icon: "✍️",
        title: "Blog Marketing",
        description: "B2Bサービス企業向けNaverブログマーケティング運用。",
      },
    ],
    contentExamplesTitle: "コンテンツ事例",
    contactTitle: "お問い合わせ",
    contactDescription:
      "ウェビナー協業、ニュースレター、ブログマーケティングにご関心がありましたらお気軽にお問い合わせください。",
    viewLabel: "詳細を見る",
  },
  KR: {
    heroHeadline: "한국 브랜드의 일본 시장 진출 지원",
    heroDescription: [
      "린코라는 한국 브랜드의 일본 시장 진출을 위해",
      "바이어, 유통 구조, 시장 정보를 조사하고 정리합니다.",
      "",
      "또한 물류, 인증, 결제, 마케팅 등 다양한 분야의 전문 파트너와",
      "브랜드를 연결하여 일본 진출에 필요한 실행 인프라를 제공합니다.",
    ],
    tokyoNote: "Currently visiting Tokyo for industry networking.",
    servicesTitle: "우리가 하는 일",
    servicesCards: [
      {
        icon: "🎤",
        title: "Webinar",
        description: "일본 시장 진출 관련 산업 웨비나.",
      },
      {
        icon: "📰",
        title: "Newsletter",
        description: "일본 확장을 준비하는 한국 브랜드를 위한 큐레이션 인사이트.",
      },
      {
        icon: "✍️",
        title: "Blog Marketing",
        description: "B2B 서비스 기업 대상 네이버 블로그 마케팅 운영.",
      },
    ],
    contentExamplesTitle: "콘텐츠 예시",
    contactTitle: "문의하기",
    contactDescription: "관심있으시다면 편하게 문의 주세요.",
    viewLabel: "자세히 보기",
  },
};

const languages: Lang[] = ["EN", "JP", "KR"];

export default function ConnectPage() {
  const [currentLang, setCurrentLang] = useState<Lang>("EN");
  const [showToast, setShowToast] = useState(false);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const t = translations[currentLang];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1800);
    } catch {
      setShowToast(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <header className="flex items-center justify-between rounded-xl bg-white px-6 py-5 shadow-sm">
          <div>
            <p className="text-lg font-semibold tracking-[0.2em] text-gray-900">RINKORA</p>
            <p className="mt-1 text-sm text-gray-600">Japan Market Entry Intelligence</p>
          </div>
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            {languages.map((code) => {
              const active = code === currentLang;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrentLang(code)}
                  aria-pressed={active}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {code}
                </button>
              );
            })}
          </div>
        </header>

        <section className="py-12">
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">{t.heroHeadline}</h1>
            <div className="mt-4 max-w-prose space-y-3 text-gray-700 leading-relaxed">
              {t.heroDescription.map((line, index) =>
                line ? <p key={`${line}-${index}`}>{line}</p> : <div key={`space-${index}`} className="h-2" />
              )}
            </div>
            <p className="mt-6 text-sm font-medium text-blue-600">{t.tokyoNote}</p>
          </div>
        </section>

        <section className="py-12">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">{t.servicesTitle}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.servicesCards.map((card) => (
              <article
                key={card.title}
                className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-2xl" aria-hidden>
                  {card.icon}
                </p>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">{t.contentExamplesTitle}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {contentExamples.map((item) => (
              <article
                key={item.url}
                className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative">
                  {brokenImages[item.url] ? (
                    <div className="w-full h-44 bg-gradient-to-br from-blue-100 to-blue-300" />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title[currentLang]}
                      className="w-full h-44 object-cover"
                      onError={() =>
                        setBrokenImages((prev) => ({ ...prev, [item.url]: true }))
                      }
                    />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                    {item.type === "webinar" ? "Webinar" : "Newsletter"}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold leading-snug text-gray-900">
                    {item.title[currentLang]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {item.description[currentLang]}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
                  >
                    {t.viewLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900">{t.contactTitle}</h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-gray-600 sm:text-base">
              {t.contactDescription}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-white font-medium transition hover:bg-blue-600"
              >
                Email
              </button>
              <a
                href={MEETING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-white font-medium transition hover:bg-blue-600"
              >
                Book a Meeting
              </a>
            </div>

            {showToast && <p className="mt-3 text-sm text-blue-600">Email copied</p>}
          </div>
        </section>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p className="font-semibold tracking-[0.2em] text-gray-700">RINKORA</p>
          <p className="mt-2">Data-driven insights for Japan market entry.</p>
        </footer>
      </div>
    </main>
  );
}
