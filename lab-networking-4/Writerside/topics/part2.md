# Atividade 4.2: Conexão com Redes Remotas

Este documento detalha o processo e as conclusões da Atividade 4.2, focada em entender a comunicação entre dispositivos em uma mesma rede local (LAN) e em redes distintas, com base na topologia de rede fornecida.

## A. Preparando o Ambiente de Teste

Para iniciar a análise, foi necessário primeiro construir a topologia de rede no simulador Cisco Packet Tracer, conforme a imagem de referência. Esta seção detalha o passo a passo para a montagem e configuração do ambiente.

![Diagrama da topologia de rede do Packet Tracer com um roteador central conectando duas LANs. A LAN da esquerda (10.10.10.0/24) tem um switch, um access point e dois laptops. A LAN da direita (172.16.31.0/24) tem um switch, um hub e quatro PCs.](1.png)

*Figura 1: Topologia de rede implementada no Cisco Packet Tracer, mostrando duas redes locais interconectadas por um roteador.*

### Passo 1: Adicionar Dispositivos

Adicionei os seguintes dispositivos à área de trabalho do Packet Tracer para replicar a topologia:

*   **Roteadores:** 1x Roteador (ex: modelo `2911`).
*   **Switches:** 2x Switches (ex: modelo `2960`).
*   **Hubs:** 1x Hub genérico (`Hub-PT`).
*   **Dispositivos sem fio:** 1x Access Point (`AccessPoint-PT`).
*   **Dispositivos Finais:** 4x PCs (`PC-PT`) e 2x Laptops (`Laptop-PT`).

### Passo 2: Conectar os Dispositivos

Realizei as conexões físicas entre os dispositivos, espelhando a topologia da Figura 1:

*   **Conceito (Tipos de Cabo):** Usei o cabo **Copper Straight-Through** (Direto) para conectar dispositivos de camadas diferentes (ex: PC para Switch, Switch para Roteador). A ferramenta de conexão automática do Packet Tracer também pode ser usada.

1.  **Rede Direita (172.16.31.0/24):**
    *   Conectei a porta `GigabitEthernet0/1` do `Roteador` à porta `GigabitEthernet0/1` do `Switch` da direita.
    *   Conectei a porta `FastEthernet0/1` do `Switch` ao `PC` com IP `172.16.31.4`.
    *   Conectei a porta `FastEthernet0/2` do `Switch` ao `PC` com IP `172.16.31.5`.
    *   Conectei a porta `FastEthernet0/3` do `Switch` ao `Hub`.
    *   Conectei o `Hub` aos `PCs` com IPs `172.16.31.2` e `172.16.31.3`.

![Conexões da rede da direita no Packet Tracer: Roteador conectado ao Switch, que por sua vez se conecta a dois PCs e a um Hub. O Hub se conecta a outros dois PCs.](image_6.png)

2.  **Rede Esquerda (10.10.10.0/24):**
    *   Conectei a porta `GigabitEthernet0/0` do `Roteador` à porta `GigabitEthernet0/1` do `Switch0` (o da esquerda).
    *   Conectei a porta `FastEthernet0/1` do `Switch0` ao `Access Point`.
    *   Nos `Laptops`, substituí a placa de rede Ethernet por uma placa sem fio (WPC300N) para permitir a conexão com o `Access Point`.


![Conexões da rede da esquerda no Packet Tracer: Roteador conectado ao Switch0, que se conecta a um Access Point. Dois laptops estão conectados sem fio ao Access Point.](image_7.png)


### Passo 3: Configurar Endereços IP e Gateways

Com a rede fisicamente montada, configurei os endereços IP estaticamente em cada dispositivo.

*   **Conceito (Gateway Padrão):** O Gateway Padrão (Default Gateway) é o endereço do roteador que um dispositivo usará para enviar pacotes para fora de sua rede local. É o "portão de saída" da LAN.

**Configuração do Roteador:**
*   Acesse a aba `CLI` do roteador e execute os seguintes comandos:
    ```sh
    enable
    configure terminal
    ! Configura a interface para a rede 10.10.10.0
    interface GigabitEthernet0/0
    ip address 10.10.10.1 255.255.255.0
    no shutdown
    exit
    ```
    
![Screenshot da linha de comando (CLI) do roteador no Packet Tracer mostrando a configuração da interface GigabitEthernet0/0 com o IP 10.10.10.1 e o comando 'no shutdown'.](Screenshot12.png)

```sh
! Configura a interface para a rede 172.16.31.0
interface GigabitEthernet0/1
ip address 172.16.31.1 255.255.255.0
no shutdown
exit
```
![Screenshot da CLI do roteador no Packet Tracer mostrando a configuração da interface GigabitEthernet0/1 com o IP 172.16.31.1 e o comando 'no shutdown'.](Screenshot13.png)

**Configuração dos Dispositivos Finais:**
*   Para cada PC e Laptop, acesse a aba `Desktop > IP Configuration`.
*   **Laptops (Rede 10.10.10.0/24):**
*   **Laptop 1:** IP `10.10.10.2`, Mask `255.255.255.0`, Gateway `10.10.10.1`

