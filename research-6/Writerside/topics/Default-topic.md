# Resolução da Tarefa 6.4: Redes

Este documento apresenta a resolução dos exercícios propostos na tarefa 6.4, detalhando o planejamento e a implementação de um esquema de endereçamento IP utilizando VLSM para uma rede IPv4 e a subdivisão de um bloco de endereços IPv6.

## Introdução

O planejamento cuidadoso do endereçamento IP é um pilar fundamental na arquitetura de redes de computadores. Uma alocação eficiente de endereços garante não apenas a conectividade e o funcionamento adequado dos serviços, mas também a escalabilidade e a segurança da rede. Neste contexto, a técnica de Máscara de Sub-rede de Tamanho Variável (VLSM) surge como uma solução poderosa para o aproveitamento máximo do espaço de endereçamento IPv4, evitando o desperdício. Paralelamente, a transição para o IPv6 se torna cada vez mais necessária para suportar o crescimento exponencial da internet, e compreender sua estrutura de endereçamento e subnetting é essencial para o profissional de redes.

## 1. Projeto de Rede com VLSM (Variable Length Subnet Mask)

O objetivo deste exercício é projetar um plano de endereçamento para a rede `162.20.0.0/22` que atenda às necessidades específicas de cada departamento da Faculdade de Engenharia. A utilização de VLSM é imperativa para otimizar a distribuição de endereços, alocando apenas os recursos necessários para cada sub-rede.

### Metodologia e Análise de Requisitos

O processo de subnetting com VLSM inicia-se com a análise detalhada dos requisitos de cada sub-rede. A abordagem mais eficiente consiste em ordenar as necessidades em ordem decrescente, da sub-rede que demanda mais hosts para a que demanda menos. Isso garante que os maiores blocos contíguos de endereços sejam alocados primeiro, simplificando o gerenciamento e evitando a fragmentação do espaço de IP.

Para cada requisito, o número de bits de host (`n`) é determinado pela fórmula `2^n - 2 >= número de hosts`, onde `-2` representa os endereços de rede e de broadcast, que não são utilizáveis por dispositivos.

A tabela abaixo consolida essa análise:

| Departamento/Finalidade | Redes | Hosts por Rede | Hosts Necessários + 2 | Bits para Hosts | Prefixo de Sub-rede (/n) | Tamanho do Bloco |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Engenharia da Computação | 4 | 100 | 102 | 7 (2⁷=128) | /25 | 128 |
| Engenharia Civil | 3 | 40 | 42 | 6 (2⁶=64) | /26 | 64 |
| Engenharia Química | 2 | 30 | 32 | 5 (2⁵=32) | /27 | 32 |
| Engenharia Matemática | 2 | 25 | 27 | 5 (2⁵=32) | /27 | 32 |
| Engenharia Biológica | 1 | 20 | 22 | 5 (2⁵=32) | /27 | 32 |
| Engenharia Industrial | 3 | 15 | 17 | 4 (2⁴=16) | /28 | 16 |
| Coordenação da Faculdade | 1 | 10 | 12 | 4 (2⁴=16) | /28 | 16 |
| Links Ponto-a-Ponto | 6 | 2 | 4 | 2 (2²=4) | /30 | 4 |

### Tabela de Alocação de Sub-redes (VLSM)

Com base na análise, as sub-redes são alocadas sequencialmente a partir do início do bloco `162.20.0.0/22`. A tabela a seguir detalha o plano de endereçamento completo.

