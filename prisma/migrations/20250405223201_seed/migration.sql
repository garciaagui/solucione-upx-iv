-- Inserindo usuários
INSERT INTO "users" (id, name, email, password, role, created_at, updated_at) VALUES
  (1, 'João Silva', 'joao@example.com', '123456', 'admin', NOW(), NOW()),
  (2, 'Maria Oliveira', 'maria@example.com', '123456', 'employee', NOW(), NOW()),
  (3, 'Carlos Santos', 'carlos@example.com', '123456', 'user', NOW(), NOW()),
  (4, 'Ana Moares', 'ana@example.com', '123456', 'user', NOW(), NOW());

-- Inserindo ocorrências
INSERT INTO "occurrences" (id, title, description, neighborhood, street, zip_code, reference, status, image, user_id, created_at, updated_at) VALUES
  (1, 'Vazamento de água na rua principal', 'Há um vazamento de água na calçada em frente ao supermercado.', 'Centro', 'Rua Principal', '25.689-420', 'Em frente ao estacionamento da praça', 'Finalizado', 'https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/vazamento-agua.jpg', 3, '2024-01-01T12:00:00', NOW()),
  (2, 'Lâmpada queimada no parque', 'Uma das lâmpadas do poste no parque está queimada, deixando a área escura à noite.', 'Vila Nova', 'Rua das Flores', '56.812-350', 'Próximo à esquina', 'Aberto', 'https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/lampada-queimada.jpg', 4, '2024-01-02T10:00:00', NOW()),
  (3, 'Bueiro entupido na esquina', 'O bueiro na esquina da Rua das Flores está entupido e causando alagamentos.', 'Jardim América', 'Avenida Central', '12.398-501', '', 'Andamento', 'https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/bueiro-entupido.jpeg', 4, '2024-01-03T08:00:00', NOW()),
  (4, 'Passeio com buracos na Avenida Central', 'Os buracos no passeio estão representando um perigo para os pedestres.', 'Jardim Botânico', 'Rua das Árvores', '98.145-710', 'Próximo à escola', 'Aberto', 'https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/passeio-buracos.jpg', 3, '2024-01-04T15:00:00', NOW()),
  (5, 'Falta de coleta de lixo na Vila dos Pássaros', 'O caminhão de lixo não passa pela Vila dos Pássaros há uma semana.', 'Parque Industrial', 'Rua dos Industriais', '00.150-658', '', 'Andamento', 'https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/coleta-lixo.jpg', 3, '2024-01-05T14:30:00', NOW());

-- Inserindo respostas das ocorrências
INSERT INTO "occurrences_replies" (id, description, image_url, user_id, occurrence_id, occurrence_status, created_at, updated_at) VALUES
  (1, 'Problema localizado e o conserto foi agendado para amanhã.', '', 2, 1, 'Andamento', '2024-01-06T00:00:00', NOW()),
  (2, 'Após vazamento de água na rua principal, nossa equipe respondeu prontamente, localizou e reparou a fonte, com medidas preventivas para evitar recorrências. Priorizamos a rápida resolução para garantir o bem-estar da comunidade', 'https://pub-373564433a1a4faebf35e76ccb084c38.r2.dev/conserto-vazamento-agua.jpg', 2, 1, 'Finalizado', '2024-01-08T00:00:00', NOW()),
  (3, 'A equipe de manutenção está trabalhando para resolver o problema.', '', 2, 3, 'Andamento', '2024-01-05T00:00:00', NOW()),
  (4, 'O departamento responsável foi informado e em breve traremos uma solução.', '', 2, 5, 'Andamento', '2024-01-06T00:00:00', NOW());
