# Resolução do Exercício 03

# Cria ou seleciona o banco de dados chamado terceiroDB
use terceiroDB

# Insere três documentos na coleção "produtos"
db.produtos.insertMany([
  { "nome": "Teclado", "preco": 120, "categoria": "Periféricos" },
  { "nome": "Mouse", "preco": 80, "categoria": "Periféricos" },
  { "nome": "Monitor", "preco": 800, "categoria": "Acessórios" }
])

# Remove um único documento com o nome "Mouse"
cls

db.produtos.deleteOne({ "nome": "Mouse" })

db.produtosfind().pretty()

# Exclui toda a coleção "produtos"
cls

db.produtos.drop()

# Mostar todos as collection do banco de dados

show collections

# Exclui o banco de dados "terceiroDB"
db.dropDatabase()

# ##############################################################
# Vídeo Aula 10

# Exporta a coleção "clientes" do banco de dados "primeiroDB" para um arquivo JSON

mongoexport --db=primeiroDB --collection=clientes --out=clientes.json

# --db: Nome do banco de dados.
# --collection: Nome da coleção a ser exportada.
# --out: Nome do arquivo de saída.
# Saída esperada: Um arquivo clientes.json contendo os dados da coleção será gerado no diretório atual.

# Importa os dados do arquivo "livros.json" para a coleção "livros" no banco "primeiroDB" 

mongoimport --db=primeiroDB --collection=livros --file=livros.json --jsonArray

# --db=primeiroDB: Nome do banco de dados onde os dados serão importados.
# --collection=livros: Nome da coleção que será criada ou onde os dados serão adicionados.
# --file=livros.json: Caminho para o arquivo JSON.
# --jsonArray: Indica que o arquivo está em formato de array JSON.

use primeiroDB

cls

show collections

cls 

db.livros.find().pretty()

# Importa os dados do arquivo "clientes.json" para a coleção "clientes" no banco "primeiroDB" 

mongoimport --db=primeiroDB --collection=clientes --file=clientes.json --jsonArray

cls

show collections

cls 

db.clientes.find().pretty()
