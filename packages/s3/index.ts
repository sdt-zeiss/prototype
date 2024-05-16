import * as Minio from "minio";

const s3 = new Minio.Client({
  endPoint: process.env.S3_URL as string,
  port: 443,
  useSSL: true,
  accessKey: process.env.S3_USERNAME as string,
  secretKey: process.env.S3_PASSWORD as string,
});

export const uploadBuffer = async (buffer: Buffer, key: string) => {
  await s3.putObject(process.env.S3_BUCKET as string, key, buffer);
};

export const getBuffer = async (key: string) => {
  const object = await s3.getObject(process.env.S3_BUCKET as string, key);

  const buffer: Buffer = await new Promise((resolve, reject) => {
    const buffer = [];
    object.on("error", reject);
    object.on("end", () => resolve(Buffer.concat(buffer)));

    object.on("data", (chunk) => {
      buffer.push(chunk);
    });

    object.on("close", () => {
      resolve(Buffer.concat(buffer));
    });
  });

  return buffer;
};
