import Image from "next/image";

const heroPoints = [
  {
    title: "专业团队",
    text: "持证美容师服务，照顾不同体型和毛发需求。"
  },
  {
    title: "安心产品",
    text: "低敏配方洗护用品，敏感皮肤也更放心。"
  },
  {
    title: "贴心跟进",
    text: "护理建议、毛发记录与回访提醒一站完善。"
  }
];

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-wrap">
        <div className="hero-copy">
          <span className="eyebrow">🐾 城市精品宠物洗护空间</span>
          <h1>
            精致洗护
            <br />
            呵护每一次心动
          </h1>
          <p>
            从基础沐浴到美容造型，Pawlish
            为毛孩子提供温柔、干净、专业的一站式宠物护理体验，让每次到店都像一次放松的小旅行。
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              预约到店
            </a>
            <a className="btn btn-secondary" href="#services">
              查看服务
            </a>
          </div>
          <div className="hero-points">
            {heroPoints.map((point) => (
              <div className="point" key={point.title}>
                <strong>{point.title}</strong>
                <span>{point.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="visual-card badge-card">
            <strong>今日主打</strong>
            <span>春日舒缓 SPA 组合，含香氛净洗与耳部护理。</span>
          </div>
          <div className="pet-stage">
            <Image
              src="/assets/hero-pets-scene.png"
              alt="洗护后的贵宾犬和布偶猫"
              fill
              sizes="(max-width: 1100px) 100vw, 50vw"
              className="pet-stage-image"
            />
            <span className="pet-stage-badge">柔软蓬松，拍照也很上镜</span>
          </div>
          <div className="visual-card stat-card">
            <strong>4.9 / 5 好评率</strong>
            <span>累计服务 3,200+ 次，复购会员持续增长。</span>
          </div>
        </div>
      </div>
    </section>
  );
}
