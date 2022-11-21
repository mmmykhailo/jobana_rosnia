-- CreateTable
CREATE TABLE "Chat" (
    "chatId" BIGINT NOT NULL,
    "encounters" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("chatId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_chatId_key" ON "Chat"("chatId");
