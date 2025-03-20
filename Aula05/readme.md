Vamos estruturar a aula em **5 etapas**:  

1️⃣ **Importar um banco de dados JSON no MongoDB**  
2️⃣ **Explorar consultas (básicas e avançadas)**  
3️⃣ **Propor um desafio para os alunos**  
4️⃣ **Fazer estatísticas com agregação (`aggregate`)**  
5️⃣ **Exportar os dados como backup (`mongoexport`)**  

---

## 📌 **1️⃣ Criando um Banco de Dados JSON para Importação**
Vamos gerar um **JSON com cadastro de livros**, incluindo título, autor, gênero, ano de publicação e preço.  

### ✅ **Gerando o Arquivo JSON**  
Aqui está um exemplo de um JSON pronto para importação no MongoDB:

```json
[
  {
    "titulo": "O Senhor dos Anéis",
    "autor": "J.R.R. Tolkien",
    "genero": "Fantasia",
    "ano": 1954,
    "preco": 59.90,
    "estoque": 10,
    "avaliacao": 4.8
  },
  {
    "titulo": "1984",
    "autor": "George Orwell",
    "genero": "Ficção Científica",
    "ano": 1949,
    "preco": 39.90,
    "estoque": 5,
    "avaliacao": 4.7
  },
  {
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "genero": "Romance",
    "ano": 1899,
    "preco": 29.90,
    "estoque": 8,
    "avaliacao": 4.6
  },
  {
    "titulo": "A Revolução dos Bichos",
    "autor": "George Orwell",
    "genero": "Ficção Científica",
    "ano": 1945,
    "preco": 35.90,
    "estoque": 12,
    "avaliacao": 4.9
  },
  {
    "titulo": "Harry Potter e a Pedra Filosofal",
    "autor": "J.K. Rowling",
    "genero": "Fantasia",
    "ano": 1997,
    "preco": 45.00,
    "estoque": 20,
    "avaliacao": 4.8
  }
]
```

### ✅ **Importando para o MongoDB**
Salve o arquivo como **`livros.json`** e use o comando abaixo para importar no MongoDB:
```bash
mongoimport --db biblioteca --collection livros --file "C:\Meus Documentos\IPOG\2025-1\NoSQL\Scritps\Aula05\livros.json" --jsonArray
```
Isso criará um banco chamado **`biblioteca`** e uma coleção **`livros`**.

---

## 📌 **2️⃣ Trabalhando com Consultas no MongoDB**
Agora, vamos explorar **diferentes tipos de consultas**.

### **🔹 Consultas Básicas**
✅ **Listar todos os livros**  
```MongoDB
db.livros.find().pretty();
```

✅ **Buscar um livro pelo título**  
```MongoDB
db.livros.findOne({ titulo: "1984" });
```

✅ **Filtrar livros por gênero (Fantasia)**  
```MongoDB
db.livros.find({ genero: "Fantasia" }).pretty();
```

---

### **🔹 Consultas com Operadores**
✅ **Livros lançados após 1950 (`$gt`)**  
```MongoDB
db.livros.find({ genero: "Fantasia" }).pretty();
```

✅ **Livros entre 1940 e 2000 (`$gte` e `$lte`)**  
```MongoDB
db.livros.find({ ano: { $gte: 1940, $lte: 2000 } }).pretty();
```

✅ **Livros com preço maior que R$ 40,00 (`$gt`)**  
```MongoDB
db.livros.find({ preco: { $gt: 40.00 } }).pretty();
```

✅ **Livros de autores específicos (`$in`)**  
```MongoDB
db.livros.find({ autor: { $in: ["J.R.R. Tolkien", "George Orwell"] } }).pretty();
```

✅ **Ordenar livros por preço do mais barato ao mais caro (`$sort`)**  
```MongoDB
db.livros.find().sort({ preco: 1 }).pretty();
```

✅ **Limitar a 3 resultados (`limit()`)**  
```MongoDB
db.livros.find().limit(3).pretty();
```

✅ **Contar quantos livros são de Ficção Científica (`countDocuments()`)**  
```MongoDB
db.livros.countDocuments({ genero: "Ficção Científica" });
```

---

## 📌 **3️⃣ Desafio para os Alunos**
**Desafio** 🎯: Criar uma consulta que **liste apenas os livros mais vendidos** (suponha que os mais vendidos são os que têm **estoque maior que 10 e avaliação maior que 4.7**).

