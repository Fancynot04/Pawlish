"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    theme: "lobby",
    label: "主题 01 · 迎宾前厅",
    title: "从进门开始，就感受到柔和和秩序",
    text: "前厅采用奶油色与薄荷绿搭配，保留等候座位、陈列架与接待台的舒适距离，让第一次到店的宠主也会觉得轻松。",
    features: [
      "圆角接待台与商品展示一体化布局",
      "自然采光、绿植点缀与温暖等候区",
      "适合拍照打卡，也方便快速咨询预约"
    ]
  },
  {
    theme: "wash",
    label: "主题 02 · 洗护专区",
    title: "专业洗护动线清晰，整洁感一眼可见",
    text: "洗护区把清洗、吹整与工具收纳分开组织，减少护理过程中的忙乱感，也让空间看起来更安全、更专业。",
    features: [
      "洗护台、吹毛位和工具墙分区明确",
      "浅色瓷砖和金属设备让清洁感更强",
      "便于不同体型宠物按流程稳定洗护"
    ]
  },
  {
    theme: "spa",
    label: "主题 03 · SPA 泡泡房",
    title: "更安静的护理氛围，适合敏感小朋友",
    text: "这一块更强调放松感和舒缓体验，灯光和软装会更柔和，适合需要慢慢适应环境的猫咪和容易紧张的狗狗。",
    features: [
      "香氛护理、泡泡浴和毛发养护场景更完整",
      "毛巾、器具和护理用品摆放更温和克制",
      "强调“安静护理”而不是高强度周转"
    ]
  },
  {
    theme: "retail",
    label: "主题 04 · 商品角",
    title: "把店里用得好的产品，顺手带回家",
    text: "零售区展示精选洗护用品、梳具和零食，不会堆得太满，既有精品店气质，也方便宠主快速找到想补购的东西。",
    features: [
      "洗护用品、梳具与零食分层陈列",
      "品牌包装统一，视觉上更有精品感",
      "适合做复购推荐和首次到店礼遇展示"
    ]
  }
];

export function StoreEnvironmentCarousel() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPageHidden, setIsPageHidden] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pointerStartXRef = useRef<number | null>(null);
  const isPaused = prefersReducedMotion || isHovered || isFocused || isPageHidden;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageHidden(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4200);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [index, isPaused]);

  return (
    <section className="section" id="space">
      <div className="container">
        <div className="section-title">
          <span className="eyebrow">🏠 门店环境</span>
          <h2>明亮、洁净、带一点柔软香气的护理空间</h2>
          <p>独立洗护区、造型区与休息等候区合理分离，让宠物安心，也让宠主看得放心。</p>
        </div>
        <div className="space-showcase">
          <div
            className="space-carousel"
            data-carousel="space"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onPointerDown={(event) => {
              pointerStartXRef.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (pointerStartXRef.current === null) {
                return;
              }

              const deltaX = event.clientX - pointerStartXRef.current;
              pointerStartXRef.current = null;

              if (Math.abs(deltaX) < 48) {
                return;
              }

              if (deltaX > 0) {
                setIndex((prev) => (prev - 1 + slides.length) % slides.length);
                return;
              }

              setIndex((prev) => (prev + 1) % slides.length);
            }}
            onPointerCancel={() => {
              pointerStartXRef.current = null;
            }}
          >
            <div className="space-status" aria-live="polite">
              <span>门店导览</span>
              <strong>
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </strong>
            </div>
            <div className="space-track" style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}>
              {slides.map((slide, slideIndex) => (
                <article
                  className="space-slide"
                  key={slide.theme}
                  aria-hidden={slideIndex !== index}
                >
                  <div
                    className="space-media"
                    data-theme={slide.theme}
                    role="img"
                    aria-label={slide.label}
                  />
                  <div className="space-panel">
                    <span className="space-theme">{slide.label}</span>
                    <h3>{slide.title}</h3>
                    <p>{slide.text}</p>
                    <div className="space-feature">
                      {slide.features.map((feature) => (
                        <span key={feature}>{feature}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="space-controls">
              <button
                className="space-button"
                type="button"
                aria-label="上一张"
                onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
              >
                ‹
              </button>
              <button
                className="space-button"
                type="button"
                aria-label="下一张"
                onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
              >
                ›
              </button>
            </div>
          </div>
          <div className="space-dots" aria-label="门店环境轮播导航">
            {slides.map((slide, slideIndex) => (
              <button
                className={`space-dot${slideIndex === index ? " is-active" : ""}`}
                type="button"
                data-slide={slideIndex}
                aria-label={`查看${slide.label}`}
                aria-pressed={slideIndex === index}
                key={slide.theme}
                onClick={() => setIndex(slideIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
