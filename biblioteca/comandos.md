# Vídeo Aula 12

# Implementação do CRUD da Bliblioteca Digital

# Conectar ao MongoDB

mongosh

# Criar o Banco de Dados

use biblioteca

# Coleções Explicitamente

db.createCollection("livros")

db.createCollection("alunos")

db.createCollection("colaboradores")

db.createCollection("emprestimos")

show collections

# Configurações e Limitações Possíveis com db.createCollection()

1. Coleções Capadas (Capped Collections)
   Uma coleção capada tem um tamanho fixo e funciona como uma fila circular. Quando atinge o limite de espaço ou número de documentos, os documentos mais antigos são sobrescritos.
   Muito útil para logs e outros tipos de dados onde o espaço é limitado.

Exemplo:

db.createCollection("logs", {
capped: true, // Define a coleção como capada
size: 10485760, // Tamanho máximo em bytes (10 MB neste exemplo)
max: 1000 // Número máximo de documentos (opcional)
})

Explicação

- capped: true: Ativa a funcionalidade de coleção capada.
- size: Define o tamanho máximo da coleção em bytes.
- max: Define o número máximo de documentos (opcional).
- Observação: As coleções capadas não podem ser redimensionadas após criadas.

2. Validação de Dados (Schema Validation)
   Você pode aplicar um esquema de validação para restringir os documentos que podem ser inseridos na coleção. Isso é feito com o campo validator.

Ao criar coleções explicitamente no MongoDB com o comando db.createCollection(), você pode definir algumas configurações e limitações. Essas configurações permitem que você controle o tamanho da coleção, o número de documentos, use coleções capadas (capped), e até mesmo implemente validações para os dados inseridos.

Configurações e Limitações Possíveis com db.createCollection()

1. Coleções Capadas (Capped Collections)
   Uma coleção capada tem um tamanho fixo e funciona como uma fila circular. Quando atinge o limite de espaço ou número de documentos, os documentos mais antigos são sobrescritos.
   Muito útil para logs e outros tipos de dados onde o espaço é limitado.
   Exemplo:

db.createCollection("logs", {
capped: true, // Define a coleção como capada
size: 10485760, // Tamanho máximo em bytes (10 MB neste exemplo)
max: 1000 // Número máximo de documentos (opcional)
})

Explicação:

- capped: true: Ativa a funcionalidade de coleção capada.
- size: Define o tamanho máximo da coleção em bytes.
- max: Define o número máximo de documentos (opcional).
- Observação: As coleções capadas não podem ser redimensionadas após criadas.

2. Validação de Dados (Schema Validation)
   Você pode aplicar um esquema de validação para restringir os documentos que podem ser inseridos na coleção. Isso é feito com o campo validator.

Exemplo:

db.createCollection("alunos", {
validator: {
$jsonSchema: {
bsonType: "object",
required: ["_id", "nome", "email", "telefone"],
properties: {
_id: { bsonType: "string" },
nome: { bsonType: "string", description: "Nome do aluno" },
email: { bsonType: "string", pattern: "@", description: "Deve ser um email válido" },
telefone: { bsonType: "string", minLength: 10, maxLength: 11 }
}
}
},
validationLevel: "strict", // Aplica validação rigorosa (default: "strict")
validationAction: "error" // Rejeita documentos inválidos (default: "error")
})

Observações:

- bsonType: Define o tipo de dado esperado para os campos.
- required: Define campos obrigatórios.
- validationLevel:
  - "strict": Valida todos os documentos inseridos (padrão).
  - "moderate": Valida somente documentos que não passam pelo driver do MongoDB.
- validationAction:
  - "error": Rejeita documentos inválidos (padrão).
  - "warn": Permite documentos inválidos, mas gera um av

# Implementação do CRUD - Create

# Criar as Coleções e Inserir Dados: Collection LIVROS

db.livros.insertMany([
{
"_id": "9781234567890",
"nome": "Introdução ao MongoDB",
"autor": "João Silva",
"paginas": 300
},
{
"_id": "9789876543210",
"nome": "Estruturas de Dados em MongoDB",
"autor": "Maria Souza",
"paginas": 250
}
])

# Criar as Coleções e Inserir Dados: Collection ALUNOS

