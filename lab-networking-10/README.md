# Lab Networking 

##  Como Executar

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 1. Iniciar o Servidor
O servidor gerencia todas as conexões e roteia as mensagens.
```bash
node src/server.js
```

### 2. Iniciar o Cliente
Você pode abrir múltiplos terminais para simular diferentes usuários.
```bash
node src/client.js
```

### Comandos no Chat
- **Mensagem Pública:** Basta digitar sua mensagem e pressionar `Enter`. Ela será enviada para todos os usuários conectados.
- **Mensagem Privada:** Use o prefixo `@username` seguido da sua mensagem (ex: `@joao Olá, tudo bem?`).

## Funcionalidades
- **Conexão TCP Persistente:** Comunicação bidirecional e confiável.
- **Integridade com SHA-256:** Cada mensagem é validada através de um hash para garantir que não foi corrompida.
- **Serialização JSON:** Dados estruturados para facilitar o roteamento de mensagens.
- **Mensagens Privadas:** Roteamento direcionado baseado no nome de usuário.

## Documentação
O relatório detalhado da atividade, incluindo a arquitetura do sistema e as respostas para as perguntas de reflexão, pode ser encontrado em:
- [Writerside/topics/Atividade.md](./Writerside/topics/Atividade.md)
