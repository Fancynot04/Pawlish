"use client";

import { FormEvent, useMemo, useState } from "react";

type BookingForm = {
  contactName: string;
  phone: string;
  petType: string;
  service: string;
  notes: string;
};

type SubmitState =
  | { status: "idle"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialForm: BookingForm = {
  contactName: "",
  phone: "",
  petType: "小型犬",
  service: "基础洗护",
  notes: ""
};

const petOptions = ["小型犬", "中型犬", "大型犬", "猫咪", "其他宠物"];
const serviceOptions = ["基础洗护", "精致洗护", "美容造型", "驱虫护理", "指甲与耳部护理"];

function normalizePhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 11);
}

function isValidPhone(value: string) {
  return /^1\d{10}$/.test(value);
}

export function QuickBookingCard() {
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneHint = useMemo(() => {
    if (!form.phone) {
      return "提交后门店会在 10 分钟内确认细节。";
    }

    return isValidPhone(form.phone) ? "手机号格式正确，可用于短信通知。" : "请输入 11 位中国大陆手机号。";
  }, [form.phone]);

  const canOpenConfirm =
    form.contactName.trim().length > 0 && isValidPhone(form.phone) && form.petType && form.service;

  function updateField<K extends keyof BookingForm>(key: K, value: BookingForm[K]) {
    setForm((current) => ({
      ...current,
      [key]: key === "phone" ? normalizePhone(value as string) : value
    }));
    setSubmitState({ status: "idle", message: "" });
  }

  function handlePreviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canOpenConfirm) {
      setSubmitState({
        status: "error",
        message: "请先填写联系人和正确手机号，再选择宠物类型与服务项目。"
      });
      return;
    }

    setIsConfirmOpen(true);
  }

  async function handleConfirmBooking() {
    setIsSubmitting(true);
    setSubmitState({ status: "idle", message: "" });

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "预约发送失败，请稍后重试。");
      }

      setSubmitState({
        status: "success",
        message: data.message || "预约短信已发送，门店会尽快与你确认。"
      });
      setForm(initialForm);
      setIsConfirmOpen(false);
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "预约发送失败，请稍后重试。"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="contact-box booking-box">
        <div className="booking-header">
          <span className="booking-pill">快速预约</span>
          <h3>填写信息并确认后自动发送短信</h3>
          <p>提交后门店会收到预约短信，工作人员会尽快与你电话或短信确认到店时间。</p>
        </div>

        <form className="booking-form" onSubmit={handlePreviewSubmit}>
          <label className="booking-field">
            <span>联系人</span>
            <input
              type="text"
              placeholder="你的称呼"
              value={form.contactName}
              onChange={(event) => updateField("contactName", event.target.value)}
            />
          </label>

          <label className="booking-field">
            <span>手机号</span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="13800000000"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </label>

          <label className="booking-field">
            <span>宠物类型</span>
            <select value={form.petType} onChange={(event) => updateField("petType", event.target.value)}>
              {petOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="booking-field">
            <span>服务项目</span>
            <select value={form.service} onChange={(event) => updateField("service", event.target.value)}>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="booking-field booking-field-full">
            <span>备注</span>
            <textarea
              rows={4}
              placeholder="例如：怕吹风、容易紧张、需要修指甲"
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
            />
          </label>

          <div className="booking-foot">
            <p className={isValidPhone(form.phone) || !form.phone ? "booking-hint" : "booking-hint is-error"}>
              {phoneHint}
            </p>
            <button className="btn booking-submit" type="submit">
              发送预约
            </button>
          </div>
        </form>

        {submitState.message ? (
          <div className={`booking-toast is-${submitState.status}`}>{submitState.message}</div>
        ) : null}
      </div>

      {isConfirmOpen ? (
        <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-confirm-title">
          <div className="booking-modal-card">
            <div className="booking-modal-head">
              <span className="booking-pill">确认预约</span>
              <h4 id="booking-confirm-title">请确认短信预约信息</h4>
              <p>确认后将自动向门店发送预约短信。</p>
            </div>

            <div className="booking-summary">
              <div>
                <span>联系人</span>
                <strong>{form.contactName}</strong>
              </div>
              <div>
                <span>手机号</span>
                <strong>{form.phone}</strong>
              </div>
              <div>
                <span>宠物类型</span>
                <strong>{form.petType}</strong>
              </div>
              <div>
                <span>服务项目</span>
                <strong>{form.service}</strong>
              </div>
              <div className="booking-summary-notes">
                <span>备注</span>
                <strong>{form.notes.trim() || "无特别备注"}</strong>
              </div>
            </div>

            <div className="booking-modal-actions">
              <button className="btn btn-secondary" type="button" onClick={() => setIsConfirmOpen(false)}>
                返回修改
              </button>
              <button className="btn booking-submit" type="button" disabled={isSubmitting} onClick={handleConfirmBooking}>
                {isSubmitting ? "发送中..." : "确认并发送短信"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
