# Atividade 1.2 - Conectividade e SSH

## Objetivo

* Comprovar a conectividade no nível IP com outro dispositivo TCP/IP e testar o protocolo SSH.

## A. TESTES NECESSÁRIOS PARA O LABORATÓRIO

### 1. Verificar o status da conexão entre VM1 e VM2 usando o comando ping.

Para verificar a conectividade entre a VM1 (Windows 10) e a VM2 (Ubuntu), utilizei o comando `ping`.

**Passo a passo:**

1. Na VM1 (Windows 10), abri o Prompt de Comando ou PowerShell.
2. Na VM2 (Ubuntu), abri o Terminal.
3. Em cada VM, obtive o endereço IP da outra VM.
* No Windows 10 (VM1), utilizei `ipconfig`.

![Resultado do comando ipconfig no Prompt de Comando do Windows, mostrando o endereço IPv4, máscara de sub-rede e gateway padrão.](ipconfig_windows.png)

* No Ubuntu (VM2), utilizei `ip a` ou `ifconfig`.
   
![Resultado do comando 'ip a' no terminal do Ubuntu, exibindo os detalhes das interfaces de rede e seus endereços IP.](ip_a.png)

4. Executei o comando `ping` de uma VM para a outra.

* Da VM1 (Windows 10) para a VM2 (Ubuntu):
  ```bash
  ping <IP_DA_VM2>
  ```
  
![Resultado do comando ping do Windows para um IP de uma máquina Linux, mostrando o recebimento de respostas.](ping_linux.png)


* Da VM2 (Ubuntu) para a VM1 (Windows 10):
  ```bash
  ping <IP_DA_VM1>
  ```
  
![Resultado do comando ping do Ubuntu para um IP de uma máquina Windows, mostrando o recebimento de respostas.](ping_windows.png)

5. Observei os resultados para confirmar a troca de pacotes e a ausência de perdas.

### 2. Fazer ping nos seguintes sites: Gmail.com, www.facebook.com das 2 VMs.

Para testar a conectividade externa de ambas as VMs, realizei pings para sites conhecidos.

**Passo a passo:**

1. Na VM1 (Windows 10), abri o Prompt de Comando ou PowerShell.
2. Na VM2 (Ubuntu), abri o Terminal.
3. Em cada VM, executei os comandos `ping` para os sites especificados.

* Na VM1 (Windows 10):
```bash
ping gmail.com
ping www.facebook.com
```

![Resultado do comando 'ping gmail.com' no Windows, mostrando conectividade com o site.](ping_gmail_windows.png)

![Resultado do comando 'ping www.facebook.com' no Windows, mostrando conectividade com o site.](ping_facebook_windows.png)


* Na VM2 (Ubuntu):
```bash
ping gmail.com
ping www.facebook.com
```

![Resultado do comando 'ping gmail.com' no Ubuntu, mostrando conectividade com o site.](ping_gmail.png)

![Resultado do comando 'ping www.facebook.com' no Ubuntu, mostrando conectividade com o site.](ping_facebook.png)

4. Observei os resultados para verificar a resolução de nomes (DNS) e a conectividade com a internet.

### 3. Explicar as informações retornadas após o ping.

Após executar o comando `ping`, observei as seguintes informações:

* **`Reply from <IP_ADDRESS>` ou `64 bytes from <IP_ADDRESS>`:** Indica que uma resposta foi recebida do endereço IP de
  destino.
* **`bytes=<NUMBER>`:** O tamanho do pacote de dados enviado e recebido (geralmente 32 ou 64 bytes).
* **`time=<TIME>ms`:** O tempo, em milissegundos, que levou para o pacote ir e voltar (latência). Tempos menores indicam
  uma conexão mais rápida.
* **`TTL=<NUMBER>` (Time To Live):** O número de "saltos" (hops) que o pacote pode dar antes de ser descartado. Diminui
  a cada roteador que o pacote passa.
