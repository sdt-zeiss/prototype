/*
  Warnings:

  - You are about to drop the column `authorId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `ageGroup` on the `users` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_postId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "authorId",
DROP COLUMN "postId",
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "post_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "authorId",
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'user_generated';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "ageGroup",
ADD COLUMN     "age_group" TEXT NOT NULL DEFAULT '18-24',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'User';

-- CreateTable
CREATE TABLE "langchain_pg_collection" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "cmetadata" JSON,

    CONSTRAINT "langchain_pg_collection_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "langchain_pg_embedding" (
    "id" VARCHAR NOT NULL,
    "collection_id" UUID,
    "embedding" vector,
    "document" VARCHAR,
    "cmetadata" JSONB,

    CONSTRAINT "langchain_pg_embedding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "langchain_pg_collection_name_key" ON "langchain_pg_collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ix_langchain_pg_embedding_id" ON "langchain_pg_embedding"("id");

-- CreateIndex
CREATE INDEX "ix_cmetadata_gin" ON "langchain_pg_embedding" USING GIN ("cmetadata" jsonb_path_ops);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "langchain_pg_embedding" ADD CONSTRAINT "langchain_pg_embedding_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "langchain_pg_collection"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION;
