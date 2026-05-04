import Image from "next/image";

const reviews = [
  {
    avatar: "/assets/review-poodle-candid.png",
    name: "小熊妈妈",
    meta: "泰迪犬 / 3 岁",
    text: "美容师非常耐心，造型蓬松又可爱，小熊每次洗完都像换了新皮肤，闻起来也很舒服。",
    photoAlt: "小熊回家后的分享照片"
  },
  {
    avatar: "/assets/review-ragdoll-candid.png",
    name: "Luna 麻麻",
    meta: "布偶猫 / 2 岁",
    text: "第一次带猫咪做 SPA，本来担心会应激，结果全程很温柔，回家后毛发顺得发亮。",
    photoAlt: "Luna 回家后的分享照片"
  },
  {
    avatar: "/assets/review-corgi-candid.png",
    name: "豆豆爸比",
    meta: "柯基犬 / 4 岁",
    text: "脚底毛和指甲处理得特别细，豆豆这种不太爱配合的小家伙也被安抚得很好，值得长期来。",
    photoAlt: "豆豆回家后的分享照片"
  }
];

export function Reviews() {
  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-title">
          <span className="eyebrow">💬 宠主分享</span>
          <h2>宠主们喜欢的不只是“洗得干净”</h2>
          <p>环境舒服、沟通耐心、护理细节到位，才会让一次普通洗护变成值得复购的体验。</p>
        </div>
        <div className="reviews">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="review-head">
                <div className="avatar">
                  <Image src={review.avatar} alt={review.name} width={58} height={58} />
                </div>
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.meta}</span>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p>{review.text}</p>
              <div className="review-photo">
                <Image src={review.avatar} alt={review.photoAlt} width={640} height={340} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