db.alunos.insertMany([
{
"_id": "RA123456789",
"nome": "Maria Oliveira",
"email": "maria.oliveira@email.com",
"telefone": "11987654321"
},
{
"_id": "RA987654321",
"nome": "João Santos",
"email": "joao.santos@email.com",
"telefone": "21987654321"
}
])

# Criar as Coleções e Inserir Dados: Collection COLABORADORES

db.colaboradores.insertMany([
{
"_id": "CPF12345678900",
"nome": "Carlos Pereira",
"email": "carlos.pereira@email.com",
"cargo": "Bibliotecário"
},
{
"_id": "CPF98765432100",
"nome": "Ana Silva",
"email": "ana.silva@email.com",
"cargo": "Assistente"
}
])

# Criar as Coleções e Inserir Dados: Collection EMPRESTIMOS

db.emprestimos.insertMany([
{
"_id": "EMP001",
"dataEmprestimo": new Date("2025-01-20"),
"dataDevolucao": new Date("2025-02-20"),
"id_livro": "9781234567890",
"id_colaborador": "CPF12345678900",
"id_aluno": "RA123456789"
},
{
"_id": "EMP002",
"dataEmprestimo": new Date("2025-01-25"),
"dataDevolucao": null,
"id_livro": "9789876543210",
"id_colaborador": "CPF98765432100",
"id_aluno": "RA987654321"
}
])

# Vídeo Aula 13

# Implementação do CRUD - Read

Para realizar operações de leitura no MongoDB para a sua biblioteca digital, você pode utilizar os seguintes comandos no MongoDB Shell:

1. Selecionar o Banco de Dados

use biblioteca

2. Listar Todos os Documentos de uma Coleção
   Para visualizar todos os documentos de uma coleção específica, utilize o comando find():

db.livros.find().pretty()

db.alunos.find().pretty()

db.colaboradores.find().pretty()

db.emprestimos.find().pretty()

O método pretty() formata a saída para uma visualização mais amigável.

3. Filtrar Documentos com Condições Específicas
   Você pode buscar documentos que atendam a certos critérios passando um objeto de consulta para o método find().

db.livros.find({ autor: "João Silva" }).pretty()

db.alunos.find({ nome: "Maria Oliveira" }).pretty()

db.emprestimos.find({ dataDevolucao: null }).pretty()

4. Projeção de Campos Específicos
   Para retornar apenas campos específicos de um documento, utilize a projeção:

Listar títulos e autores dos livros:

db.livros.find({}, { nome: 1, autor: 1, _id: 0 }).pretty()

Aqui, 1 indica que o campo deve ser incluído na saída, e 0 que deve ser excluído. O campo _id é incluído por padrão, portanto, se não for necessário, deve ser explicitamente excluído.

5. Ordenação de Resultados
   Para ordenar os resultados, utilize o método sort():

Ordenar alunos por nome em ordem alfabética:

db.alunos.find().sort({ nome: 1 }).pretty()

Aqui, 1 indica ordem crescente e -1 indica ordem decrescente.

6. Limitar e Pular Resultados
   Para limitar o número de documentos retornados ou pular um número específico de documentos:

Limitar a 5 documentos:

db.livros.find().limit(5).pretty()

Pular os primeiros 2 documentos
db.livros.find().skip(2).pretty()

7. Contar Documentos
   Para contar o número de documentos que atendem a uma condição:

Contar todos os livros:
db.livros.countDocuments()

Contar livros de um autor específico:
db.livros.countDocuments({ autor: "João Silva" })

8. Buscar um Único Documento
   Para retornar apenas um documento que atenda a uma condição:

Buscar um aluno pelo nom
db.alunos.findOne({ nome: "João Santos" })

9. Operadores de Comparação
   Você pode utilizar operadores para consultas mais complexas:

Buscar livros com mais de 300 páginas:
db.livros.find({ paginas: { $gt: 300 } }).pretty()

Aqui, $gt significa "maior que". Outros operadores incluem $lt (menor que), $gte (maior ou igual a), $lte (menor ou igual a), $ne (diferente de), entre outros.

10. Operadores Lógicos
    Para combinar múltiplas condições:

Buscar livros com mais de 300 páginas ou do autor "João Silva":

db.livros.find({
$or: [
{ paginas: { $gt: 300 } },
{ autor: "João Silva" }
]
}).pretty()

1. Consultas Aninhadas
   Para buscar documentos dentro de subdocumentos ou arrays:

Buscar alunos com um telefone específico:
db.alunos.find({ "contato.telefone": "(62) 9999-9999" }).pretty()

