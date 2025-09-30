
# Laboratório Semana 5: Administração de Rede e Roteamento Estático

Neste laboratório, eu me concentrei em dois conceitos fundamentais da administração de redes: o cálculo de sub-redes IP e a configuração de rotas estáticas. Realizei uma série de cálculos para determinar as máscaras de sub-rede apropriadas para diferentes cenários de rede e configurei uma topologia no Cisco Packet Tracer para estabelecer a comunicação entre diferentes sub-redes usando rotas estáticas.

## Atividade 5.1: Administração de Rede

Esta atividade testou meu entendimento sobre o cálculo de sub-redes. Analisei quatro cenários diferentes e calculei a máscara de sub-rede ou as informações de rede corretas com base nos requisitos fornecidos.

### 1. Sub-rede para Crescimento

**Problema:** Minha rede usa o endereço IP 172.30.0.0/16. Inicialmente, existem 25 sub-redes com um mínimo de 1.000 hosts por sub-rede. Prevê-se que um total de 55 sub-redes sejam necessárias nos próximos anos. Qual máscara de sub-rede devo usar?

**Solução:**

Primeiro, identifiquei o número de bits necessários para as sub-redes. Como preciso acomodar 55 sub-redes, usei a fórmula 2^n >= 55, onde 'n' é o número de bits para a sub-rede.

- 2^5 = 32 (não é suficiente)
- 2^6 = 64 (suficiente)

Então, precisei de 6 bits para as sub-redes.

Em seguida, determinei o número de bits necessários para os hosts. Preciso de pelo menos 1.000 hosts por sub-rede, então usei a fórmula 2^m - 2 >= 1000, onde 'm' é o número de bits para os hosts.

- 2^9 = 512 (não é suficiente)
- 2^10 = 1024 (suficiente)

Então, precisei de 10 bits para os hosts.

A máscara original é /16. Utilizei 6 bits para as sub-redes, então a nova máscara será 16 + 6 = 22. Isso corresponde a uma máscara de sub-rede de **255.255.252.0**.

Portanto, a opção correta é a **c) 255.255.252.0**.

### 2. Sub-rede para uma Rede Pequena

**Problema:** Planejo configurar 100 computadores e fazer com que eles estabeleçam conectividade com a Internet. Meu ISP me atribuiu o endereço IP 192.168.16.0/24. São necessárias 10 sub-redes com 10 hosts cada. Qual máscara de sub-rede devo usar?

**Solução:**

Preciso de 10 sub-redes, então usei a fórmula 2^n >= 10.

- 2^3 = 8 (não é suficiente)
- 2^4 = 16 (suficiente)

Então, precisei de 4 bits para as sub-redes.

Também preciso de 10 hosts por sub-rede, então usei a fórmula 2^m - 2 >= 10.

- 2^3 = 8 (não é suficiente)
- 2^4 = 16 (suficiente)

Então, precisei de 4 bits para os hosts.

A máscara original é /24. Utilizei 4 bits para as sub-redes, então a nova máscara será 24 + 4 = 28. Isso corresponde a uma máscara de sub-rede de **255.255.255.240**.

Portanto, a opção correta é a **c) 255.255.255.240**.

### 3. Calculando Sub-redes e Hosts

**Problema:** Se eu tiver um endereço IP 172.17.111.0 com uma máscara 255.255.254.0, quantas sub-redes e quantos hosts válidos haverá por sub-rede?

**Solução:**

O endereço é da Classe B, então a máscara padrão é 255.255.0.0 (/16). A máscara fornecida é 255.255.254.0, que em binário é 11111111.11111111.11111110.00000000. Esta é uma máscara /23.

- Número de bits de sub-rede = 23 - 16 = 7.
- Número de sub-redes = 2^7 = 128.
- Número de bits de host = 32 - 23 = 9.
- Número de hosts por sub-rede = 2^9 - 2 = 510.

Dadas as opções, a resposta mais plausível é a **b) 128 sub-redes com 510 hosts cada**.

### 4. Identificando a Sub-rede e o Endereço de Broadcast

**Problema:** A partir do endereço IP 192.168.85.129 com a máscara 255.255.255.192, qual é a sub-rede e o endereço de broadcast aos quais o host pertence?

**Solução:**

A máscara 255.255.255.192 é uma máscara /26. Isso significa que o incremento entre as sub-redes é de 64 no último octeto (256 - 192 = 64).

As sub-redes são:
- 192.168.85.0
- 192.168.85.64
- 192.168.85.128
- 192.168.85.192

