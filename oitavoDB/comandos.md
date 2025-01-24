# Vídeo Aula 19

O Que São Índices?
 - Definição:
        Um índice no MongoDB é uma estrutura de dados especial que armazena uma parte dos dados de um conjunto em uma forma que facilita a recuperação rápida.
 - Vantagens:
        Aumentam a velocidade de consultas (especialmente em grandes coleções).
        Suportam filtros avançados em campos específicos.
 - Custo:
        Consomem mais espaço em disco.
        Podem impactar o desempenho de gravações (inserções, atualizações, exclusões).

# Configuração de Índices no MongoDB

- Criando Índices Simples

db.empregados.createIndex({ nome: 1 })

Descrição:
    1: Índice em ordem crescente.

Vantagem: 
    - Melhora as buscas pelo nome do empregado.

Criar um índice em múltiplos campos (salario e departamento):

db.empregados.createIndex({ departamento: 1, salario: -1 })

Descrição:
    - Ordena departamento em ordem crescente (1).
    - Ordena salario em ordem decrescente (-1).
Uso Comum: Consultas que combinam esses dois campos.

Índices Exclusivos

Criar um índice único no campo email: 

db.empregados.createIndex({ email: 1 }, { unique: true })

Descrição:
    - Garante que nenhum empregado tenha o mesmo email.

Índices Esparsos

Criar um índice esparso no campo telefone:

db.empregados.createIndex({ telefone: 1 }, { sparse: true })

Descrição:
    - Cria índice apenas para documentos onde o campo telefone existe.

Uso Comum: 
    - Campos opcionais.

Índices TTL (Time-to-Live)

Criar um índice para excluir documentos antigos:

db.empregados.createIndex({ dataContrato: 1 }, { expireAfterSeconds: 31536000 })

Descrição:
    - Remove documentos automaticamente após 1 ano (31536000 segundos) com base no campo dataContrato.

Uso Comum: 
    - Controle de logs ou contratos temporários.
    
# Prática

 Base de Dados para Exemplos (Banco oitavoDB)

 db.empregados.insertMany([
  {
    _id: "EMP001",
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "11987654321",
    salario: 5500,
    departamento: "TI",
    dataContrato: ISODate("2023-01-01T00:00:00Z"),
    projetos: ["Sistema de Vendas", "Aplicativo Móvel"]
  },
  {
    _id: "EMP002",
    nome: "Ana Oliveira",
    email: "ana.oliveira@email.com",
    telefone: null,
    salario: 6200,
    departamento: "Marketing",
    dataContrato: ISODate("2022-06-15T00:00:00Z"),
    projetos: ["Campanha Publicitária", "Redes Sociais"]
  },
  {
    _id: "EMP003",
    nome: "Carlos Pereira",
    email: "carlos.pereira@email.com",
    telefone: "21987654321",
    salario: 4700,
    departamento: "TI",
    dataContrato: ISODate("2024-01-01T00:00:00Z"),
    projetos: ["Infraestrutura", "Segurança"]
  }
])

Exemplos Práticos de Índices

Busca com Índice Simples

Objetivo: Buscar um empregado pelo nome.

db.empregados.find({ nome: "João Silva" }).explain("executionStats")

Configuração de Índice:

db.empregados.createIndex({ nome: 1 })

Explicação: Melhora a eficiência ao buscar pelo nome.

Busca com Índice Composto

Objetivo: Buscar empregados do departamento "TI" com salário maior que 5000.

db.empregados.find({
  departamento: "TI",
  salario: { $gt: 5000 }
}).explain("executionStats")

Configuração de Índice:

db.empregados.createIndex({ departamento: 1, salario: -1 })

Explicação: Torna a combinação de departamento e salario mais eficiente.

Garantir Exclusividade no Campo email

Objetivo: Evitar emails duplicados.

db.empregados.createIndex({ email: 1 }, { unique: true })

Índice TTL para Contratos

Objetivo: Excluir automaticamente documentos com dataContrato após 1 ano.

db.empregados.createIndex({ dataContrato: 1 }, { expireAfterSeconds: 31536000 })

Explicação: Remove automaticamente os empregados após 1 ano da data de contratação.

Verificar os Índices Criados

Comando: Listar todos os índices na coleção empregados.

db.empregados.getIndexes()

