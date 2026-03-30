import { ImageResponse } from "next/og";
import {
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_SIZE,
  SocialImage,
} from "@/app/social-image";

export const runtime = "edge";
export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<SocialImage />, {
    ...SOCIAL_IMAGE_SIZE,
  });
}
