# Vídeo Aula 18

Estrutura do Banco setimoDB

A base de dados será uma coleção chamada pedidos, representando pedidos de uma loja fictícia.

Crie um banco de dados setimoDB

Insira essa base de dados

db.pedidos.insertMany([
{
_id: "PED001",
cliente: {
nome: "Ana Pereira",
email: "ana.pereira@email.com",
telefone: "11987654321"
},
produtos: [
{ nome: "Cadeira Gamer", quantidade: 1, preco: 850 },
{ nome: "Teclado Mecânico", quantidade: 2, preco: 300 }
],
total: 1450,
dataPedido: ISODate("2025-01-25T10:30:00Z"),
enderecoEntrega: {
rua: "Rua das Flores",
numero: 123,
cidade: "Goiânia",
estado: "GO",
cep: "74000-000"
},
status: "pendente",
notas: [
"Entrega urgente",
"Cliente solicita contato antes da entrega"
]
},
{
_id: "PED002",
cliente: {
nome: "João Silva",
email: "joao.silva@email.com",
telefone: "21987654321"
},
produtos: [
{ nome: "Monitor LG", quantidade: 1, preco: 1200 },
{ nome: "Mouse Logitech", quantidade: 3, preco: 150 }
],
total: 1650,
dataPedido: ISODate("2025-01-26T14:45:00Z"),
enderecoEntrega: {
rua: "Av. Goiás",
numero: 1000,
cidade: "Goiânia",
estado: "GO",
cep: "74310-100"
},
status: "entregue",
notas: [
"Produto testado antes do envio",
"Entrega concluída com sucesso"
]
},
{
_id: "PED003",
cliente: {
nome: "Maria Oliveira",
email: "maria.oliveira@email.com",
telefone: "31987654321"
},
produtos: [
{ nome: "Notebook Dell", quantidade: 1, preco: 3500 },
{ nome: "Cabo HDMI", quantidade: 2, preco: 50 }
],
total: 3600,
dataPedido: ISODate("2025-01-27T09:15:00Z"),
enderecoEntrega: {
rua: "Rua das Laranjeiras",
numero: 50,
cidade: "Rio de Janeiro",
estado: "RJ",
cep: "20000-000"
},
status: "pendente",
notas: [
"Cliente pediu embalagem de presente",
"Entrega no período da manhã"
]
}
])

# Exemplos de Consultas Avançadas

Buscar pedidos onde o array notas contém o valor "Entrega urgente"

db.pedidos.find({
notas: "Entrega urgente"
}).pretty()

Buscar pedidos onde o array produtos contém um item com nome: "Teclado Mecânico"

db.pedidos.find({
"produtos.nome": "Teclado Mecânico"
}).pretty()

Buscar pedidos onde o array produtos contém um item com nome: "Mouse Logitech" e quantidade > 2

db.pedidos.find({
produtos: {
$elemMatch: {
nome: "Mouse Logitech",
quantidade: { $gt: 2 }
}
}
}).pretty()

Explicação: Usa $elemMatch para combinar múltiplas condições em um único elemento do array.
Resultado esperado: Pedido com _id: "PED002".

Buscar pedidos com exatamente 2 produtos

db.pedidos.find({
produtos: { $size: 2 }
}).pretty()

Explicação: Retorna pedidos onde o array produtos tem exatamente 2 elementos.
Resultado esperado: Todos os pedidos, pois todos têm 2 produtos.

# Trabalhando com Documents

Buscar pedidos com cidade "Goiânia" no campo enderecoEntrega

db.pedidos.find({
"enderecoEntrega.cidade": "Goiânia"
}).pretty()

Explicação: Acessa o subdocumento enderecoEntrega para buscar pedidos com cidade igual a "Goiânia".
Resultado esperado: Pedidos com _id: "PED001" e _id: "PED002".

Buscar pedidos onde o cliente tem o nome "Maria Oliveira"

db.pedidos.find({
"cliente.nome": "Maria Oliveira"
}).pretty()

Explicação: Acessa o subdocumento cliente para localizar o nome especificado.
Resultado esperado: Pedido com _id: "PED003".

# Combinações Avançadas

Buscar pedidos pendentes e com valor total maior que 1500

db.pedidos.find({
$and: [
{ status: "pendente" },
{ total: { $gt: 1500 } }
]
}).pretty()

Explicação: Usa $and para combinar as condições:
O status do pedido é "pendente".
O valor total é maior que 1500.
Resultado esperado: Pedidos com _id: "PED003".

Buscar pedidos que contenham o produto "Cadeira Gamer" ou tenham total menor que 1600

db.pedidos.find({
$or: [
{ "produtos.nome": "Cadeira Gamer" },
{ total: { $lt: 1600 } }
]
}).pretty()

Explicação: Usa $or para retornar pedidos que atendem pelo menos uma das condições.
Resultado esperado: Pedidos com _id: "PED001" e _id: "PED002".