12. Uso de Expressões Regulares
    Para buscar documentos com padrões específicos em strings:

db.livros.find({ nome: /^Introdução/ }).pretty()

# Buscar Empréstimos com Dados Detalhados

Se você quiser informações mais detalhadas (como o nome do aluno ou colaborador), você pode realizar consultas adicionais buscando os _ids relacionados nas coleções alunos e colaboradores.

Simular uma "União" no Código
Combine os resultados no seu código (exemplo em JavaScript):

const emprestimos = db.emprestimos.find({ id_aluno: "RA123456789" }).toArray();
emprestimos.forEach(emp => {
const aluno = db.alunos.findOne({ _id: emp.id_aluno });
const colaborador = db.colaboradores.findOne({ _id: emp.id_colaborador });
console.log({
...emp,
aluno_nome: aluno.nome,
colaborador_nome: colaborador.nome
});
});

# Explicação

// Busca todos os empréstimos feitos por um aluno com o ID "RA123456789"
// Converte o resultado para um array com o método .toArray()
const emprestimos = db.emprestimos.find({ id_aluno: "RA123456789" }).toArray();

// Itera sobre cada empréstimo no array retornado
emprestimos.forEach(emp => {
// Busca o documento do aluno relacionado ao empréstimo atual
// Usando o campo "id_aluno" do empréstimo como filtro para encontrar o aluno
const aluno = db.alunos.findOne({ _id: emp.id_aluno });

// Busca o documento do colaborador relacionado ao empréstimo atual
// Usando o campo "id_colaborador" do empréstimo como filtro para encontrar o colaborador
const colaborador = db.colaboradores.findOne({ _id: emp.id_colaborador });

// Combina os dados do empréstimo, do aluno, e do colaborador em um único objeto
// Utiliza o operador "spread" (...) para incluir todos os campos do empréstimo
// Adiciona o nome do aluno (aluno_nome) e o nome do colaborador (colaborador_nome) ao objeto
console.log({
...emp, // Inclui todos os campos do empréstimo atual
aluno_nome: aluno.nome, // Adiciona o campo "aluno_nome" com o nome do aluno
colaborador_nome: colaborador.nome // Adiciona o campo "colaborador_nome" com o nome do colaborador
});
});

# Vídeo Aula 14

# Implementação do CRUD - Update

Atualizar um Único Documento com updateOne()
Usamos o comando updateOne() para modificar apenas o primeiro documento que corresponde à condição.

Exemplo: Alterar o estoque de um livro

db.livros.updateOne(
{ _id: "9781234567890" }, // Filtro: Livro com este ID
{ $set: { estoque: 10 } } // Atualização: Define "estoque" como 10
)
Explicação:

- $set: Define novos valores para os campos especificados.
- Resultado esperado:
- Apenas o documento do livro com o _id "9781234567890" terá o campo estoque atualizado para 10.

Atualizar Múltiplos Documentos com updateMany()
Usamos o comando updateMany() para modificar todos os documentos que atendem à condição.

Exemplo: Tornar todos os alunos ativos

db.alunos.updateMany(
{ status: "inativo" }, // Filtro: Alunos com status "inativo"
{ $set: { status: "ativo" } } // Atualização: Define "status" como "ativo"
)

db.alunos.updateMany(
{}, // Filtro: Todos Alunos
{ $set: { status: "ativo" } } // Atualização: Define "status" como "ativo"
)

Resultado esperado:
Todos os documentos na coleção alunos com o campo status igual a "inativo" serão atualizados para "ativo".

Adicionar ou Atualizar Campos com $set
Se o campo especificado no $set não existir no documento, ele será adicionado automaticamente.

Exemplo: Adicionar o campo telefone em um colaborador

db.colaboradores.updateOne(
{ _id: "CPF12345678900" }, // Filtro: Colaborador específico
{ $set: { telefone: "(62) 7777-7777" } } // Adiciona/atualiza o campo "telefone"
)

Incrementar Valores com $inc
O operador $inc incrementa (ou decrementa) valores numéricos.

Exemplo: Incrementar o estoque de um livro

db.livros.updateOne(
{ _id: "9781234567890" }, // Filtro: Livro específico
{ $inc: { estoque: 5 } } // Incrementa o estoque em 5
)

Se o valor do campo for 10, ele será atualizado para 15.

