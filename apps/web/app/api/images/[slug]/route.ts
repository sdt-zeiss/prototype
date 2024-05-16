import { getBuffer } from "s3";
import sharp from "sharp";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const imageId = request.url.split("/").pop();

  const image = await getBuffer(imageId);

  const transformedImage = await sharp(image)
    .webp() // it should be saved as webp anyway, but just in case
    .resize(1000, 600)
    .toBuffer();

  return new Response(transformedImage, {
    headers: {
      "content-type": "image/webp",
    },
  });
}
