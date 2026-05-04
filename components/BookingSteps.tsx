const steps = [
  {
    icon: "1",
    title: "选择服务",
    text: "根据毛孩子体型、毛发状态和需求，选择合适的洗护项目。"
  },
  {
    icon: "2",
    title: "预约时间",
    text: "选择方便的日期与时段，我们会提前为你预留护理位置。"
  },
  {
    icon: "3",
    title: "填写信息",
    text: "留下宠物昵称、品种与联系方式，方便首次服务前沟通确认。"
  },
  {
    icon: "4",
    title: "到店洗护",
    text: "按时到店，美容师会根据现场状态进行护理建议与流程说明。"
  }
];

export function BookingSteps() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <span className="eyebrow">📅 预约流程</span>
          <h2>预约只要 4 步，轻松安排到店时间</h2>
          <p>我们把沟通流程做得尽量轻巧清晰，让第一次来店的新朋友也能快速上手。</p>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <div className="step" key={step.title}>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
