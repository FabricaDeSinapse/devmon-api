-- CreateTable
CREATE TABLE "Creature" (
    "number" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "legendary" BOOLEAN DEFAULT false,
    "evolveToNumber" INTEGER,
    CONSTRAINT "Creature_evolveToNumber_fkey" FOREIGN KEY ("evolveToNumber") REFERENCES "Creature" ("number") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Creature_name_key" ON "Creature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Creature_evolveToNumber_key" ON "Creature"("evolveToNumber");
