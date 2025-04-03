# Consultas Avançadas com `$lookup` no MongoDB

O operador `$lookup` no MongoDB permite realizar junções entre coleções, similar ao conceito de `JOIN` em bancos de dados relacionais. Ele é usado para combinar documentos de diferentes coleções com base em uma chave comum.

## Sintaxe Básica

```json
{
    $lookup: {
        from: "<colecao_destino>",
        localField: "<campo_local>",
        foreignField: "<campo_estrangeiro>",
        as: "<nome_do_campo_resultante>"
    }
}
```

- **from**: Nome da coleção com a qual será feita a junção.
- **localField**: Campo na coleção atual que será usado para a correspondência.
- **foreignField**: Campo na coleção de destino que será usado para a correspondência.
- **as**: Nome do campo onde os resultados da junção serão armazenados.

## 1. Estrutura de Dados
Coleção veiculos
``` json
{"_id": ObjectId("..."),
 "modelo": "Civic",
 "marca":"Honda",
 "ano": 2020,
 "preco" 95000
}
```

Coleção vendas
``` json
{"_id": ObjectId("..."),
 "veiculo_id": ObjectId("..."),
 "cliente": "Carlos Silva",
 "data": ISODate("2025-04-02-10T00:00:00Z"),
  "valor_final" 93000
}
```

## Povoar nosso Banco Dados
```mongoDB
use sistemaCarros


db.veiculos.insertMany([
  { _id: ObjectId("64f111111111111111111111"), modelo: "Civic", marca: "Honda", ano: 2020, preco: 95000 },
  { _id: ObjectId("64f222222222222222222222"), modelo: "Corolla", marca: "Toyota", ano: 2021, preco: 98000 },
  { _id: ObjectId("64f333333333333333333333"), modelo: "Uno", marca: "Fiat", ano: 2015, preco: 25000 }
]);


db.vendas.insertMany([
  { veiculo_id: ObjectId("64f111111111111111111111"), cliente: "Carlos Silva", data_venda: ISODate("2024-12-10"), valor_final: 93000 },
  { veiculo_id: ObjectId("64f333333333333333333333"), cliente: "Mariana Souza", data_venda: ISODate("2025-01-15"), valor_final: 24500 }
]);

```

## Simulando Joins com $lookup
### Simulando o INNER JOIN (veículos com vendas)
db.vendas.aggregate([{
    $lookup: {
        from: "veiculos",
        localField: "veiculo_id",
        foreignField: "_id",
        as: "dados_veiculo"
    }
}])


### Simulando o LEFT JOIN (veículos com vendas)
db.vendas.aggregate([{
    $lookup: {
        from: "veiculos",
        localField: "veiculo_id",
        foreignField: "_id",
        as: "dados_veiculo"
    }
},
  { $unwind: "$dados_veiculo" }
  ])


## Consulta de Veiculos que não foram vendidos
```MongoDB
db.veiculos.aggregate([
  {
    $lookup: {
      from: "vendas",
      localField: "_id",
      foreignField: "veiculo_id",
      as: "veiculo"
    }
  },
  { $unwind: "$veiculo" },
  {
    $group: {
      _id: "$veiculo.marca",
      totalVendas: {$sum: 1}
    }
  }
]);
match Filta apenas os veículo onde o array de vebdas está vazio, ou seja, não teve venda registrar

## Estatísticas e Análises do Dados
Quantos veóculo forarm vendidos por marca
db.vendas.aggregate([
  {
    $lookup: {
      from: "veiculos",
      localField: "veiculo_id",
      foreignField: "_id",
      as: "veiculo"
    }
  },
  {
    $match: {
      vendas: { $eq: [] } 
    }
  }
]);

## Total Vendindo
db.vendas.aggregate([
  {
    $group: {
      _id: null,
      totalArrecadado: { $sum: "$valor_final" }
    }
  }
]);

## Backup
``` mongoexport
mongoexport --db sistemaCarros --collection veiculos --out veiculos.json --jsonArray
mongoexport --db sistemaCarros --collection vendas --out vendas.json --jsonArray

## Considerações

- O `$lookup` é executado no lado do servidor, o que pode impactar o desempenho em coleções muito grandes.
- Certifique-se de que os campos usados na junção estejam devidamente indexados para melhorar a eficiência.

## Referências

- [Documentação Oficial do MongoDB - `$lookup`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/)