Renomear Campos com $rename
O operador $rename renomeia um campo no documento.

Exemplo: Renomear o campo telefone para contato em alunos

db.alunos.updateMany(
{}, // Aplica a todos os documentos
{ $rename: { telefone: "contato" } } // Renomeia "telefone" para "contato"
)

Remover Campos com $unset
O operador $unset remove um campo do documento.

Exemplo: Remover o campo telefone de um colaborador

Exercício 05
Peça aos alunos para realizar as seguintes operações:

Atualizar o campo telefone do colaborador com _id: "CPF12345678900" para "11987654321".
Incrementar o estoque do livro com _id: "9786543219870" em 10.
Alterar o dataDevolucao para "2025-02-15" no empréstimo com _id: "EMP001".
Renomear o campo telefone para contato em todos os alunos.

db.colaboradores.updateOne(
{ _id: "CPF98765432100" }, // Filtro: Colaborador específico
{ $unset: { telefone: "" } } // Remove o campo "telefone"
)

// 1. Atualizar telefone de um colaborador
db.colaboradores.updateOne(
{ _id: "CPF12345678900" },
{ $set: { telefone: "11987654321" } }
);

// 2. Incrementar o estoque de um livro
db.livros.updateOne(
{ _id: "9786543219870" },
{ $inc: { estoque: 10 } }
);

// 3. Alterar data de devolução de um empréstimo
db.emprestimos.updateOne(
{ _id: "EMP001" },
{ $set: { dataDevolucao: new Date("2025-02-15") } }
);

// 4. Renomear "telefone" para "contato" em alunos
db.alunos.updateMany(
{},
{ $rename: { telefone: "contato" } }
);

# Vídeo Aula 15

# Implementação do CRUD - Delete

Remover um Único Documento com deleteOne()
O comando deleteOne() remove apenas o primeiro documento que atende ao filtro.

Exemplo: Remover um aluno com o ID "RA123456789"

db.alunos.deleteOne({ _id: "RA123456789" })

Descrição:

- O filtro { _id: "RA123456789" } localiza o documento com esse _id.
- Apenas o primeiro documento que corresponde ao filtro será excluído.

Resultado esperado:

- O aluno com o ID "RA123456789" será removido da coleção alunos.

Remover Múltiplos Documentos com deleteMany()
O comando deleteMany() remove todos os documentos que atendem ao filtro.

Exemplo: Remover todos os livros sem estoque

db.livros.deleteMany({ estoque: 0 })

Descrição:
O filtro { estoque: 0 } localiza todos os documentos com o campo estoque igual a 0.
Todos esses documentos serão removidos.

Remover Todos os Documentos de uma Coleção
Para limpar completamente uma coleção, você pode usar o comando deleteMany() com um filtro vazio {}.

Exemplo: Limpar a coleção emprestimos

db.emprestimos.deleteMany({})

Descrição:
O filtro vazio {} indica que todos os documentos na coleção devem ser removidos.
A coleção continuará existindo, mas ficará vazia.

Excluir uma Coleção com drop()
O comando drop() remove uma coleção inteira, incluindo seus índices e metadados.

Exemplo: Excluir a coleção colaboradores

db.colaboradores.drop()

Descrição:
A coleção colaboradores será permanentemente removida do banco de dados.
Todos os documentos contidos nela também serão excluídos.

Excluir um Banco de Dados com dropDatabase()
O comando dropDatabase() remove completamente o banco de dados atual.

Exemplo: Excluir o banco de dados biblioteca

use biblioteca

db.dropDatabase()

Descrição:
O comando use biblioteca seleciona o banco de dados.
O comando db.dropDatabase() remove o banco de dados inteiro, incluindo todas as suas coleções e documentos.

Exercício 06
Proposta:

Remova um único empréstimo com _id: "EMP001".
Exclua todos os colaboradores com o cargo "Assistente".
Limpe a coleção de emprestimos sem remover a coleção.
Exclua o banco de dados biblioteca.

// 1. Remover um único empréstimo
db.emprestimos.deleteOne({ _id: "EMP001" })

// 2. Excluir todos os colaboradores com o cargo "Assistente"
db.colaboradores.deleteMany({ cargo: "Assistente" })

// 3. Limpar a coleção de empréstimos
db.emprestimos.deleteMany({})

// 4. Excluir o banco de dados "biblioteca"
use biblioteca
db.dropDatabase()