![Janela de configuração de IP do Packet Tracer para o Laptop 1, mostrando o endereço IP 10.10.10.2, máscara de sub-rede 255.255.255.0 e gateway padrão 10.10.10.1.](image.png)

*   **Laptop 2:** IP `10.10.10.3`, Mask `255.255.255.0`, Gateway `10.10.10.1`

![Janela de configuração de IP do Packet Tracer para o Laptop 2, mostrando o endereço IP 10.10.10.3, máscara de sub-rede 255.255.255.0 e gateway padrão 10.10.10.1.](image_2.png)

*   **PCs (Rede 172.16.31.0/24):**
*   **PC 1:** IP `172.16.31.2`, Mask `255.255.255.0`, Gateway `172.16.31.1`

![Janela de configuração de IP do Packet Tracer para o PC 1, mostrando o endereço IP 172.16.31.2, máscara de sub-rede 255.255.255.0 e gateway padrão 172.16.31.1.](image_3.png)

*   **PC 2:** IP `172.16.31.3`, Mask `255.255.255.0`, Gateway `172.16.31.1`

![Janela de configuração de IP do Packet Tracer para o PC 2, mostrando o endereço IP 172.16.31.3, máscara de sub-rede 255.255.255.0 e gateway padrão 172.16.31.1.](image_4.png)

*   **PC 3:** IP `172.16.31.4`, Mask `255.255.255.0`, Gateway `172.16.31.1`

![Janela de configuração de IP do Packet Tracer para o PC 3, mostrando o endereço IP 172.16.31.4, máscara de sub-rede 255.255.255.0 e gateway padrão 172.16.31.1.](image_5.png)

*   **PC 4:** IP `172.16.31.5`, Mask `255.255.255.0`, Gateway `172.16.31.1`



## B. Testes de Conectividade e Análise de PDU

Com o ambiente configurado, realizei os testes de `ping` para analisar o fluxo de pacotes (PDUs).

### Como Capturar os Dados da PDU

Para preencher as tabelas a seguir, utilize o modo de simulação do Packet Tracer:

1.  **Mude para o Modo Simulação:** No canto inferior direito da interface, alterne de "Realtime" para "Simulation".
2.  **Execute o Ping:** Abra o Command Prompt no PC de origem e execute o comando `ping`. Um pacote (PDU) aparecerá no dispositivo.
3.  **Avance a Simulação:** Use o botão "Capture / Forward" para mover o pacote passo a passo pela rede.
4.  **Inspecione a PDU:** A cada passo, clique no envelope do pacote para abrir a janela "PDU Information". Nela, você encontrará os endereços MAC e IP de origem e destino nas abas "Inbound PDU Details" e "Outbound PDU Details".

![Acessando o Command Prompt a partir do menu Desktop de um PC no Packet Tracer para iniciar os testes de conectividade.](entrnado no command prompt no terminal.png)

### Teste 1: Comunicação na Mesma LAN (Ping de 172.16.31.5 para 172.16.31.2)

Neste teste, a comunicação ocorre dentro da mesma rede local. O PC de origem (`172.16.31.5`) envia um pacote ICMP para o PC de destino (`172.16.31.2`). Como ambos estão na mesma sub-rede, o roteador não é envolvido. O switch encaminha o pacote para o hub, que por sua vez o replica para todos os dispositivos conectados, incluindo o destino.

![Resultado do comando 'ping 172.16.31.2' no terminal, mostrando quatro respostas bem-sucedidas (Reply from 172.16.31.2), confirmando a conectividade na mesma LAN.](testando a conectividade.png)

A tabela abaixo detalha as informações da PDU em cada etapa do caminho.

| IP Dispositivo | PDU Endereço MAC de destino | PDU Endereço MAC de origem | PDU Endereço IP de destino | PDU Endereço IP de origem |
| :--- | :--- | :--- | :--- | :--- |
| **PC (172.16.31.5)** | `00D0.D304.3501` (MAC do PC 172.16.31.2) | `000A.F374.B164` (MAC do PC 172.16.31.5) | `172.16.31.2` | `172.16.31.5` |
| **Switch1** | `00D0.D304.3501` | `000A.F374.B164` | `172.16.31.2` | `172.16.31.5` |
| **Hub1** | `00D0.D304.3501` | `000A.F374.B164` | `172.16.31.2` | `172.16.31.5` |
| **PC (172.16.31.2)** | `00D0.D304.3501` | `000A.F374.B164` | `172.16.31.2` | `172.16.31.5` |

### Teste 2: Comunicação com Rede Remota (Ping de 172.16.31.5 para 10.10.10.2)

Neste cenário, o PC de origem (`172.16.31.5`) precisa se comunicar com um dispositivo em outra rede (`10.10.10.2`). O pacote é enviado para o gateway padrão (o roteador). O roteador, então, reescreve o quadro da Camada 2 com novos endereços MAC e o encaminha para a rede de destino.

![Resultado do comando 'ping 10.10.10.2' no terminal, mostrando quatro respostas bem-sucedidas (Reply from 10.10.10.2), confirmando a conectividade com a rede remota.](testando conectividade remota.png)

