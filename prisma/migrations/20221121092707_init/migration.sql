-- CreateTable
CREATE TABLE "Chat" (
    "chatId" BIGINT NOT NULL PRIMARY KEY,
    "encounters" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_chatId_key" ON "Chat"("chatId");