Resposta esperada:
```MongoDB
db.livros.find({ estoque: { $gt: 10 }, avaliacao: { $gt: 4.7 } }).pretty();
```

---

## 📌 **4️⃣ Estatísticas com `$aggregate`**
Agora, vamos **calcular estatísticas** usando agregação.

✅ **Média de preços dos livros**  
```MongoDB
db.livros.aggregate([
  { $group: { _id: null, mediaPreco: { $avg: "$preco" } } }
]);
```

✅ **Número de livros por gênero**  
```MongoDB
db.livros.aggregate([
  { $group: { _id: "$genero", total: { $sum: 1 } } }
]);
```

✅ **Livro mais caro e mais barato (`$max` e `$min`)**  
```MongoDB
db.livros.aggregate([
  { $group: { _id: null, maisCaro: { $max: "$preco" }, maisBarato: { $min: "$preco" } } }
]);
```

---

## 📌 **5️⃣ Exportar os Dados para Backup**
Depois de trabalhar com os dados, podemos **exportá-los**.

✅ **Gerar um backup dos livros**
```bash
mongoexport --db biblioteca --collection livros --out "C:\Meus Documentos\IPOG\2025-1\NoSQL\Scritps\Aula05\backup_livros.json" --jsonArray
```
- O arquivo **`backup_livros.json`** será criado com todos os livros.

✅ **Restaurar o backup**
Se precisar restaurar:
```bash
mongoimport --db biblioteca_nova --collection livros --file "C:\Meus Documentos\IPOG\2025-1\NoSQL\Scritps\Aula05\backup_livros.json" --jsonArray
```

---

## 🚀 **Resumo da Aula**
1️⃣ **Importamos um banco de dados JSON com cadastro de livros.**  
2️⃣ **Fizemos várias consultas básicas e avançadas.**  
3️⃣ **Proporcionamos um desafio para os alunos.**  
4️⃣ **Trabalhamos com estatísticas e agregação (`$aggregate`).**  
5️⃣ **Exportamos os dados para backup com `mongoexport`.**  

---

Essa aula cobre **importação, consulta, análise e backup**.

---

# Extra

## **📌 Consultas Avançadas no MongoDB**

### **🔹 1️⃣ Busca por Parte de um Texto (`$regex`)**
Buscar livros que contenham "Harry" no título:
```MongoDB
db.livros.find({ titulo: { $regex: "Harry", $options: "i" } }).pretty();
```
- O **`$options: "i"`** faz a busca **ignorar maiúsculas/minúsculas**.

---

### **🔹 2️⃣ Buscar Livros com Estoque Entre um Intervalo (`$gte` e `$lte`)**
```MongoDB
db.livros.find({ estoque: { $gte: 5, $lte: 15 } }).pretty();
```
- Retorna livros **com estoque entre 5 e 15 unidades**.

---

### **🔹 3️⃣ Contar Quantos Livros Cada Autor Possui**
```MongoDB
db.livros.aggregate([
  { $group: { _id: "$autor", totalLivros: { $sum: 1 } } }
]);
```
- Mostra **quantos livros cada autor tem cadastrados**.

---

### **🔹 4️⃣ Somar o Valor Total dos Estoques**
```MongoDB
db.livros.aggregate([
  { $group: { _id: null, valorTotal: { $sum: { $multiply: ["$preco", "$estoque"] } } } }
]);
```
- Calcula o **valor total em estoque** de todos os livros.

---

### **🔹 5️⃣ Buscar o Livro Mais Caro e o Mais Barato**
```MongoDB
db.livros.aggregate([
  { $group: { _id: null, maisCaro: { $max: "$preco" }, maisBarato: { $min: "$preco" } } }
]);
```
- Retorna **o livro mais caro e o mais barato**.

---

### **🔹 6️⃣ Listar Livros em Ordem de Popularidade (`avaliacao`)**
```MongoDB
db.livros.find().sort({ avaliacao: -1 }).pretty();
```
- Ordena do **mais bem avaliado para o menos avaliado**.

---

### **🔹 7️⃣ Criar Índices Para Melhorar Performance**
```MongoDB
db.livros.createIndex({ titulo: 1 });
```
- **Melhora a velocidade** de consultas pelo **título**.

---