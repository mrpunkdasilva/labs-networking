# Atividade # 4.1 - MODELOS DE CAMADAS

## A. Tabela de Classificação de Protocolos e Conceitos

A tabela abaixo classifica cada item na camada correspondente do modelo híbrido:

| ITEM                                   | 1 (Física) | 2 (Enlace) | 3 (Rede) | 4 (Transporte) | 5 (Aplicação) | Comentários adicionais                                                                                             |
| -------------------------------------- | :--------: | :--------: | :------: | :------------: | :-----------: | ------------------------------------------------------------------------------------------------------------------ |
| 4B5B                                   |     X      |            |          |                |               | Código de linha que mapeia 4 bits de dados para 5 bits na transmissão para garantir transições de sinal.         |
| Address Resolution Protocol (ARP)      |            |     X      |    X     |                |               | Mapeia endereços da Camada 3 (IP) para endereços da Camada 2 (MAC). Opera entre as camadas 2 e 3.                 |
| Alternate Mark Inversion (AMI)         |     X      |            |          |                |               | Código de linha bipolar que representa `1`s com pulsos de voltagem alternados.                                     |
| Autonomous Systems (AS)                |            |            |    X     |                |               | Um conjunto de roteadores sob uma única administração técnica, usado em roteamento interdomínio (BGP).             |
| Border Gateway Protocol (BGP)          |            |            |          |                |       X       | Protocolo de roteamento exterior que opera sobre TCP (porta 179). Gerencia o roteamento para a camada de Rede.    |
| Bridge                                 |            |     X      |          |                |               | Dispositivo que conecta segmentos de rede na camada de enlace, filtrando tráfego com base em endereços MAC.      |
| Congestion control                     |            |            |          |       X        |               | Mecanismo para controlar o congestionamento na rede, uma função chave do TCP.                                      |
| CSMA/CA                                |            |     X      |          |                |               | (Carrier Sense Multiple Access with Collision Avoidance) Método de acesso ao meio usado em redes Wi-Fi (802.11). |
| CSMA/CD                                |            |     X      |          |                |               | (Carrier Sense Multiple Access with Collision Detection) Método de acesso ao meio usado em redes Ethernet.     |
| Cyclic Redundancy Check (CRC)          |            |     X      |          |                |               | Código de detecção de erros usado para verificar a integridade dos quadros (frames).                               |
| Distance vector routing protocols      |            |            |    X     |                |               | Classe de algoritmos de roteamento (ex: RIP) que usa o vetor distância (algoritmo Bellman-Ford).                 |
| Dynamic Host Configuration Protocol (DHCP) |            |            |          |                |       X       | Protocolo que atribui endereços IP e outras configurações de rede a dispositivos. Usa UDP (portas 67, 68).      |
| File Transfer Protocol (FTP)           |            |            |          |                |       X       | Protocolo para transferência de arquivos. Usa TCP (portas 20, 21).                                                 |
| Flow control                           |            |     X      |          |       X        |               | Controla a taxa de transmissão de dados. Ocorre tanto na camada de enlace quanto na de transporte (TCP).         |
| Gateway                                |            |            |    X     |       X        |       X       | Termo genérico. Default Gateway (Roteador) é C3. NAT Gateway é C3/C4. Application Gateway é C5.                |
| Hub                                    |     X      |            |          |                |               | Dispositivo da camada física que repete o sinal para todas as suas portas.                                         |
| Hypertext Transfer Protocol (HTTP)     |            |            |          |                |       X       | Protocolo para comunicação na World Wide Web. Usa TCP (porta 80).                                                  |
| ICMP                                   |            |            |    X     |                |               | (Internet Control Message Protocol) Usado para mensagens de erro e controle. Considerado parte da camada de rede. |
| Internet Protocol (IP)                 |            |            |    X     |                |               | Principal protocolo da camada de rede, responsável pelo endereçamento e roteamento de pacotes.                   |
| Link state routing protocols           |            |            |    X     |                |               | Classe de algoritmos de roteamento (ex: OSPF) onde cada roteador constrói um mapa da topologia da rede.        |
| Logical addresses                      |            |            |    X     |                |               | Endereços da camada de rede (ex: Endereços IP).                                                                    |
| Manchester-Code                        |     X      |            |          |                |               | Código de linha que combina dados e clock em um único sinal.                                                       |
| Media access control                   |            |     X      |          |                |               | Subcamada do enlace de dados responsável por controlar o acesso ao meio físico.                                    |
| Modem                                  |     X      |            |          |                |               | (Modulador-Demodulador) Converte sinais digitais em analógicos para transmissão e vice-versa.                    |
| MLT-3 Levels Multiport Bridge          |     X      |     X      |          |                |               | MLT-3 é um código de linha (C1). Multiport Bridge (Switch) é um dispositivo de enlace (C2).                      |
| Non-Return to Zero (NRZ)               |     X      |            |          |                |               | Família de códigos de linha onde o nível do sinal é constante durante a duração do bit.                          |
| Open Shortest Path First (OSPF)        |            |            |    X     |                |               | Protocolo de roteamento interior do tipo link-state. Opera diretamente sobre IP (protocolo 89).                |
| Physical addresses                     |            |     X      |          |                |               | Endereços da camada de enlace (ex: Endereços MAC).                                                                 |
| Port numbers                           |            |            |          |       X        |               | Identificam processos específicos em um host. Usados por TCP e UDP.                                                |
| Reliable end-to-end data connection    |            |            |          |       X        |               | Característica principal do TCP, que garante a entrega ordenada e sem erros dos dados.                           |
| Repeater                               |     X      |            |          |                |               | Dispositivo da camada física que regenera e retransmite o sinal.                                                   |
| Routing Information Protocol (RIP)     |            |            |          |                |       X       | Protocolo de roteamento interior do tipo distance-vector. Usa UDP (porta 520).                                   |
| Security                               |            |     X      |    X     |       X        |       X       | Implementada em várias camadas: WPA (C2), IPsec (C3), TLS (C4/C5), SSH (C5).                                     |
| Spanning Tree Protocol (STP)           |            |     X      |          |                |               | Protocolo que previne loops de switching em redes com bridges/switches redundantes.                                |
| Telnet                                 |            |            |          |                |       X       | Protocolo para acesso remoto a terminais de forma não criptografada. Usa TCP (porta 23).                         |
| Transmission Control Protocol (TCP)    |            |            |          |       X        |               | Fornece comunicação confiável, ordenada e com verificação de erros.                                                |
| User Datagram Protocol (UDP)           |            |            |          |       X        |               | Fornece comunicação não orientada à conexão e sem garantias de entrega.                                            |
| Wireless LAN                           |     X      |     X      |          |                |               | Tecnologias de rede sem fio (ex: Wi-Fi) são definidas pelas camadas física e de enlace (padrão IEEE 802.11).   |

