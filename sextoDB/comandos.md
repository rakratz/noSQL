# Aula 16

// 1. Atualizar o telefone do colaborador
db.colaboradores.updateOne(
  { _id: "CPF12345678900" },
  { $set: { telefone: "11987654321" } }
);

// 2. Incrementar o estoque do livro
db.livros.updateOne(
  { _id: "9786543219870" },
  { $inc: { estoque: 10 } }
);

// 3. Alterar a dataDevolucao de um empréstimo
db.emprestimos.updateOne(
  { _id: "EMP001" },
  { $set: { dataDevolucao: new Date("2025-02-15") } }
);

// 4. Renomear o campo telefone para contato
db.alunos.updateMany(
  {},
  { $rename: { telefone: "contato" } }
);


// 1. Remover um único empréstimo
db.emprestimos.deleteOne({ _id: "EMP001" })

// 2. Excluir todos os colaboradores com o cargo "Assistente"
db.colaboradores.deleteMany({ cargo: "Assistente" })

// 3. Limpar a coleção de empréstimos sem remover a coleção
db.emprestimos.deleteMany({})

// 4. Excluir o banco de dados biblioteca
use biblioteca
db.dropDatabase()

# Estrutura de Dados

O MongoDB é um banco de dados orientado a documentos, e sua principal estrutura de armazenamento é o formato JSON-like (BSON). Os tipos de dados suportados são usados para definir as propriedades dos documentos. Abaixo, vamos detalhar os tipos mais comuns: String, Arrays, Datas, Documents, Booleans e Numbers.


db.pedidos.insertOne({
  "_id": "ORD123456",
  "cliente": {
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "telefone": "11987654321"
  },
  "produtos": [
    {
      "nome": "Notebook Dell",
      "quantidade": 1,
      "preco": 3500.50
    },
    {
      "nome": "Mouse Logitech",
      "quantidade": 2,
      "preco": 150.00
    }
  ],
  "total": 3800.50,
  "dataPedido": new Date("2025-01-23"),
  "enderecoEntrega": {
    "rua": "Av. Principal",
    "numero": 123,
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01000-000"
  },
  "entregaRealizada": false,
  "notas": [
    "Entrega prevista para 5 dias úteis",
    "Cliente preferiu não receber contato por telefone"
  ]
})

# JSON

{
  "_id": "ORD123456", // String: identificador do documento
  "cliente": {
    "nome": "João Silva", // String
    "email": "joao.silva@email.com", // String
    "telefone": "11987654321" // String
  },
  "produtos": [ // Array: lista de produtos
    {
      "nome": "Notebook Dell", // String
      "quantidade": 1, // Number
      "preco": 3500.50 // Number
    },
    {
      "nome": "Mouse Logitech", // String
      "quantidade": 2, // Number
      "preco": 150.00 // Number
    }
  ],
  "total": 3800.50, // Number: soma dos preços dos produtos
  "dataPedido": new Date("2025-01-23"), // Date: data do pedido
  "enderecoEntrega": { // Document: subdocumento com informações de entrega
    "rua": "Av. Principal",
    "numero": 123,
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01000-000"
  },
  "entregaRealizada": false, // Boolean: status da entrega
  "notas": [ // Array: notas adicionais sobre o pedido
    "Entrega prevista para 5 dias úteis",
    "Cliente preferiu não receber contato por telefone"
  ]
}

