# Laboratório 7

## Parte 1: Simulando uma Rede Local com o Hamachi

Como meu colega de laboratório e eu não estávamos na mesma rede física, o primeiro passo foi construir uma "ponte" virtual entre nossos computadores. Para isso, usei o Hamachi para criar uma Rede Privada Virtual (VPN), fazendo com que nossas máquinas pensassem que estavam na mesma rede local.

1.  **Download e Instalação do Hamachi:**
    *   Primeiro, acessei o site oficial do Hamachi em [https://www.vpn.net/](https://www.vpn.net/) e baixei o instalador.
    *   Instalei o aplicativo na minha **máquina host** (não na Máquina Virtual), seguindo os passos do instaladorw. Meu colega fez o mesmo.

2.  **Criação da Rede:**
    *   Com o Hamachi instalado, abri o programa e cliquei no botão para ligá-lo.
    *   Naveguei até `Rede` > `Criar nova rede...`.
    *   Defini o **ID da rede** como `lab-redes-2025` e criei uma **senha**.
    *   Compartilhei essas credenciais com meu colega para que ele pudesse se conectar à minha rede.

![Rede criada e o colega conectado](image_11.png)

4.  **Verificação da Conexão:**
    *   Após meu colega se juntar, pude ver que a conexão foi estabelecida com sucesso, como mostra a imagem abaixo. Estávamos prontos para a próxima fase.

![A conexão com o computador do colega foi estabelecida corretamente.](image_12.png)

---

## Parte 2: Preparando o Ambiente e o Wireshark

Com nossa rede virtual funcionando, o próximo passo foi preparar as ferramentas para a análise.

### Instalação do Wireshark na Minha VM Windows

*   Eu ainda não tinha o Wireshark na minha máquina virtual, então fui ao site `wireshark.org` para baixá-lo.
*   Durante a instalação, prestei atenção para garantir que a opção **Npcap** estivesse marcada. Este é um passo crucial, pois o Npcap é o driver que permite ao Wireshark capturar o tráfego de rede em tempo real.

    ![Tela do instalador do Wireshark destacando a opção de instalação do Npcap.](image.png)

---

## Parte 3: Captura e Análise dos Dados ICMP

### Passo 1: Identificando os Endereços de Rede

Para este laboratório, os endereços IP que importam são os que o Hamachi nos forneceu. O endereço MAC, por outro lado, eu peguei de dentro da minha VM.

1.  **IP do Meu Colega:** `25.42.154.187`
2.  **Meu Endereço MAC e IP:** A imagem abaixo mostra o meu endereço MAC e o meu IP na rede Hamachi.

![Meu endereço MAC e IP.](image_13.png)

### Passo 2: Iniciando a Captura de Dados com o Wireshark

*   Com tudo pronto, iniciei o Wireshark na minha VM e comecei a capturar o tráfego da interface de rede do Hamachi.
*   Em seguida, abri o prompt de comando e disparei um `ping` para o IP do meu colega para gerar tráfego ICMP.

![Executando o comando ping para o IP do colega: 25.42.154.187](image_14.png)

*   Após alguns pacotes trocados, parei a captura no Wireshark. Para limpar a visualização e focar apenas no que interessava, digitei `icmp` no campo de filtro.

![Parando a captura e aplicando o filtro ICMP.](image_16.png)

### Passo 3: Examinando os Dados Capturados

Com os pacotes filtrados, comecei a análise. A lista mostrava claramente os pacotes de `Echo (ping) request` que enviei e os `Echo (ping) reply` que recebi.

![Lista de pacotes ICMP capturados.](image_18.png)

Ao selecionar um dos pacotes de **request**, pude inspecionar os detalhes de cada camada:
*   **Camada 2 (Ethernet II):** Mostrava os endereços MAC de origem (meu) e de destino (do meu colega).
*   **Camada 3 (IPv4):** Exibia os IPs de origem e destino.
*   **Camada de Transporte (ICMP):** O mais interessante aqui era o `Type: 8`, que identifica a mensagem como um "echo request".

![Detalhes de um pacote ICMP de "request".](image_19.png)

Em seguida, fiz o mesmo para um pacote de **reply**:
*   As camadas de enlace e rede mostravam os endereços MAC e IP invertidos, como esperado.
*   No ICMP, o `Type` agora era `0`, confirmando que se tratava de uma resposta de "echo reply".

![Detalhes de um pacote ICMP de "reply".](image_17.png)