* **`Packets: Sent = <NUMBER>, Received = <NUMBER>, Lost = <NUMBER>`:** Um resumo da sessão de ping, mostrando quantos
  pacotes foram enviados, recebidos e perdidos. Perda de pacotes indica problemas na rede.
* **`Approximate round trip times in milli-seconds:`:** Um resumo dos tempos mínimo, máximo e médio de ida e volta.

### 4. Executar o comando IPCONFIG e descrever as informações que ele retorna.

Executei o comando `ipconfig` no Windows 10 (VM1) para obter informações sobre a configuração de rede.

**Passo a passo:**

1. Na VM1 (Windows 10), abri o Prompt de Comando ou PowerShell.
2. Executei o comando:
   ```bash
   ipconfig
   ```
   
![Resultado do comando ipconfig no Prompt de Comando do Windows, mostrando o endereço IPv4, máscara de sub-rede e gateway padrão.](ipconfig_windows.png)


3. Observei as seguintes informações retornadas:
    * **Endereço IPv4:** O endereço IP atribuído à interface de rede.
    * **Máscara de Sub-rede:** A máscara de sub-rede utilizada.
    * **Gateway Padrão:** O endereço IP do roteador (gateway) que a VM utiliza para acessar outras redes.
    * **Servidores DNS:** Os endereços IP dos servidores DNS configurados.

### 5. Executar o comando HOSTNAME para descrever as informações que ele retorna.

Executei o comando `hostname` no Ubuntu (VM2) para obter o nome do host da máquina.

**Passo a passo:**

1. Na VM2 (Ubuntu), abri o Terminal.
2. Executei o comando:
   ```bash
   hostname
   ```

![Resultado do comando 'hostname' no terminal do Ubuntu, exibindo o nome do host da máquina.](hostname.png)

3. Observei que o comando retornou o nome configurado para a máquina, que é o identificador da VM na rede.

### 6. Executar o comando GETMAC e descrever as informações que ele retorna.

Executei o comando `getmac` no Windows 10 (VM1) para obter o endereço MAC (Media Access Control) das interfaces de rede.

**Passo a passo:**

1. Na VM1 (Windows 10), abri o Prompt de Comando ou PowerShell.
2. Executei o comando:
   ```bash
   getmac
   ```

![Resultado do comando 'getmac' no Windows, listando os endereços MAC das interfaces de rede.](getmac_windows.png)


3. Observei que o comando retornou o endereço físico (MAC) de cada adaptador de rede presente na VM, que é um
   identificador único de hardware.

### 7. Executar o comando NETSTAT e descrever as informações que ele retorna.

> **Nota:** Em algumas versões mais recentes do Ubuntu, o comando `netstat` pode não estar instalado por padrão. Se você
receber um erro de "comando não encontrado", pode instalá-lo com o seguinte comando:
> ```bash
> sudo apt install net-tools
> ```
> ![Execução do comando 'sudo apt install net-tools' no terminal do Ubuntu para instalar o netstat.](intall_netstat.png)

Após instalar o `netstat` (devido ao erro de 'comando não encontrado'), executei-o no Ubuntu (VM2) para exibir as
conexões de rede ativas, tabelas de roteamento e estatísticas de interface.

**Passo a passo:**

1. Na VM2 (Ubuntu), abri o Terminal.
2. Executei o comando:
   ```bash
   netstat
   ```

![Resultado do comando 'netstat' no Ubuntu, mostrando as conexões de rede ativas.](netstat.png)


3. Observei que o comando retornou uma lista de conexões ativas (TCP, UDP), mostrando o endereço local, o endereço
   estrangeiro e o estado da conexão.

### 8. Executar o comando NETSTAT -an e descrever as informações que ele retorna.

Executei o comando `netstat -an` no Ubuntu (VM2) para obter uma visão mais detalhada das conexões de rede, incluindo
portas numéricas.

