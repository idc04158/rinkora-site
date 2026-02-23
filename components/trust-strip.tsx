export function TrustStrip() {
  return (
    <section className="px-6 py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-6xl">

        {/* Metrics */}
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          <div>
            <p className="text-4xl font-bold text-primary">50+</p>
            <p className="mt-2 text-sm text-muted-foreground">
              협업 서비스 기업
            </p>
          </div>

          <div>
            <p className="text-4xl font-bold text-primary">12+</p>
            <p className="mt-2 text-sm text-muted-foreground">
              진행 프로젝트
            </p>
          </div>

          <div>
            <p className="text-4xl font-bold text-primary">20+</p>
            <p className="mt-2 text-sm text-muted-foreground">
              공동 세미나
            </p>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-border" />

        <p className="mb-6 text-center text-xs uppercase tracking-wider text-muted-foreground">
          함께하는 수출 지원 파트너
        </p>

        <div className="logo-wrapper">
          <div className="logo-track">
            <LogoRow />
            <LogoRow />
          </div>
        </div>

      </div>

      <style>{`
        .logo-wrapper {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .logo-track {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }

        .logo-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}

function LogoRow() {
  const logos = [
    "/logo1.png",
    "/logo2.png",
    "/logo3.png",
    "/logo4.jpg",
    "/logo5.jpg",
    "/logo6.png",
    "/logo7.png",
    "/logo8.png",
    "/logo9.png",
  ]

  return (
    <div className="flex items-center gap-20 pr-20">
      {logos.map((src, index) => (
        <div
          key={index}
          className="flex items-center justify-center w-[160px]"
        >
          <img
            src={src}
            alt="partner logo"
            className="h-8 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
          />
        </div>
      ))}
    </div>
  )
}