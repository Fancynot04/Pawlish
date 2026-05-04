"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    avatar: "/assets/review-poodle-candid.png",
    name: "小熊妈妈",
    meta: "泰迪犬 / 3 岁",
    text: "美容师非常耐心，造型蓬松又可爱，小熊每次洗完都像换了新皮肤，闻起来也很舒服。",
    photoAlt: "小熊回家后的分享照片",
    tag: "回头客推荐"
  },
  {
    avatar: "/assets/review-ragdoll-candid.png",
    name: "Luna 麻麻",
    meta: "布偶猫 / 2 岁",
    text: "第一次带猫咪做 SPA，本来担心会应激，结果全程很温柔，回家后毛发顺得发亮。",
    photoAlt: "Luna 回家后的分享照片",
    tag: "敏感猫友好"
  },
  {
    avatar: "/assets/review-corgi-candid.png",
    name: "豆豆爸比",
    meta: "柯基犬 / 4 岁",
    text: "脚底毛和指甲处理得特别细，豆豆这种不太爱配合的小家伙也被安抚得很好，值得长期来。",
    photoAlt: "豆豆回家后的分享照片",
    tag: "细节很稳"
  },
  {
    avatar: "/assets/review-poodle-candid.png",
    name: "Momo 姐姐",
    meta: "比熊犬 / 1 岁",
    text: "提前会沟通想要的圆脸效果，修完和参考图几乎一样，拍照特别上镜，连家里人都夸。",
    photoAlt: "Momo 造型完成后的照片",
    tag: "造型还原度高"
  },
  {
    avatar: "/assets/review-ragdoll-candid.png",
    name: "奶芙爸爸",
    meta: "英短猫 / 5 岁",
    text: "店里不会催得很赶，洗护过程也会反馈状态。像我们这种第一次来做深层护理的，会更安心。",
    photoAlt: "奶芙护理完成后的照片",
    tag: "沟通很细致"
  },
  {
    avatar: "/assets/review-corgi-candid.png",
    name: "年糕麻麻",
    meta: "柴犬 / 2 岁",
    text: "原本以为柴犬洗澡会兵荒马乱，结果接回来的时候状态很放松，耳朵和掉毛问题也处理得不错。",
    photoAlt: "年糕回家后的分享照片",
    tag: "接送后状态好"
  }
];

export function Reviews() {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      if (!pausedRef.current) {
        setIndex((prev) => (prev + 1) % reviews.length);
      }
    }, 3600);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-title">
          <span className="eyebrow">💬 宠主分享</span>
          <h2>宠主们喜欢的不只是“洗得干净”</h2>
          <p>环境舒服、沟通耐心、护理细节到位，才会让一次普通洗护变成值得复购的体验。</p>
        </div>
        <div className="reviews-shell">
          <div className="reviews-summary soft-card">
            <div>
              <strong>4.9 / 5.0</strong>
              <span>来自到店宠主的真实反馈</span>
            </div>
            <div className="reviews-summary-tags" aria-label="评价亮点">
              <span>温柔安抚</span>
              <span>造型在线</span>
              <span>护理细致</span>
            </div>
          </div>
          <div
            className="reviews-carousel"
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
            }}
          >
            <div className="reviews-track" style={{ transform: `translateX(-${index * 100}%)` }}>
              {reviews.map((review) => (
                <article className="review-slide" key={review.name}>
                  <div className="review-card">
                    <div className="review-copy">
                      <div className="review-chip">{review.tag}</div>
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
                    </div>
                    <div className="review-photo">
                      <Image src={review.avatar} alt={review.photoAlt} width={640} height={340} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="reviews-controls">
              <button
                className="reviews-button"
                type="button"
                aria-label="上一条评价"
                onClick={() => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
              >
                ‹
              </button>
              <button
                className="reviews-button"
                type="button"
                aria-label="下一条评价"
                onClick={() => setIndex((prev) => (prev + 1) % reviews.length)}
              >
                ›
              </button>
            </div>
          </div>
          <div className="reviews-dots" aria-label="宠主评价轮播导航">
            {reviews.map((review, reviewIndex) => (
              <button
                className={`reviews-dot${reviewIndex === index ? " is-active" : ""}`}
                type="button"
                aria-label={`查看${review.name}的评价`}
                key={review.name}
                onClick={() => setIndex(reviewIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
