# Resolução do Exercício 04

# 1. Criar ou selecionar o banco "quartoDB"

use quartoDB

# 2. Inserir cinco documentos na coleção "usuarios"

db.usuarios.insertMany([
{ "nome": "Lucas", "idade": 25, "email": "lucas@email.com" },
{ "nome": "Mariana", "idade": 32, "email": "mariana@email.com" },
{ "nome": "Carlos", "idade": 40, "email": "carlos@email.com" },
{ "nome": "Ana", "idade": 22, "email": "ana@email.com" },
{ "nome": "João", "idade": 29, "email": "joao@email.com" }
])

# 3. Exportar a coleção para um arquivo JSON (feito no terminal)

mongoexport --db=quartoDB --collection=usuarios --out=usuarios.json

# 4. Apagar o banco de dados "quartoDB" (retorne ao mongosh)

db.dropDatabase()

# 5. Reimportar o arquivo "usuarios.json" para o banco "quintoDB" (feito no terminal)

mongoimport --db=quintoDB --collection=usuarios --file=usuarios.json --jsonArray

# 6. Verificar os dados importados (retorne ao mongosh)

use quintoDB
db.usuarios.find().pretty()
