# Exemplo de Embedding (Incorporar)
Nesse formato os os dados estão em um único documento

Vantagens

- Mais rápido para consultas, pois os dados estão juntos
- Menos consulta ao Bancos

Desvantagens
- Gerar documento muito grande se muito pedido
- Mais díficil de editar (update) partes específicas do documento

# Exemplo de Referencing (Referenciar)
Os dados são divididos em vários documentos e são relacionados por uso identificadores (id)

Vantagens

- Melhor escalabilidade para documento grandes
- Mais Fácio manuteção: atualização de pedidos sem precisar mudar os dados do cliente

Desvantagens
- Mais lento em consulta, que acabam sendo mais complexas e demoradas
- Mais díficil de editar (update) partes específicas do documento

# Chave _id no MongoDB
Parecido como a chave primária de um banco de dados relacional.
Definição _id é um identifcador único para cada documento dentro de uma coleção
Se não for fornecido pelo desenvolvedor ou administrador do banco é gerado pelo MongoDB
Gera um chave com hash usa a data do sistema para gerar um _id único
pro padrão Objectid qualquer valor: String ou número.
