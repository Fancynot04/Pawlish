import Image from "next/image";
import { QuickBookingCard } from "@/components/QuickBookingCard";

export function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-shell">
          <div className="footer-copy">
            <strong>Pawlish</strong>
            <p>把洗护这件小事，做成毛孩子会期待、宠主会放心的温柔体验。欢迎提前预约，也欢迎到店咨询合适的护理周期。</p>
            <div className="socials" aria-label="社交平台">
              <span>微</span>
              <span>红</span>
              <span>抖</span>
              <span>店</span>
            </div>
          </div>

          <div className="contact-details">
            <QuickBookingCard />

            <div className="contact-box location-box">
              <div className="contact-list">
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <strong>电话预约</strong>
                    <span>400-888-7295</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">🕙</div>
                  <div>
                    <strong>营业时间</strong>
                    <span>周一至周日 10:00 - 20:00</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <strong>门店地址</strong>
                    <span>中国上海市宝山区南陈路259号（环镇北路南陈路）</span>
                  </div>
                </div>
              </div>
              <h3>到店位置</h3>
              <div className="location-map">
                <Image
                  src="/assets/store-location-map-cute.png"
                  alt="Pawlish 宠物洗护店门店位置地图"
                  fill
                  sizes="(max-width: 1100px) 100vw, 50vw"
                  className="location-map-image"
                />
              </div>
              <span className="location-note">
                中国上海市宝山区南陈路259号（环镇北路南陈路），欢迎提前预约后到店体验。
              </span>
              <a className="btn btn-primary" href="tel:4008887295">
                马上咨询
              </a>
            </div>
          </div>
        </div>
        <div className="copyright">© 2026 Pawlish Pet Grooming Salon. All Rights Reserved.</div>
      </div>
    </section>
  );
}
