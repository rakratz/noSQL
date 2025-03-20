# Boa Noite 12/03/2025
Discipplina de Banco de Dados não Relacionais (NoSQL)
Prof. Ricardo Kratz

Objetivos
    - Revisão de MongoDB - Exemplo prático
        - Abrir o shell (prompt via texto) do MongoDB
            - Comando: mongosh
        - Exibir os Bancos
            - show dbs
        - Criar/usar um Banco de Dados
            - use sistemaRestaurante
        - Listar os dados de um collection
            Comando: db.pedidos.find().pretty()
        - Filto de Pedidos "em preparo" 
            Comando: db.pedidos.find({"status":"em preparo"}).pretty()
        - Contagem de Documentos
            Comando: db.pedidos.countDocuments().pretty()
            Comando: db.pedidos.countDocuments({"status":"em preparo"}).pretty()

    - Chave _id
        No MongoDB, quando uma documento é inserido ele recebe automaticament um identificado único chamado _id
        Essa chame é um ObjectId que é um identificador hexadecimal de 12 bytes que usa a hora do sistema e data com um hash para gerar um chave única
            - Timestamp (4 Bytes) - Quando foi criado
            - ID da Máquina (3 Bytes) - Indentificado único do Servidor
            - PID do processo (2 Bytes) - O identificador do processo em execução do MongoDB
            - Contador incremental (3 Bytes) - um número para evitar repetições
        
        Podemos criar um "_id" Personalizado (controle fica com o desenvolvedor ou DBA)


    
    
    CRUD
         - insertOne
            Comando de incluir único registro em uma collection
             db.pedidos.insertOne({
                                    "cliente": "Ricardo Kratz",
                                    "itens": [
                                    {"produto": "Pizza de Peperoni", "quantidade": 1, "preco": 35.00},
                                    {"produto": "Suco", "quantidade": 2, "preco": 10.00}
                                    ],
                                    "status": "em preparo",
                                    "data": "2020-05-20T20:00:00Z"
                                  });
        - insertMany
            Comando de incluir vários registros em uma collection
                Comando: 
                db.pedidos.insertMany([
                                    {
                                    "cliente": "Ana Souza",
                                    "itens": [
                                        {"produto": "Pizza de Calabresa", "quantidade": 1, "preco": 30.00},
                                        {"produto": "Pizza de Queijo", "quantidade": 2, "preco": 25.00}
                                    ],
                                    "status": "em preparo",
                                    "data": "2020-05-20T20:00:00Z"
                                    }, 
                                    {
                                        "cliente": "Calos Silva",
                                        "itens": [
                                        {"produto": "Hambúrguer", "quantidade": 1, "preco": 18.90},
                                        {"produto": "Refrigerante", "quantidade": 2, "preco": 10.00}
                                        ],
                                        "status": "entregue",
                                        "data": "2020-05-19T20:00:00Z"
                                    }
                                    ])
        - findOne
            - Pesquisa única
                db.clientes.findOne({nome: "Ricardo Kratz"})
                db.clientes.findOne({_id: "cliente_002"})
        - find
            - Pesquisa na Collections
                 Comando: db.pedidos.find().pretty()
                          db.pedidos.find({"status":"em preparo"}).pretty()
        - updateOne
            - Atualiza um único registro
                db.pedidos.updateOne({_id:  ObjectId('67d22e3fa24d5e48cefa4217')}, {$set: {pagamento: "cartão"} });
                db.pedidos.updateOne({_id:  ObjectId('67d22e3fa24d5e48cefa4217')}, {$set: {status: "entregue"} });

        - updateMany
            - Atualiza vários campos ao mesmo tempo
                Exemplo colocar um desconto de 5% para todos os preço maios que R$ 20
                db.pedidos.updateMany({"itens.preco": {$gt: 10} }, { $set: {"desconto": "5%"} });
            - Aplicar o desconto nos valores
                db.pedidos.updateMany({"itens.preco": {$gt: 10} }, {$mul: {"itens.$[].preco": 0.95} })
                db.pedidos.updateMany({ }, {$mul: {"itens.$[].preco": 0.95} })
        - deleteOne
            - Excluir um único registro
                Comando: db.pedidos.deleteOne({status:"entrege"})
                         db.pedidos.deleteOne({_id: ObjectId("67d22e3fa24d5e48cefa4218")});
        - deleteMany
            - Excluir vários documentos de uma única vez
                Comando: db.pedidos.deleteMany({status:"entrege"})
            - Excluir todos os registros
                Comando: db.pedidos.deleteMany({})

        Extra
        - Filtro e Operadores 
            - $gt
                - Maior que
                  db.pedidos.find({"itens.preco": {$gt: 20} }).pretty()  
            - $lt
                - Menor que
            - $in
            - $sort
            - limit
            - contDocuments
        - Índices e Otimização
            - createIndex
            - getIndex
            - dropIndex