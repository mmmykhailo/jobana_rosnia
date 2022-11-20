-- CreateTable
CREATE TABLE "Chat" (
    "chatId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "encounters" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_chatId_key" ON "Chat"("chatId");
