const services = [
  {
    icon: "🛁",
    title: "沐浴护理",
    text: "深层清洁毛发与皮肤，搭配蓬松吹整，让毛量更轻盈柔软，适合日常定期护理。",
    price: "¥128"
  },
  {
    icon: "✂️",
    title: "美容造型",
    text: "根据体型、毛量和性格定制可爱造型，修脸、修脚、修尾巴，镜头里更精致。",
    price: "¥198"
  },
  {
    icon: "🌿",
    title: "舒缓 SPA",
    text: "加入香氛浴、皮毛养护与按摩步骤，帮助缓解紧张情绪，护理过程更放松。",
    price: "¥168"
  },
  {
    icon: "🐾",
    title: "指甲修剪",
    text: "含脚底毛整理、指甲打磨与肉垫检查，适合活泼狗狗与室内猫咪的日常维护。",
    price: "¥68"
  }
];

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-title">
          <span className="eyebrow">🫧 明星服务</span>
          <h2>为毛孩子准备的整套精致护理</h2>
          <p>
            基础清洁、造型修整、深层放松和细节护理都能在这里一次搞定，既舒服也更上镜。
          </p>
        </div>

        <div className="catalog">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="service-meta">
                <div className="service-price">
                  {service.price}
                  <small>起</small>
                </div>
                <a className="btn btn-secondary" href="#contact">
                  预约
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
