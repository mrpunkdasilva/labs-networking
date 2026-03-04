# Usando uma imagem leve do Python, meu bem!
FROM python:3.9-slim

# Definindo o diretório de trabalho no container
WORKDIR /app

# Copiando o arquivo de requisitos e instalando as dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiando o código do servidor
COPY app.py .

# Expondo a porta que o Flask vai usar
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["python", "app.py"]
