-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "edad" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_apellido_key" ON "Usuario"("apellido");
