# Atividade #2.2: Instalando o Packet Tracer e Conhecendo a Interface

## Objetivo

Meu objetivo nesta atividade foi instalar o Cisco Packet Tracer e familiarizar-me com suas principais ferramentas, focando nas barras de ferramentas superior e inferior. Além disso, criei redes locais básicas para praticar a segmentação de IPs.

---

## Descrição da Atividade: Explorando o Packet Tracer e Criando Redes

Segui os passos para instalar o Packet Tracer e explorar sua interface, além de criar algumas redes básicas.

### A. Instalação e Exploração do Packet Tracer

**1. Instalei o Cisco Packet Tracer:**

Para começar, acessei o link fornecido e segui as instruções para instalar o Packet Tracer em meu sistema. O processo de instalação é guiado e bastante intuitivo.

[https://www.netacad.com/es/courses/packet-tracer](https://www.netacad.com/es/courses/packet-tracer)

**2. Investiguei a Barra de Ferramentas Superior:**

Após abrir o Packet Tracer, dediquei um tempo para explorar os ícones e funcionalidades da barra de ferramentas localizada na parte superior da interface. Esta barra contém ferramentas essenciais para manipulação do projeto, como salvar, abrir, imprimir, copiar, colar, desfazer, refazer, e modos de simulação (tempo real e simulação).

> ![Barra de ferramentas superior do Packet Tracer, mostrando opções como salvar, abrir, copiar, colar, desfazer, refazer e modos de simulação.](Screenshot from 2025-09-10 19-31-15.png)

**3. Investiguei a Barra de Ferramentas Inferior:**

Em seguida, explorei os ícones e categorias da barra de ferramentas localizada na parte inferior esquerda da interface. Esta é a área onde escolhemos os dispositivos e conexões para montar nossas redes.

> A barra de ferramentas de ícones no canto inferior esquerdo possui várias categorias de componentes de rede. Revisei as categorias que correspondem a Dispositivos de rede (roteadores, switches, hubs, dispositivos wireless, segurança, WAN emulation), Dispositivos finais (PCs, laptops, servidores, impressoras, telefones IP, etc.) e Componentes (placas, módulos). A quarta categoria (com o ícone de raio) é Conexões e representa a mídia de rede suportada pelo Packet Tracer (cabos de console, straight-through, crossover, fibra óptica, telefone, coaxial, serial DCE/DTE, USB).

> ![Barra de ferramentas inferior do Packet Tracer, exibindo categorias de dispositivos de rede, dispositivos finais, componentes e tipos de conexão.](Screenshot from 2025-09-10 19-31-23.png)

### B. Criação de Redes Locais no Packet Tracer

**4. Criei uma Rede Local com 8 Hosts e IPs Fixos:**

Utilizei o simulador Packet Tracer para criar uma rede local simples.

**Como fiz:**

1.  **Adicionei um Switch:** Na barra de ferramentas inferior, selecionei "Network Devices" (Dispositivos de Rede) e arrastei um switch (por exemplo, 2960-24TT) para a área de trabalho.
2.  **Adicionei 8 PCs:** Selecionei "End Devices" (Dispositivos Finais) e arrastei 8 PCs para a área de trabalho.
3.  **Conectei os PCs ao Switch:** Selecionei "Connections" (Conexões - o ícone de raio), escolhi o cabo "Copper Straight-Through" (cabo reto) e conectei cada PC a uma porta FastEthernet do switch.
4.  **Configurei IPs Fixos para cada PC:**
    *   Cliquei em cada PC.
    *   Fui na aba "Desktop".
    *   Cliquei em "IP Configuration".
    *   Selecionei "Static".
    *   Atribuí um endereço IP fixo para cada PC (ex: `192.168.1.10`, `192.168.1.11`, ..., `192.168.1.17`).
    *   A máscara de sub-rede (`255.255.255.0`) foi preenchida automaticamente.
    *   Deixei o Gateway Padrão e o Servidor DNS em branco, pois é uma rede local simples sem roteador.

![Configuração de IP de um PC no Packet Tracer, mostrando o endereço IPv4 192.168.1.10 e a máscara de sub-rede 255.255.255.0.](Screenshot from 2025-09-10 19-40-15.png)
![Configuração de IP de um PC no Packet Tracer, mostrando o endereço IPv4 192.168.1.17 e a máscara de sub-rede 255.255.255.0.](Screenshot from 2025-09-10 19-43-01.png)

5.  **Testei a Conectividade:** Usei a ferramenta "PDU Simple" (o ícone de envelope fechado) para enviar pacotes entre os PCs e verificar se a comunicação estava funcionando.

![Resultado de um teste de conectividade bem-sucedido no Packet Tracer, indicando que os pacotes foram enviados e recebidos com sucesso entre os dispositivos.](Screenshot from 2025-09-10 19-44-52.png)





**5. Criei Três Redes Locais Segmentadas:**

No simulador Packet Tracer, criei três redes locais distintas, cada uma com seu próprio switch e segmentada logicamente através da configuração de seus endereços IP.

**Como fiz:**

1.  **Rede 1 (Ex: 192.168.1.0/24):**
    *   Adicionei um Switch.
    *   Adicionei alguns PCs (ex: 2 ou 3).
    *   Conectei os PCs ao Switch com cabos retos.
    *   Configurei os IPs dos PCs para estarem na rede `192.168.1.x` (ex: `192.168.1.10`, `192.168.1.11`).

![Topologia da Rede 1 no Packet Tracer, mostrando um switch conectado a vários PCs com endereços IP na faixa 192.168.1.x.](Screenshot from 2025-09-10 20-05-22.png)

2.  **Rede 2 (Ex: 192.168.2.0/24):**
    *   Adicionei um segundo Switch.
    *   Adicionei alguns PCs.
    *   Conectei os PCs ao segundo Switch.
    *   Configurei os IPs dos PCs para estarem na rede `192.168.2.x` (ex: `192.168.2.10`, `192.168.2.11`).

![Topologia da Rede 2 no Packet Tracer, mostrando um switch conectado a vários PCs com endereços IP na faixa 192.168.2.x.](Screenshot from 2025-09-10 20-05-27.png)

3.  **Rede 3 (Ex: 192.168.3.0/24):**
    *   Adicionei um terceiro Switch.
    *   Adicionei alguns PCs.
    *   Conectei os PCs ao terceiro Switch.
    *   Configurei os IPs dos PCs para estarem na rede `192.168.3.x` (ex: `192.168.3.10`, `192.168.3.11`).

![Topologia da Rede 3 no Packet Tracer, mostrando um switch conectado a vários PCs com endereços IP na faixa 192.168.3.x.](Screenshot from 2025-09-10 20-05-32.png)

![Visão geral da topologia no Packet Tracer mostrando as três redes locais segmentadas, cada uma com seu próprio switch e faixa de IP.](Screenshot from 2025-09-10 19-57-04.png)

**Observação:** Para que essas três redes se comunicassem entre si, eu precisaria adicionar um roteador e configurar as interfaces do roteador com IPs em cada uma dessas redes, além de configurar o gateway padrão nos PCs. No entanto, o objetivo desta atividade era apenas criar as redes segmentadas, não a comunicação entre elas.

## Referências

*   [Cisco Networking Academy: Packet Tracer](https://www.netacad.com/es/courses/packet-tracer)
