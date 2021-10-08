-- CreateTable
CREATE TABLE "Creature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "evolveToId" INTEGER,
    CONSTRAINT "Creature_evolveToId_fkey" FOREIGN KEY ("evolveToId") REFERENCES "Creature" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Creature_number_key" ON "Creature"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Creature_name_key" ON "Creature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Creature_evolveToId_key" ON "Creature"("evolveToId");