A tabela abaixo mostra como os endereços MAC mudam quando o pacote atravessa o roteador, enquanto os endereços IP permanecem os mesmos.

| IP Dispositivo | PDU Endereço MAC de destino | PDU Endereço MAC de origem | PDU Endereço IP de destino | PDU Endereço IP de origem |
| :--- | :--- | :--- | :--- | :--- |
| **PC (172.16.31.5)** | `0001.C974.7502` (MAC do Roteador G0/1) | `000A.F374.B164` (MAC do PC 172.16.31.5) | `10.10.10.2` | `172.16.31.5` |
| **Switch1** | `0001.C974.7502` | `000A.F374.B164` | `10.10.10.2` | `172.16.31.5` |
| **Router0 (saída)** | `000C.8583.B561` (MAC do Laptop 10.10.10.2) | `0001.C974.7501` (MAC do Roteador G0/0) | `10.10.10.2` | `172.16.31.5` |
| **Switch0** | `000C.8583.B561` | `0001.C974.7501` | `10.10.10.2` | `172.16.31.5` |
| **AccessPoint0** | `000C.8583.B561` | `0001.C974.7501` | `10.10.10.2` | `172.16.31.5` |
| **Laptop0** | `000C.8583.B561` | `0001.C974.7501` | `10.10.10.2` | `172.16.31.5` |

## C. Análise e Conclusões

Com base nos testes, as seguintes conclusões foram extraídas e organizadas na tabela abaixo, conforme solicitado na atividade.

| Pergunta | Resposta |
| :--- | :--- |
| Existem diferentes mídias físicas na rede? | Sim, a rede utiliza cabos de par trançado (Ethernet) e ondas de rádio (Wi-Fi). |
| A mídia física influencia a PDU de alguma forma? | Sim. Embora os dados do pacote IP (Camada 3) não mudem, o quadro (PDU da Camada 2) é adaptado para cada mídia. O roteador e o access point convertem o quadro Ethernet (802.3) para o formato Wi-Fi (802.11) e vice-versa. |
| O Hub …. a informação entregue por qualquer um dos seus portos | **Replica (inunda)**. O Hub é um dispositivo de Camada 1 e envia os dados recebidos para todas as suas portas, sem qualquer filtragem. |
| O Switch …. a informação entregue por qualquer um dos seus portos | **Encaminha seletivamente**. O Switch é um dispositivo de Camada 2 que aprende os endereços MAC dos dispositivos em cada porta e encaminha os quadros apenas para a porta de destino correta. |
| O Roteador …. a informação entregue por qualquer um dos seus portos | **Roteia**. O Roteador é um dispositivo de Camada 3 que toma decisões de encaminhamento com base no endereço IP de destino, enviando pacotes entre redes diferentes. |
| O Access Point …. a informação entregue por qualquer um dos seus portos | **Converte e transmite**. Ele atua como uma ponte (Camada 2), convertendo os quadros Ethernet com fio em quadros sem fio (802.11) para transmissão. |
| O ponto de acesso sem fio faz alguma alteração na PDU? | Sim, ele altera o formato do quadro da Camada 2 (de Ethernet 802.3 para Wi-Fi 802.11), mas não altera o pacote IP interno. |
| Algum endereço IP ou MAC foi perdido no processo? | Não, nenhum endereço foi perdido. Os endereços IP de origem e destino final permaneceram os mesmos, enquanto os endereços MAC foram atualizados a cada salto de roteamento. |
| Quais camadas do modelo OSI correspondem ao Hub e ao Ponto de Acesso? | O **Hub** corresponde à **Camada 1 (Física)**. O **Access Point** opera principalmente na **Camada 2 (Enlace)**, mas também possui aspectos da **Camada 1 (Física)**. |
| Qual endereço MAC aparece primeiro em uma PDU, a origem ou o destino? | O endereço MAC de **destino** aparece primeiro no cabeçalho do quadro Ethernet. |
| Por que a ordem desses campos é importante? | Colocar o endereço de destino primeiro permite que os switches tomem decisões de encaminhamento mais rápidas. Eles podem começar a processar para onde enviar o quadro assim que leem os primeiros bytes, sem precisar ler o quadro inteiro. |
| Os endereços MAC mudam em… | **Cada salto de roteamento (em cada rede)**. Quando um pacote passa por um roteador para ir para outra rede, o roteador cria um novo quadro com novos endereços MAC de origem e destino. |
| Os endereços IP mudam em… | **Nenhum lugar (neste cenário)**. Os endereços IP de origem e destino final permanecem constantes durante toda a comunicação para identificar o remetente original e o destinatário final. A exceção seria em redes que usam NAT. |
| Faria diferença se usássemos IPv6 em vez de IPv4? | Os princípios fundamentais não mudariam. O roteamento ainda seria baseado em endereços lógicos (IPv6) e os endereços MAC ainda mudariam a cada salto. As principais diferenças seriam o formato e o tamanho dos endereços (128 bits) e o uso do protocolo NDP (Neighbor Discovery Protocol) em vez do ARP para resolução de endereços. |
