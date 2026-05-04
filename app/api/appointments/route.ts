import { NextResponse } from "next/server";

type BookingPayload = {
  contactName?: string;
  phone?: string;
  petType?: string;
  service?: string;
  notes?: string;
};

function isValidPhone(value: string) {
  return /^1\d{10}$/.test(value);
}

function buildSmsBody(payload: Required<BookingPayload>) {
  return [
    "【Pawlish预约】新预约申请",
    `联系人：${payload.contactName}`,
    `手机号：${payload.phone}`,
    `宠物类型：${payload.petType}`,
    `服务项目：${payload.service}`,
    `备注：${payload.notes || "无"}`
  ].join("\n");
}

async function sendViaTwilio(message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_FROM_PHONE;
  const notifyPhone = process.env.PAWLISH_BOOKING_NOTIFY_PHONE;

  if (!accountSid || !authToken || !fromPhone || !notifyPhone) {
    return {
      delivered: false,
      simulated: true
    };
  }

  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  const body = new URLSearchParams({
    To: notifyPhone,
    From: fromPhone,
    Body: message
  });

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`短信发送失败：${errorText}`);
  }

  return {
    delivered: true,
    simulated: false
  };
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as BookingPayload;

    const normalized = {
      contactName: payload.contactName?.trim() || "",
      phone: payload.phone?.replace(/\D/g, "") || "",
      petType: payload.petType?.trim() || "",
      service: payload.service?.trim() || "",
      notes: payload.notes?.trim() || ""
    };

    if (!normalized.contactName || !isValidPhone(normalized.phone) || !normalized.petType || !normalized.service) {
      return NextResponse.json(
        {
          message: "预约信息不完整，请检查联系人、手机号、宠物类型和服务项目。"
        },
        { status: 400 }
      );
    }

    const smsBody = buildSmsBody(normalized);
    const result = await sendViaTwilio(smsBody);

    return NextResponse.json({
      message: result.simulated
        ? "预约信息已记录。当前未配置短信服务，已在开发环境完成模拟发送。"
        : "预约短信已发送成功，门店会尽快与你确认。"
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "预约发送失败，请稍后重试。"
      },
      { status: 500 }
    );
  }
}
