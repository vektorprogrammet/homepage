import { apiFetch } from "./client";

interface ContactMessagePayload {
  name: string;
  email: string;
  departmentId: number;
  subject: string;
  message: string;
}

export async function sendContactMessage(
  payload: ContactMessagePayload,
): Promise<void> {
  await apiFetch("/api/contact_messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
