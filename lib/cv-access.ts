import { createHash, timingSafeEqual } from "node:crypto";

export const CV_ACCESS_COOKIE = "portfolio_cv_access";

const CV_PASSWORD = process.env.CV_PASSWORD ?? "password2005";

function createCVAccessToken() {
  return createHash("sha256")
    .update(`portfolio-cv:${CV_PASSWORD}`)
    .digest("hex");
}

export function getCVAccessToken() {
  return createCVAccessToken();
}

export function isValidCVPassword(password: unknown) {
  if (typeof password !== "string") return false;

  const submitted = Buffer.from(password);
  const expected = Buffer.from(CV_PASSWORD);

  return submitted.length === expected.length && timingSafeEqual(submitted, expected);
}

export function isValidCVAccessToken(token: string | undefined) {
  if (!token) return false;

  const submitted = Buffer.from(token);
  const expected = Buffer.from(createCVAccessToken());

  return submitted.length === expected.length && timingSafeEqual(submitted, expected);
}