**Passo a passo:**

1. Na VM2 (Ubuntu), abri o Terminal.
2. Executei o comando:
   ```bash
   netstat -an
   ```

![Resultado do comando 'netstat -an' no Ubuntu, exibindo todas as conexões e portas em formato numérico.](netstat -an.png)


3. Observei que a opção `-a` mostrou todas as conexões e portas de escuta, e a opção `-n` exibiu endereços e números de
   porta em formato numérico, sem tentar resolver nomes de host ou nomes de serviço. Isso me deu uma visão clara de
   todas as portas abertas e conexões estabelecidas.

### 9. Executar o comando TRACEROUTE e descrever as informações que ele retorna (Linux).

> **Nota:** Em algumas versões mais recentes do Ubuntu, o comando `traceroute` pode não estar instalado por padrão. Se
você receber um erro de "comando não encontrado", pode instalá-lo com o seguinte comando:
> ```bash
> sudo apt install traceroute
> ```
> ![Execução do comando 'sudo apt install traceroute' no terminal do Ubuntu.](install_traceroute.png)


Após instalar o `traceroute` (devido ao erro de 'comando não encontrado'), executei-o no Ubuntu (VM2) para rastrear a
rota que os pacotes percorrem até um destino.

**Passo a passo:**

1. Na VM2 (Ubuntu), abri o Terminal.
2. Executei o comando para um destino externo (por exemplo, `google.com`):
   ```bash
   traceroute google.com
   ```

![Resultado do comando 'traceroute google.com' no Ubuntu, mostrando a rota de pacotes até o destino.](traceroute_google.png)


3. Observei que o comando listou todos os roteadores (hops) pelos quais os pacotes passaram até chegar ao destino,
   juntamente com o tempo de resposta para cada hop. Isso me ajudou a identificar possíveis gargalos ou problemas de
   rota na rede.

### 10. Executar o comando ROUTE e descrever as informações que ele retorna (Linux).

Executei o comando `route` no Ubuntu (VM2) para exibir e manipular a tabela de roteamento IP.

**Passo a passo:**

1. Na VM2 (Ubuntu), abri o Terminal.
2. Executei o comando:
   ```bash
   route -n
   ```
   
![Resultado do comando 'route -n' no Ubuntu, exibindo a tabela de roteamento IP.](route_-n.png)


3. Observei que o comando retornou a tabela de roteamento, mostrando as rotas conhecidas pelo sistema, incluindo o
   destino, gateway, máscara de sub-rede, interface e métrica. A opção `-n` exibiu os endereços numericamente.

### 11. Executar o comando ip addr ls e descrever as informações que ele retorna (Linux).

Executei o comando `ip addr ls` no Ubuntu (VM2) para exibir informações detalhadas sobre os endereços IP e interfaces de
rede.

**Passo a passo:**

1. Na VM2 (Ubuntu), abri o Terminal.
2. Executei o comando:
   ```bash
   ip addr ls
   ```

![Resultado do comando 'ip addr ls' no Ubuntu, com detalhes sobre as interfaces de rede.](ip_addr_ls.png)




3. Observei que o comando retornou informações sobre todas as interfaces de rede, incluindo seus endereços IP (IPv4 e
   IPv6), máscaras de sub-rede, estado (UP/DOWN) e endereços MAC. É uma ferramenta mais moderna e abrangente que
   `ifconfig`.

### 12. Executar o comando ifconfig e descrever as informações que ele retorna (Linux).

Executei o comando `ifconfig` no Ubuntu (VM2) para exibir e configurar interfaces de rede.

**Passo a passo:**

1. Na VM2 (Ubuntu), abri o Terminal.
2. Executei o comando:
   ```bash
   ifconfig
   ```

![Resultado do comando 'ifconfig' no Ubuntu, mostrando a configuração das interfaces de rede.](ifconfig.png)


