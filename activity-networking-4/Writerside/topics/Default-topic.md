# Tarefa 4.4: Redes de Computadores - Modelo OSI

Respostas para as questões da atividade da semana 4 sobre modelos de referência de redes.

---

### 1. As Camadas do Modelo OSI

O Modelo OSI (Open Systems Interconnection) é um modelo conceitual que padroniza as funções de um sistema de telecomunicação ou computação em sete camadas de abstração.

*   **Camada 7: Aplicação (Application):** A camada mais próxima do usuário. Fornece serviços de rede para as aplicações, como navegadores e clientes de e-mail. Protocolos: HTTP, SMTP.
*   **Camada 6: Apresentação (Presentation):** Atua como um tradutor, garantindo que os dados enviados pela camada de aplicação de um sistema possam ser lidos pela camada de aplicação de outro. Lida com formatação, criptografia e compressão de dados.
*   **Camada 5: Sessão (Session):** Responsável por abrir, gerenciar e fechar as sessões de comunicação entre dois dispositivos. Controla o diálogo e a sincronização.
*   **Camada 4: Transporte (Transport):** Garante a entrega confiável e ordenada dos dados de ponta a ponta. Controla o fluxo, a segmentação e a remontagem dos dados. Protocolos principais: TCP e UDP.
*   **Camada 3: Rede (Network):** Responsável pelo endereçamento lógico (endereços IP) e pelo roteamento dos pacotes, determinando o melhor caminho para os dados chegarem ao destino através da rede.
*   **Camada 2: Enlace de Dados (Data Link):** Fornece trânsito de dados confiável através de um link físico. Lida com o endereçamento físico (endereços MAC), controle de acesso ao meio e detecção de erros.
*   **Camada 1: Física (Physical):** Define as especificações elétricas e mecânicas para a conexão. É responsável pela transmissão dos bits brutos (0s e 1s) através do meio físico (cabos, fibra, rádio).

---

### 2. Analogia do Modelo OSI no Ano de 1990

Para entender o Modelo OSI em 1990, podemos fazer uma analogia com o processo de enviar uma carta comercial importante para outra cidade usando os serviços da época.

*   **Aplicação (Camada 7):** Um executivo escreve uma proposta comercial em um processador de texto no seu computador. A "aplicação" é o software que cria a mensagem.
*   **Apresentação (Camada 6):** O executivo formata o documento com um layout profissional. Se a empresa parceira fosse estrangeira, o documento seria traduzido. Se fosse confidencial, poderia ser usado um código simples (criptografia). O importante é garantir que o destinatário consiga ler e entender.
*   **Sessão (Camada 5):** O executivo telefona para o destinatário e avisa: "Estou enviando uma proposta de 10 páginas por fax. Por favor, me confirme quando receber tudo". Eles estabeleceram uma "sessão" de comunicação.
*   **Transporte (Camada 4):** A proposta é enviada via um serviço de courier (como a FedEx), que oferece um número de rastreamento para garantir a entrega e confirmar o recebimento. Se fossem vários documentos, o serviço garantiria que todos chegassem juntos e em ordem.
*   **Rede (Camada 3):** O endereço no envelope (Rua, Cidade, CEP) é o "endereço lógico". A empresa de courier usa o CEP para definir a melhor rota (roteamento) para a carta, seja de avião ou caminhão, entre as cidades.
*   **Enlace (Camada 2):** Em cada trecho, a carta passa por pontos intermediários. Por exemplo, do escritório para o centro de distribuição local. A entrega entre esses dois pontos específicos é como a camada de enlace, que usa um "endereçamento local" (como o endereço MAC).
*   **Física (Camada 1):** A carta física sendo transportada pelo caminhão, avião e pelo mensageiro. As estradas e o ar são o "meio físico" por onde a informação viaja.

---

### 3. Localização do Endereço de Rede

O endereço de rede (endereço lógico, como o endereço IP) está localizado na **Camada 3 (Rede)** do Modelo OSI.

---

### 4. Partes de Rede e Host de Endereços IP

A divisão entre a parte de rede e a parte de host depende da classe do endereço IP e da sua máscara de sub-rede padrão.

*   **Endereço IP: `192.168.10.5`**
    *   **Classe:** C
    *   **Máscara Padrão:** 255.255.255.0
    *   **Parte da Rede:** `192.168.10.0`
    *   **Parte do Host:** `5`

*   **Endereço IP: `10.0.0.8`**
    *   **Classe:** A
    *   **Máscara Padrão:** 255.0.0.0
    *   **Parte da Rede:** `10.0.0.0`
    *   **Parte do Host:** `8` (identificado pelos últimos três octetos: 0.0.8)

*   **Endereço IP: `172.16.24.200`**
    *   **Classe:** B
    *   **Máscara Padrão:** 255.255.0.0
    *   **Parte da Rede:** `172.16.0.0`
    *   **Parte do Host:** `24.200` (identificado pelos últimos dois octetos)

---

### Fontes 

- [https://www.cloudflare.com/pt-br/learning/ddos/glossary/open-systems-interconnection-model-osi/](https://www.geeksforgeeks.org/computer-networks/open-systems-interconnection-model-osi/)
- [https://www.imperva.com/learn/application-security/osi-model/](https://www.geeksforgeeks.org/computer-networks/open-systems-interconnection-model-osi/)
- [https://www.geeksforgeeks.org/computer-networks/open-systems-interconnection-model-osi/](https://www.geeksforgeeks.org/computer-networks/open-systems-interconnection-model-osi/)
