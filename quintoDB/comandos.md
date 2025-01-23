# db.stats(): Exibe estatísticas sobre o banco de dados atual.

db.stats()

# db.serverStatus(): Fornece estatísticas detalhadas sobre o servidor MongoDB.
db.serverStatus()

# db.collection.stats(): Exibe estatísticas específicas de uma coleção.
use quintoDB

db.usuarios.stats()

# mongotop: Monitora o tempo gasto em operações de leitura/escrita por coleção.
# Fora do Shell

mongotop

# mongostat: Exibe estatísticas de uso do MongoDB em tempo real.
mongostat