3. Observei que o comando retornou informações sobre as interfaces de rede ativas, incluindo o endereço IP, máscara de
   sub-rede, endereço MAC, estatísticas de pacotes (enviados/recebidos) e erros. Embora ainda seja usado, `ip addr ls` é
   a ferramenta preferida em sistemas Linux modernos.

## Usando Termux do seu celular

### 1. Executar o comando ping entre as VMs e o celular usando Termux.

Para verificar a conectividade entre as VMs e o celular via Termux, utilizei o comando `ping`.

**Passo a passo:**

1. No meu celular, abri o aplicativo Termux.
2. Obtive o endereço IP do meu celular no Termux.
   ```bash
   ifconfig
   ```
   > **Nota:** Notei que o comando `ip a` não funcionou corretamente no Termux por falta de acesso root. Por isso, utilizei o `ifconfig`. O comando já estava disponível no meu Termux, mas caso não estivesse, a instalação seria feita com `pkg install net-tools`.

![Resultado do comando 'ifconfig' no Termux, exibindo o endereço IP do celular.](ifconfig_termux.jpeg)



3. Obtive os endereços IP da VM1 (Windows 10) e VM2 (Ubuntu).

* No Windows 10 (VM1), utilizei `ipconfig`.

![Resultado do comando ipconfig no Prompt de Comando do Windows, mostrando o endereço IPv4, máscara de sub-rede e gateway padrão.](ipconfig_windows.png)

* No Ubuntu (VM2), utilizei `ip a` ou `ifconfig`.

![Resultado do comando 'ip a' no terminal do Ubuntu, exibindo os detalhes das interfaces de rede e seus endereços IP.](ip_a.png)


4. Executei o comando `ping` do Termux para as VMs.
* Do Termux para a VM1 (Windows 10):
```bash
ping <IP_DA_VM1>
```
      
![Resultado do comando ping do Termux para a VM com Windows.](ping_windows_termux.jpeg)


* Do Termux para a VM2 (Ubuntu):
```bash
ping <IP_DA_VM2>
```

![Resultado do comando ping do Termux para a VM com Ubuntu.](ping_ubuntu_termux.jpeg)



5. Executei o comando `ping` das VMs para o Termux.
* Da VM1 (Windows 10) para o Termux:
```bash
ping <IP_DO_CELULAR_TERMUX>
```
      
![Resultado do comando ping da VM Windows para o celular com Termux.](vm_windows_to_termux.png)


* Da VM2 (Ubuntu) para o Termux:
```bash
ping <IP_DO_CELULAR_TERMUX>
```

![Resultado do comando ping da VM Ubuntu para o celular com Termux.](vm_linux_to_termux.png)


6. Observei os resultados para confirmar a conectividade.


### 2. Executar o comando ls e descrever as informações que ele retorna.

Executei o comando `ls` no Termux para listar o conteúdo do diretório atual.

**Passo a passo:**

1. No meu celular, abri o aplicativo Termux.
2. Executei o comando:
   ```bash
   ls
   ```
3. O comando não retornou nenhuma saída, indicando que o diretório inicial estava vazio.
4. Para testar, criei um arquivo chamado `exemplo.txt` e um diretório chamado `pasta_exemplo`:
   ```bash
   touch exemplo.txt
   mkdir pasta_exemplo
   ```
5. Ao executar `ls` novamente, a saída foi a seguinte:
   ```
   exemplo.txt  pasta_exemplo
   ```

![Sequência de comandos no Termux: 'ls' em um diretório vazio, 'touch' e 'mkdir' para criar arquivo e pasta, e 'ls -l' para listar o conteúdo com detalhes.](ls_touch_mkdir_ls-l.jpeg)

6. Isso confirmou que o comando `ls` lista o conteúdo do diretório. Observei também que, usando `ls -l`, mais detalhes são exibidos, como permissões, proprietário, tamanho e data de modificação.