O endereço IP 192.168.85.129 pertence à sub-rede **192.168.85.128**.

O endereço de broadcast para esta sub-rede é o último endereço antes da próxima sub-rede, que é **192.168.85.191**.

Portanto, a opção correta é a **d) 192.168.85.128, broadcast 192.168.85.191**.

## Atividade 5.2: Configuração de Rotas Estáticas

Nesta atividade, meu objetivo foi projetar e configurar redes com roteamento estático, garantindo a comunicação entre todos os dispositivos. A atividade foi dividida em duas partes.

### Parte 1: Sub-rede e Endereçamento

Nesta primeira parte, o foco foi o planejamento. Recebi o espaço de endereço `192.168.2.0/24` para criar uma sub-rede que suportasse 60 hosts e, com base na topologia, preencher a tabela de endereçamento.

**Topologia de Referência:**

![Diagrama de topologia da Parte 1](2%20Diagrama%20de%20topologia.png){alt="Diagrama de topologia da primeira parte da atividade."}

**Cálculo da Sub-rede:**

Para suportar 60 hosts, usei a fórmula `2^n - 2 >= 60`, onde 'n' é o número de bits para hosts.
- `2^5 - 2 = 30` (não é suficiente)
- `2^6 - 2 = 62` (suficiente)

Precisei de 6 bits para os hosts. Como a rede original era /24, a nova máscara de sub-rede se tornou /26 (32 - 6 = 26), que corresponde a `255.255.255.192`.

**Tabela de Endereçamento Preenchida:**

Com base no cálculo e na topologia, preenchi a tabela de endereçamento.

![Tabela de endereçamento da Parte 1](2%20Tabela%20de%20endereçamento.png){alt="Tabela de endereçamento preenchida para a primeira parte da atividade."}

| Dispositivo | Interface | Endereço IP | Máscara de Sub-rede | Gateway Padrão |
|---|---|---|---|---|
| **R1** | Fa0/0 | 172.16.3.1 | 255.255.255.0 | N/C |
| | S0/0/0 | 172.16.2.1 | 255.255.255.0 | N/C |
| **R2** | Fa0/0 | 172.16.1.1 | 255.255.255.0 | N/C |
| | S0/0/0 | 172.16.2.2 | 255.255.255.0 | N/C |
| | S0/0/1 | 192.168.1.2 | 255.255.255.0 | N/C |
| **R3** | FA0/0 | 192.168.2.1 | 255.255.255.0 | N/C |
| | S0/0/1 | 192.168.1.1 | 255.255.255.0 | N/C |
| **PC1** | NIC | 172.16.3.10 | 255.255.255.0 | 172.16.3.1 |
| **PC2** | NIC | 172.16.1.10 | 255.255.255.0 | 172.16.1.1 |
| **PC3** | NIC | 192.168.2.10 | 255.255.255.0 | 192.168.2.1 |

### Parte 2: Implementação no Cisco Packet Tracer

Nesta segunda parte, a tarefa foi construir uma rede mais complexa no Cisco Packet Tracer, configurar o endereçamento IP e implementar rotas estáticas para permitir a comunicação de ponta a ponta.

**Topologia a ser Construída:**

![Diagrama de topologia da Parte 2](Diagrama%20de%20topologia.png){alt="Diagrama de topologia a ser construído na segunda parte da atividade."}

**Tabela de Endereçamento de Referência:**

![Tabela de endereçamento da Parte 2](Tabela%20de%20endereçamento.png){alt="Tabela de endereçamento para a segunda parte da atividade."}

| Dispositivo | Interface | Endereço IP | Máscara de Sub-rede | Gateway Padrão |
|---|---|---|---|---|
| **Branch** | Fa0/0 | 192.168.1.1 | 255.255.255.0 | N/C |
| | S0/0/0 | 172.16.1.1 | 255.255.255.0 | N/C |
| **HQ** | Fa0/0 | 192.168.2.1 | 255.255.255.0 | N/C |
| | S0/0/0 | 172.16.1.2 | 255.255.255.0 | N/C |
| | S0/0/1 | 209.165.201.2 | 255.255.255.252 | N/C |
| **ISP** | Fa0/0 | 209.165.200.225 | 255.255.255.224 | N/C |
| | S/0/0/1 | 209.165.201.1 | 255.255.255.252 | N/C |
| **PC1** | NIC | 192.168.1.10 | 255.255.255.0 | 192.168.1.1 |
| **PC2** | NIC | 192.168.2.10 | 255.255.255.0 | 192.168.2.1 |
| **Servidor Web** | NIC | 209.165.200.253 | 255.255.255.224 | 209.165.200.225 |

