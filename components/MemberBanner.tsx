const memberTags = ["洗护 9 折", "生日礼遇", "优先预约", "专属护理档案"];

export function MemberBanner() {
  return (
    <section className="section" id="member">
      <div className="container">
        <div className="member-banner">
          <div className="member-card">
            <strong>Pawlish</strong>
            <span>
              MEMBER
              <br />
              年度会员享受专属折扣、生日礼遇和优先预约。
            </span>
          </div>
          <div className="member-copy">
            <h3>加入会员，享受更多专属宠爱</h3>
            <p>
              如果你希望更规律地安排洗护周期，会员体系会更合适。价格更划算，护理记录也会更完整，适合长期精细照顾毛孩子的家庭。
            </p>
            <div className="member-tags">
              {memberTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <a className="btn btn-primary" href="#contact">
            立即开通
          </a>
        </div>
      </div>
    </section>
  );
}
