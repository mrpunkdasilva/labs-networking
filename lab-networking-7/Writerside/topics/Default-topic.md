# Laboratório da Semana 7

### Topologia da Rede

A topologia para este laboratório consistiu em uma rede local simples, na qual minha máquina virtual (VM) estabeleceu comunicação com a VM de outro participante.

![Topologia de rede do laboratório](https://lms.jala.university/courses/351/files/66489/preview)

---

## Parte 1: Preparação dos Ambientes

Para este cenário, a preparação foi dividida entre as duas máquinas virtuais.

### Na VM Windows (Remetente): Instalação do Wireshark

1.  **Download:** Utilizando um navegador na VM Windows, acessei o site oficial do Wireshark em `wireshark.org` e realizei o download do instalador para Windows (64-bit).

2.  **Instalação:** Executei o arquivo `.exe` baixado. Durante o processo de instalação (next, next e next até chegar na tela abaixo), foi crucial garantir que o componente **Npcap** estivesse selecionado, pois é o driver que permite a captura de pacotes no Windows. Segui os passos do instalador, mantendo as opções padrão, até a conclusão.

    > **Nota de Segurança: Permissões de Captura**
    > A instalação de ferramentas como o Wireshark, que exigem acesso direto à interface de rede para captura de pacotes, ressalta a importância da gestão de privilégios. Em sistemas operacionais, a capacidade de interceptar tráfego de rede é uma funcionalidade sensível do ponto de vista da segurança, podendo ser utilizada para monitoramento ou detecção de vulnerabilidades.


![image.png](image.png)


### Na VM Ubuntu (Destino)

Para a máquina que apenas receberá o tráfego, nenhuma instalação de software foi necessária para este laboratório.

> ![Imagem da tela do Ubuntu de login](image_2.png)

---

## Parte 2: Execução e Análise

Com os ambientes preparados, procedi com a execução do experimento, que envolve ações em ambas as VMs.

### Passo 1: Identificação dos Endereços de Rede

Foi necessário identificar os endereços IP de ambas as máquinas para estabelecer a comunicação.

**Na VM Ubuntu (Destino):**
1.  Abri um terminal.
2.  Executei o comando `ip a` para listar as interfaces de rede.
3.  Na saída, localizei a interface de rede principal (ex: `enp0s3`) e anotei o endereço `inet`, que é o endereço IP da VM Ubuntu. Este endereço foi usado como destino do `ping`.

![image_3.png](image_3.png)

**Na VM Windows (Remetente):**
1.  Abri o **Prompt de Comando** (`cmd`).
2.  Executei o comando `ipconfig /all`.
3.  Na saída, localizei o "Adaptador Ethernet" e anotei o "Endereço IPv4" e o "Endereço Físico (MAC)", que são o IP e o MAC de origem, respectivamente.

![image_4.png](image_4.png)


### Passo 2: Captura e Análise (Executado na VM Windows)

Todo o processo de captura e análise foi centralizado na VM Windows.

> **Nota de Segurança: Implicações do Protocolo ARP**
> O protocolo ARP, fundamental para a resolução de endereços MAC a partir de IPs em redes locais, também é um vetor para ataques. Técnicas como 'ARP Spoofing' ou 'ARP Poisoning' exploram a natureza sem autenticação do ARP para falsificar endereços MAC, desviando o tráfego de rede para um atacante. A compreensão do funcionamento do ARP é, portanto, crucial para a detecção e mitigação de tais ameaças em ambientes de rede.

1.  Iniciei o **Wireshark** na VM Windows.
2.  Selecionei a interface de rede ativa (geralmente "Ethernet") e comecei a captura.

![image_5.png](image_5.png)


3.  Apliquei o filtro de exibição `icmp` para isolar o tráfego de interesse.

![image_6.png](image_6.png)

4.  No Prompt de Comando do Windows, executei o comando `ping` utilizando o endereço IP da VM Ubuntu que anotei anteriormente.

    ```shell
    ping ENDERECO_IP_DA_VM_UBUNTU
    ```
    
![image_7.png](image_7.png)

5.  Observei os pacotes `Echo (ping) request` e `Echo (ping) reply` surgirem no Wireshark, confirmando a comunicação. Após a conclusão, interrompi a captura.

![image_8.png](image_8.png)


6.  Para a análise, selecionei um pacote `Echo (ping) request` e, no painel de detalhes, expandi as camadas **`Ethernet II`** (para ver os endereços MAC) e **`Internet Protocol Version 4`** (para confirmar os endereços IP), demonstrando o encapsulamento.

![image_9.png](image_9.png)

A análise detalhada do pacote `12775` (um `Echo (ping) reply`) revelou os seguintes endereços nas respectivas camadas:

| Componente | Endereço Extraído da Imagem |
| :--- | :--- |
| **Endereço MAC de Origem** | `08:00:27:f1:73:8b` |
| **Endereço MAC de Destino** | `08:00:27:67:3f:c0` |
| **Endereço IP de Origem** | `192.168.1.16` |
| **Endereço IP de Destino** | `192.168.1.17` |

Esta tabela resume os endereços de Camada 2 (MAC) e Camada 3 (IP) que foram identificados no pacote capturado, cumprindo o objetivo principal da análise do laboratório.

> **Nota de Segurança: Implicações do Protocolo ICMP**
> Embora o ICMP seja essencial para diagnósticos de rede, ele também possui implicações de segurança. O comando `ping` pode ser utilizado para reconhecimento de rede (identificar hosts ativos), ataques de negação de serviço (DoS) através de inundações de ping, ou até mesmo para tunelamento de dados (ICMP Tunneling) em cenários mais avançados. A análise de pacotes ICMP no Wireshark permite identificar padrões que podem indicar tais atividades maliciosas, reforçando a necessidade de políticas de firewall adequadas para controlar o tráfego ICMP.
> 