**Passo a Passo da Implementação:**

1.  **Montagem da Topologia:**
    *   Abri o Cisco Packet Tracer e adicionei os seguintes dispositivos à área de trabalho:
        *   3 Roteadores (usei o modelo 1941).
        *   2 Switches (usei o modelo 2960).
        *   2 PCs.
        *   1 Servidor.
    *   Renomeei os roteadores para `Branch`, `HQ` e `ISP` para corresponder ao diagrama.

![DISPOSITIVOS E OS ROTEATORES APENAS RENOMEADOS.png](DISPOSITIVOS E OS ROTEATORES APENAS RENOMEADOS.png)


2.  **Conexão dos Dispositivos:**
    *   Utilizei o cabo **Copper Straight-Through** (cabo direto) para conectar:
        *   `PC1` à porta `FastEthernet0/1` do Switch da `Branch`.
        *   O Switch da `Branch` (porta `FastEthernet0/2`) à porta `GigabitEthernet0/0` do roteador `Branch`.
        *   `PC2` à porta `FastEthernet0/1` do Switch da `HQ`.
        *   O Switch da `HQ` (porta `FastEthernet0/2`) à porta `GigabitEthernet0/0` do roteador `HQ`.
        *   O roteador `ISP` (porta `GigabitEthernet0/0`) ao `Servidor Web`.
    *   Para as conexões WAN entre os roteadores, primeiro adicionei os módulos `HWIC-2T` em cada roteador. Depois, usei o cabo **Serial DCE** para conectar:
        *   `Branch` (porta `Serial0/0/0`) a `HQ` (porta `Serial0/0/0`).
        *   `HQ` (porta `Serial0/0/1`) a `ISP` (porta `Serial0/0/1`).





> *Nota: Configurei o `clock rate 64000` nas interfaces seriais que funcionaram como DCE (`Branch` e `HQ`).*
> {style="note"}


3.  **Configuração do Endereçamento IP:**
    *   Acessei a aba `CLI` de cada roteador e as configurações de `Desktop > IP Configuration` dos PCs e do Servidor para atribuir os IPs, máscaras e gateways conforme a tabela de endereçamento.
    *   **Exemplo de configuração de uma interface no roteador `Branch`:**
        ```c#
        enable
        configure terminal
        interface GigabitEthernet0/0
        ip address 192.168.1.1 255.255.255.0
        no shutdown
        exit
        ```
    *   Repeti esse processo para todas as interfaces de todos os dispositivos.

4.  **Configuração das Rotas Estáticas:**
    *   Para que as redes pudessem "se enxergar", configurei as rotas estáticas.
    *   **No roteador `Branch`:** Apontei uma rota padrão para o próximo salto, que é o roteador `HQ`.
        ```c#
        configure terminal
        ip route 0.0.0.0 0.0.0.0 172.16.1.2
        ```
    *   **No roteador `HQ`:** Adicionei uma rota para a rede da `Branch` e uma rota padrão para o `ISP`.
        ```c#
        configure terminal
        ip route 192.168.1.0 255.255.255.0 172.16.1.1
        ip route 0.0.0.0 0.0.0.0 209.165.201.2
        ```
    *   **No roteador `ISP`:** Adicionei rotas para as redes internas da `Branch` e da `HQ`.
        ```c#
        configure terminal
        ip route 192.168.1.0 255.255.255.0 209.165.201.1
        ip route 192.168.2.0 255.255.255.0 209.165.201.1
        ```

5.  **Verificação da Conectividade:**
    *   Para garantir que tudo estava funcionando, usei a ferramenta de `ping` a partir do `PC1`:
        *   `ping 192.168.2.10` (para o `PC2`)
        *   `ping 209.165.200.226` (para o `Servidor Web`)
    *   Todos os pings foram bem-sucedidos, confirmando que a rede estava totalmente conectada e as rotas estáticas, corretamente configuradas.
    *   Também usei o comando `show ip route` em cada roteador para inspecionar a tabela de roteamento e verificar se as rotas estáticas (`S`) e as redes conectadas (`C`) estavam presentes.

## Conclusão

Este laboratório foi um ótimo exercício para aplicar meu conhecimento de cálculo de sub-redes e roteamento estático. Consegui projetar e configurar uma rede com sucesso, o que reforçou minha compreensão desses conceitos cruciais de rede.