## B. Tabela de Identificação de Protocolos

| Frase                                                              | Protocolo Relacionado |
| ------------------------------------------------------------------ | --------------------- |
| Permite controle de congestionamento e controle de fluxo           | TCP                   |
| Mapeia o endereço lógico para um endereço físico                   | ARP                   |
| Permite evitar colisões em redes físicas                           | CSMA/CA               |
| Fornece roteamento em sistemas autônomos com o algoritmo Bellman-Ford | RIP                   |
| Permite o controle remoto de computadores de forma criptografada   | SSH*                  |
| Fornece roteamento em sistemas autônomos com o algoritmo Dijkstra  | OSPF                  |
| Atribuir configurações de rede a dispositivos de rede              | DHCP                  |
| Permite o controle remoto de computadores de forma não criptografada | Telnet                |
| Permite comunicação entre processos não orientada à conexão        | UDP                   |
| Resolve nomes de domínio em endereços lógicos                      | DNS*                  |
| Detecta colisões em redes físicas                                  | CSMA/CD               |
| Upload e download de arquivos não criptografados                   | FTP                   |
| Troca de e-mails                                                   | SMTP*                 |
| Troca de mensagens de diagnóstico e controle de conexão            | ICMP                  |
| Reduza uma rede de computadores a uma árvore sem loops             | STP                   |

<note>

*Nota: Os protocolos SSH, DNS e SMTP são as respostas corretas, mas não estavam na lista da tabela anterior.

</note>

## Referências Online

*   **IANA Protocol Registries:** [https://www.iana.org/protocols](https://www.iana.org/protocols) - Para consulta de números de porta e parâmetros de protocolos.
*   **IETF RFC Datatracker:** [https://datatracker.ietf.org/](https://datatracker.ietf.org/) - Para pesquisar e ler os documentos RFC que definem os padrões da Internet.
*   **Cisco Networking Academy:** [https://www.netacad.com/](https://www.netacad.com/) - Cursos e materiais de aprendizagem sobre redes.
