# Atividade #1 - Análise do Three-Way Handshake (Observabilidade)

Nesta atividade, eu observei o processo de estabelecimento de uma conexão TCP (Three-Way Handshake) em meu ambiente Fedora Linux, analisando tanto o acesso a um serviço HTTP quanto um caso prático de transferência de arquivos por linha de comando.

## Ferramentas Utilizadas
* **curl / wget**: Utilizei para gerar tráfego de rede e realizar a transferência de arquivos.
* **Wireshark**: Empreguei para a captura e análise visual detalhada dos pacotes.
* **Shell (Bash)**: Meu ambiente de execução para os comandos no Fedora.

## Passo a Passo da Execução

### 1. Preparação da Captura
Eu iniciei o Wireshark e selecionei a interface ativa do meu computador (`wlo1`). Para limpar o ruído da captura, eu apliquei um filtro inicial focado no tráfego TCP das portas que eu pretendia testar.

*   **Filtro:** `tcp.port == 443 or tcp.port == 80`

![image_5.png](image_5.png)

### 2. Caso Prático: Transferência de Arquivos
Para testar a conexão em um cenário real, eu utilizei o comando `wget` para baixar um arquivo de teste de um servidor público. Este comando forçou a abertura de uma nova sessão TCP, permitindo-me capturar o handshake desde o início.

```c#
wget https://proof.ovh.net/files/1Mb.dat
```

![image_6.png](image_6.png)

### 3. Filtragem e Análise Avançada
Para que eu pudesse isolar precisamente apenas os pacotes de controle que formam o "aperto de mão" de três vias, eu apliquei um filtro lógico avançado no Wireshark.

*   **Filtro Utilizado:** `tcp.flags.syn == 1 or (tcp.seq == 1 and tcp.ack == 1 and tcp.len == 0)`

**Minha lógica para este filtro:**
*   `tcp.flags.syn == 1`: Usei para capturar pacotes com a flag **SYN** ativa (primeira e segunda fases).
*   `tcp.seq == 1 and tcp.ack == 1 and tcp.len == 0`: Identifiquei o terceiro pacote (**ACK**) da negociação, que confirma a conexão sem transportar dados ainda.

![image_7.png](image_7.png)

## Análise das Três Fases (SYN, SYN-ACK, ACK)

Através da inspeção que realizei no cabeçalho TCP (conforme destaco no pacote No. 1501 da minha captura), eu identifiquei as seguintes fases:

1.  **SYN (Synchronize):** Eu observei o pacote inicial enviado pelo meu computador com a flag `0x002 (SYN)` ativada. Foi o momento em que eu solicitei a abertura da conexão.
2.  **SYN-ACK (Synchronize-Acknowledge):** Eu identifiquei a resposta do servidor confirmando meu pedido (`Acknowledgment Number: 1`) e enviando seu próprio bit de sincronização.
3.  **ACK (Acknowledge):** Por fim, verifiquei o pacote final enviado pelo meu Fedora. Com este passo, eu estabeleci oficialmente a conexão (**ESTABLISHED**).

## Conclusão
Ao realizar este teste prático e aplicar a filtragem avançada, eu pude comprovar a robustez do protocolo TCP de forma empírica. A análise me permitiu entender que a transferência do meu arquivo de 1MB só foi autorizada pelo sistema após a conclusão bem-sucedida dessa negociação de três vias, garantindo a integridade e a confiabilidade de toda a comunicação que se seguiu.