| Departamento | Rede | Endereço de Rede | Prefixo | Máscara de Sub-rede | Faixa de Hosts | Endereço de Broadcast |
| :--- | :--: | :--- | :---: | :--- | :--- | :--- |
| Eng. Computação | 1 | `162.20.0.0` | /25 | `255.255.255.128` | `162.20.0.1` - `162.20.0.126` | `162.20.0.127` |
| Eng. Computação | 2 | `162.20.0.128` | /25 | `255.255.255.128` | `162.20.0.129` - `162.20.0.254` | `162.20.0.255` |
| Eng. Computação | 3 | `162.20.1.0` | /25 | `255.255.255.128` | `162.20.1.1` - `162.20.1.126` | `162.20.1.127` |
| Eng. Computação | 4 | `162.20.1.128` | /25 | `255.255.255.128` | `162.20.1.129` - `162.20.1.254` | `162.20.1.255` |
| Eng. Civil | 1 | `162.20.2.0` | /26 | `255.255.255.192` | `162.20.2.1` - `162.20.2.62` | `162.20.2.63` |
| Eng. Civil | 2 | `162.20.2.64` | /26 | `255.255.255.192` | `162.20.2.65` - `162.20.2.126` | `162.20.2.127` |
| Eng. Civil | 3 | `162.20.2.128` | /26 | `255.255.255.192` | `162.20.2.129` - `162.20.2.190` | `162.20.2.191` |
| Eng. Química | 1 | `162.20.2.192` | /27 | `255.255.255.224` | `162.20.2.193` - `162.20.2.222` | `162.20.2.223` |
| Eng. Química | 2 | `162.20.2.224` | /27 | `255.255.255.224` | `162.20.2.225` - `162.20.2.254` | `162.20.2.255` |
| Eng. Matemática | 1 | `162.20.3.0` | /27 | `255.255.255.224` | `162.20.3.1` - `162.20.3.30` | `162.20.3.31` |
| Eng. Matemática | 2 | `162.20.3.32` | /27 | `255.255.255.224` | `162.20.3.33` - `162.20.3.62` | `162.20.3.63` |
| Eng. Biológica | 1 | `162.20.3.64` | /27 | `255.255.255.224` | `162.20.3.65` - `162.20.3.94` | `162.20.3.95` |
| Eng. Industrial | 1 | `162.20.3.96` | /28 | `255.255.255.240` | `162.20.3.97` - `162.20.3.110` | `162.20.3.111` |
| Eng. Industrial | 2 | `162.20.3.112` | /28 | `255.255.255.240` | `162.20.3.113` - `162.20.3.126` | `162.20.3.127` |
| Eng. Industrial | 3 | `162.20.3.128` | /28 | `255.255.255.240` | `162.20.3.129` - `162.20.3.142` | `162.20.3.143` |
| Coordenação | 1 | `162.20.3.144` | /28 | `255.255.255.240` | `162.20.3.145` - `162.20.3.158` | `162.20.3.159` |
| Link Roteador | 1 | `162.20.3.160` | /30 | `255.255.255.252` | `162.20.3.161` - `162.20.3.162` | `162.20.3.163` |
| Link Roteador | 2 | `162.20.3.164` | /30 | `255.255.255.252` | `162.20.3.165` - `162.20.3.166` | `162.20.3.167` |
| Link Roteador | 3 | `162.20.3.168` | /30 | `255.255.255.252` | `162.20.3.169` - `162.20.3.170` | `162.20.3.171` |
| Link Roteador | 4 | `162.20.3.172` | /30 | `255.255.255.252` | `162.20.3.173` - `162.20.3.174` | `162.20.3.175` |
| Link Roteador | 5 | `162.20.3.176` | /30 | `255.255.255.252` | `162.20.3.177` - `162.20.3.178` | `162.20.3.179` |
| Link Roteador | 6 | `162.20.3.180` | /30 | `255.255.255.252` | `162.20.3.181` - `162.20.3.182` | `162.20.3.183` |

Após a alocação de todas as sub-redes necessárias, o próximo endereço de rede disponível para futuras alocações ou expansões é `162.20.3.184`.

## 2. Sub-redes IPv6

O segundo exercício aborda o endereçamento IPv6, um protocolo desenvolvido para suceder o IPv4 e resolver a questão de seu esgotamento. A tarefa consiste em subdividir o bloco de endereços `2001:0022:00AA::/48` em sub-redes com prefixo `/64`.

### Processo de Sub-rede IPv6

O endereço `2001:0022:00AA::/48` é um bloco de endereçamento global. A notação `/48` indica que os primeiros 48 bits são fixos e designam a rede pública. A prática padrão, definida pela RFC 4291, é utilizar os 16 bits seguintes (do 48 ao 64) para criar um "ID de Sub-rede". Isso resulta em sub-redes com prefixo `/64`.

Essa estrutura `/64` é fundamental no IPv6, pois permite o funcionamento de mecanismos como a Autoconfiguração de Endereço Stateless (SLAAC), que simplifica enormemente a gestão de endereços em redes locais. Com 16 bits para o ID de Sub-rede, temos a capacidade de criar `2^16` (65.536) sub-redes distintas a partir do bloco `/48` original.

O processo consiste em incrementar o valor do 4º hexteto do endereço, que representa o ID de Sub-rede, de `0000` até `FFFF`.

### As 10 Primeiras Sub-redes /64

A seguir, são listadas as 10 primeiras sub-redes `/64` resultantes do processo. Os endereços são apresentados em seu formato canônico e também no formato abreviado (com a omissão de zeros à esquerda e a compressão de sequências de zeros com `::`), que é o mais comum na prática.

1.  `2001:0022:00AA:0000::/64` -> `2001:22:aa::/64`
2.  `2001:0022:00AA:0001::/64` -> `2001:22:aa:1::/64`
3.  `2001:0022:00AA:0002::/64` -> `2001:22:aa:2::/64`
4.  `2001:0022:00AA:0003::/64` -> `2001:22:aa:3::/64`
5.  `2001:0022:00AA:0004::/64` -> `2001:22:aa:4::/64`
6.  `2001:0022:00AA:0005::/64` -> `2001:22:aa:5::/64`
7.  `2001:0022:00AA:0006::/64` -> `2001:22:aa:6::/64`
8.  `2001:0022:00AA:0007::/64` -> `2001:22:aa:7::/64`
9.  `2001:0022:00AA:0008::/64` -> `2001:22:aa:8::/64`
10. `2001:0022:00AA:0009::/64` -> `2001:22:aa:9::/64`

