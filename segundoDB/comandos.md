# Resolução do Exercício 02

use segundoDB

# Crie um novo banco de dados chamado segundoDB

db.segunda_collection.insertOne({ nome:"Paulo", idade: 25, sexo: "M"})

# Verifique se o dado foi inserido.

db.segunda_collection.find().pretty()


# Vídeo Aula 09

# Remoção de Documentos - deleteOne({filtro}) - Remove um único elemento

use primeiroDB

cls

db.clientes.deleteOne({nome: "João Silva"})

db.clientes.find().pretty()

# Remover vários elemento - deleteMany({filtro})

cls

use primeiroDB

db.clientes.insertOne({nome:"Maria"})

db.clientes.deleteMany({})

db.clientes.find().pretty()

# Excluir uma Coleção (Collection) - drop

cls

use primeiroDB

db.clientes.drop()

# Como remover um Banco de Dados - dropDatabase()

use segundoDB

db.dropDatabase()

use primeiroDB
