-- Adiciona campos de verificação de email para "users"
ALTER TABLE "users" ADD COLUMN     "verified_email" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verify_token" TEXT;

-- Atualiza os campos recém-adicionados nos usuários já inseridos na base de dados.
UPDATE "users"
SET "verified_email" = TRUE,
    "verify_token" = NULL;