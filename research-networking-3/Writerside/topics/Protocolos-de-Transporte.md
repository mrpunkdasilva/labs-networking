# Protocolos da Camada de Transporte: TCP vs. UDP

A Camada de Transporte (Camada 4 do Modelo OSI) é responsável por fornecer a comunicação lógica ponta a ponta (host-a-host) para as aplicações. Ela utiliza os serviços da Camada de Rede (IP) para mover pacotes, mas adiciona funcionalidades cruciais como a multiplexação de portas e, dependendo do protocolo, confiabilidade e controle de fluxo. Os dois protocolos predominantes nesta camada são o TCP e o UDP.

## TCP (Transmission Control Protocol)

O TCP é o protocolo que garante a confiabilidade na entrega de dados. Ele foi projetado para assegurar que cada byte enviado pela aplicação de origem chegue intacto e na ordem correta à aplicação de destino, mesmo em redes não confiáveis.

### Características e Mecanismos

*   **Orientado à Conexão:** Antes de qualquer troca de dados, o TCP estabelece uma conexão virtual entre os dois hosts através de um processo conhecido como **Three-Way Handshake**.

    ```mermaid
    sequenceDiagram
        participant Cliente
        participant Servidor
        Cliente->>Servidor: SYN (seq=x)
        Note right of Servidor: Servidor aloca recursos
        Servidor->>Cliente: SYN-ACK (seq=y, ack=x+1)
        Note left of Cliente: Cliente aloca recursos
        Cliente->>Servidor: ACK (seq=x+1, ack=y+1)
        Note over Cliente, Servidor: Conexão estabelecida
    ```

*   **Entrega Confiável e Ordenada:** O TCP numera os segmentos de dados com um número de sequência (Sequence Number). O receptor utiliza esses números para reordenar os segmentos que chegam fora de ordem e para identificar segmentos perdidos. A confirmação de recebimento (Acknowledgement - ACK) informa ao remetente quais dados foram recebidos com sucesso.

*   **Controle de Fluxo (Flow Control):** O receptor utiliza um mecanismo de "janela deslizante" (Sliding Window) para controlar a quantidade de dados que o remetente pode enviar. O tamanho da janela (anunciado no campo *Window Size* do cabeçalho TCP) informa ao remetente o espaço disponível no buffer do receptor, evitando que o remetente sobrecarregue o destinatário.

*   **Controle de Congestionamento (Congestion Control):** Para evitar o congestionamento da rede (e não apenas do host receptor), o TCP utiliza algoritmos como *Slow Start* e *Congestion Avoidance*. Ele monitora a perda de pacotes e os tempos de ida e volta (RTT) para inferir o nível de congestionamento da rede e ajusta sua taxa de transmissão dinamicamente.

### Estrutura do Cabeçalho TCP

O cabeçalho TCP é complexo, refletindo suas múltiplas funcionalidades. Seu tamanho mínimo é de 20 bytes.

```
 0                   1                   2                   3   
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data |           |U|A|P|R|S|F|                               |
| Offset| Reserved  |R|C|S|S|Y|I|            Window             |
|       |           |G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |         Urgent Pointer        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options                    |    Padding    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                             data                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

## UDP (User Datagram Protocol)

O UDP é a antítese do TCP. Ele oferece um serviço de entrega de datagramas simples, não orientado à conexão e não confiável. Sua principal vantagem é a velocidade e o baixo overhead.

### Características e Mecanismos

*   **Não Orientado à Conexão:** Não há estabelecimento de conexão. Um datagrama UDP é simplesmente enviado ao destino assim que a aplicação o entrega à camada de transporte. É um modelo "dispare e esqueça" (*fire and forget*).

*   **Entrega Não Confiável:** O UDP não garante a entrega, a ordem ou a unicidade dos datagramas. Se um datagrama se perde, ele não é retransmitido. Se chegam fora de ordem, a aplicação de destino é quem deve lidar com isso.

*   **Sem Controle de Fluxo ou Congestionamento:** O UDP envia os dados na velocidade que a aplicação os produz, sem se preocupar com a capacidade do receptor ou da rede. Isso pode levar à perda de pacotes se a taxa de envio for muito alta.

*   **Checksum:** O UDP possui um campo de checksum para verificação de erros no cabeçalho e nos dados. Se o checksum falhar, o datagrama geralmente é descartado silenciosamente pelo sistema operacional do receptor.

### Estrutura do Cabeçalho UDP

O cabeçalho UDP é extremamente simples, com apenas 8 bytes, o que contribui para seu baixo overhead.

```
 0                   1                   2                   3   
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length             |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                             data                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

## Comparativo e Casos de Uso

| Característica | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Conexão** | Orientado à conexão (Handshake) | Não orientado à conexão |
| **Confiabilidade** | Alta (confirmações e retransmissões) | Baixa (entrega "best-effort") |
| **Ordenação** | Garante a ordem dos segmentos | Não garante a ordem dos datagramas |
| **Controle de Fluxo** | Sim (Sliding Window) | Não |
| **Controle de Cong.** | Sim (Slow Start, etc.) | Não |
| **Velocidade** | Mais lento | Muito rápido |
| **Overhead** | Alto (cabeçalho de 20+ bytes) | Baixo (cabeçalho de 8 bytes) |
| **Casos de Uso** | HTTP, FTP, E-mail (SMTP), SSH | DNS, VoIP, Streaming de vídeo, Jogos Online |

### Justificativa de Escolha

*   **Download de Arquivos (FTP, HTTP):** A escolha é **TCP**. A integridade do arquivo é absoluta. Cada bit deve ser transferido corretamente e na ordem exata. A sobrecarga do TCP é um preço pequeno a pagar pela garantia de que o arquivo não será corrompido.

*   **Jogo Online / Streaming de Vídeo:** A escolha é **UDP**. Nestas aplicações, a latência é o fator crítico. É preferível perder um quadro de vídeo ou uma atualização de posição de um jogador (causando um pequeno "glitch" visual) do que esperar pela retransmissão de um pacote antigo, o que causaria pausas e "lag" (atraso) que arruinariam a experiência em tempo real.
