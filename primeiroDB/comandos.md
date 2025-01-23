# 1 - abrindo o shell do mongoDB

mongosh

# 2 - listar os nomes de todas as bases de dados

show dbs

# 3 - criar um banco de Dados

use primeiroDB

# 4 - inserir um dados em uma Collection

db.primeira_collection.insertOne({ "nome": "João", "idade": 30, "profissao": "Análista de Sistema" } )

# 5 - buscando um dado do banco de dados

db.primeira_collection.findOne({})

# Exercício 01 - primeiro Desafio

db.primeira_collection.insertOne({ "nome": "Ana", "idade": 18, "profissao": "Cientista de Dados" })

db.primeira_collection.find()

db.primeira_collection.insertOne({ "nome": "Ricardo", "idade": 49 })

db.primeira_collection.find()
