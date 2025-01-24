// Busca todos os empréstimos feitos por um aluno com o ID "RA123456789"
// Converte o resultado para um array com o método .toArray()
const emprestimos = db.emprestimos.find({ id_aluno: "RA123456789" }).toArray();

// Itera sobre cada empréstimo no array retornado
emprestimos.forEach(emp => {
  // Busca o documento do aluno relacionado ao empréstimo atual
  // Usando o campo "id_aluno" do empréstimo como filtro para encontrar o aluno
  const aluno = db.alunos.findOne({ _id: emp.id_aluno });

  // Busca o documento do colaborador relacionado ao empréstimo atual
  // Usando o campo "id_colaborador" do empréstimo como filtro para encontrar o colaborador
  const colaborador = db.colaboradores.findOne({ _id: emp.id_colaborador });

  // Combina os dados do empréstimo, do aluno, e do colaborador em um único objeto
  // Utiliza o operador "spread" (...) para incluir todos os campos do empréstimo
  // Adiciona o nome do aluno (aluno_nome) e o nome do colaborador (colaborador_nome) ao objeto
  console.log({
    ...emp,                    // Inclui todos os campos do empréstimo atual
    aluno_nome: aluno.nome,    // Adiciona o campo "aluno_nome" com o nome do aluno
    colaborador_nome: colaborador.nome // Adiciona o campo "colaborador_nome" com o nome do colaborador
  });
});
