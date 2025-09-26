# Atividade 1.1 - PREPARAÇÃO DE AMBIENTES

## Objetivo
* Neste laboratório, preparei os ambientes que seriam utilizados nos próximos laboratórios.
* Instalei o Termux e executei o comando ping entre meu celular e a VM.
* Ao concluir este laboratório, fui capaz de fazer ping entre as VMs.

## Detalhamento do Passo a Passo (VirtualBox no Fedora)

### 1. Instalação do VirtualBox

Para instalar o VirtualBox no Fedora, utilizei o pacote `.rpm` e o gerenciador de pacotes `dnf`.

### 2. Resolução de Conflitos com KVM (VERR_VMX_IN_VMX_ROOT_MODE)

Se ao tentar iniciar uma máquina virtual eu encontrei o erro `VERR_VMX_IN_VMX_ROOT_MODE`, isso indicou um conflito com o módulo KVM (Kernel-based Virtual Machine) que estava utilizando os recursos de virtualização de hardware. Para resolver, foi necessário descarregar os módulos do KVM.

<details>
<summary>Entendendo o Conflito: KVM vs. VirtualBox</summary>

*   **O que é KVM?** KVM é a tecnologia de virtualização integrada ao kernel do Linux. Assim como o VirtualBox, ele precisa de acesso exclusivo às extensões de virtualização do processador (Intel VT-x ou AMD-V) para funcionar.
*   **Por que o conflito ocorre?** O erro `VERR_VMX_IN_VMX_ROOT_MODE` acontece porque tanto o KVM quanto o VirtualBox querem controlar os mesmos recursos de hardware ao mesmo tempo. É como se dois motoristas tentassem usar o mesmo volante. Apenas um pode ter o controle.
*   **A Solução:** Os comandos `rmmod` (remove module) descarregam temporariamente os módulos do KVM do kernel, liberando as extensões de virtualização para que o VirtualBox possa usá-las.
</details>

Primeiro, verifiquei se os módulos KVM estavam carregados:

```bash
lsmod | grep kvm
```

Se a saída mostrou `kvm_intel`, `kvm` ou `irqbypass`, descarreguei-os na seguinte ordem:

```bash
sudo rmmod kvm_intel
sudo rmmod irqbypass
sudo rmmod kvm
```

Após descarregar os módulos, tentei iniciar minha máquina virtual novamente.

### 3. Criação das Máquinas Virtuais (VMs)
Utilizando o VirtualBox no Fedora, criei duas máquinas virtuais:

**VM1: Windows 10**
*   Configurei as especificações de hardware conforme a necessidade (RAM, CPU, Disco).
*   Instalei o sistema operacional Windows 10.

![Captura de tela da máquina virtual Windows 10 após a instalação.](Screenshot from 2025-09-03 22-56-29.png)

**VM2: Ubuntu**
*   Configurei as especificações de hardware conforme a necessidade (RAM, CPU, Disco).
*   Instalei o sistema operacional Ubuntu.

![Captura de tela do VirtualBox mostrando as máquinas virtuais Windows 10 e Ubuntu criadas.](Screenshot from 2025-09-03 19-53-43.png)

### 2. Configuração de Rede no Modo Ponte (Bridge)
Para ambas as VMs (Windows 10 e Ubuntu), fiz o seguinte:
*   Acessei as configurações da VM no VirtualBox.
*   Fui para a seção "Rede".
*   No "Adaptador 1", selecionei "Placa em modo Bridge".
*   Escolhi a interface de rede do meu Fedora que estava conectada à internet (ex: `enp0s3`, `wlp2s0`). Para identificar a interface correta, usei o comando `ip a` no terminal e procurei por uma interface com um endereço IP e status `UP` (ativa).




![Configuração de rede em modo ponte (Bridge) no VirtualBox para a VM Ubuntu.](img.png)



### 3. Configuração da Interface de Rede no Modo DHCP

**VM1: Windows 10**
*   No Windows 10, verifiquei se a configuração de rede estava como "Obter um endereço IP automaticamente" (DHCP). Geralmente, esta é a configuração padrão.

Para verificar e configurar a rede DHCP no Windows 10, segui estes passos:

#### Via Interface Gráfica

1.  **Abri as Configurações de Rede:** Cliquei com o botão direito do mouse no ícone de rede na barra de tarefas (canto inferior direito) e selecionei "Abrir Configurações de Rede e Internet".

2.  **Acesse as Propriedades do Adaptador:** Na janela de Configurações, cliquei em "Alterar opções de adaptador" (ou "Central de Rede e Compartilhamento" -> "Alterar configurações do adaptador").

![Captura de tela da janela "Conexões de Rede" no Windows 10.](VirtualBox_windpunk_03_09_2025_22_38_53.png)


3.  **Selecionei o Adaptador de Rede:** Cliquei com o botão direito do mouse no adaptador de rede que estava usando (geralmente "Ethernet" ou "Wi-Fi") e selecionei "Propriedades".

![Captura de tela das propriedades do adaptador de rede no Windows 10.](VirtualBox_windpunk_03_09_2025_22_39_39.png)


4.  **Configurei o Protocolo IPv4:** Na janela de Propriedades do adaptador, selecionei "Protocolo IP Versão 4 (TCP/IPv4)" e cliquei em "Propriedades".

![Captura de tela das propriedades do Protocolo IP Versão 4 (TCP/IPv4) no Windows 10.](VirtualBox_windpunk_03_09_2025_22_40_02.png)


5.  **Habilitei o DHCP:** Certifiquei-me de que as opções "Obter um endereço IP automaticamente" e "Obter o endereço do servidor DNS automaticamente" estavam selecionadas. Cliquei em "OK" para fechar as janelas.

![Captura de tela das propriedades do Protocolo IP Versão 4 (TCP/IPv4) com DHCP habilitado no Windows 10.](VirtualBox_windpunk_03_09_2025_22_40_10.png)


<note>

**Verificação:**

Após esses passos, confirmei que o Windows 10 estava configurado para obter um endereço IP via DHCP.

</note>

**VM2: Ubuntu**
*   No Ubuntu, configurei a interface de rede para obter um endereço IP via DHCP.
    *   No Ubuntu, a configuração de rede via DHCP geralmente foi automática. Se necessário, verifiquei ou configurei através das "Configurações de Rede" do sistema ou, via linha de comando, utilizando `netplan`.

Para verificar e configurar a rede DHCP no Ubuntu, segui estes passos:

#### Via Linha de Comando (Netplan)

No Ubuntu, a configuração de rede via DHCP é gerenciada principalmente pelo `netplan` a partir da versão 17.10.


1.  **Encontrei o arquivo de configuração:** Os arquivos de configuração do `netplan` estão em `/etc/netplan/`. No meu caso, utilizei o arquivo `50-cloud-init.yaml`. Eu listei os arquivos com:
    ```bash
    ls /etc/netplan/
    ```
2.  **Verifiquei o arquivo de configuração:** Abri o arquivo `.yaml` (por exemplo, `50-cloud-init.yaml`) com um editor de texto como `nano` ou `vim`.
    ```bash
    sudo nano /etc/netplan/50-cloud-init.yaml
    ```
    Certifiquei-me de que a configuração para minha interface de rede (ex: `enp0s3`) estava definida para DHCP. A linha `dhcp4: true` confirma isso.
    ```yaml
    network:
      version: 2
      renderer: networkd
      ethernets:
        enp0s3:
          dhcp4: true
    ```

3.  **Apliquei as mudanças (se necessário):** Se eu fizesse alguma alteração, aplicaria as configurações com:
    ```bash
    sudo netplan apply
    ```

**Verificação:**

Após a verificação, confirmei que a interface de rede já estava configurada para DHCP via `netplan`, especificamente no arquivo `50-cloud-init.yaml`.

![Captura de tela do arquivo de configuração Netplan (50-cloud-init.yaml) confirmando DHCP.](Screenshot from 2025-09-03 20-46-49.png)



### 4. Configuração do Servidor SSH na VM2 (Ubuntu)

*   No Ubuntu (VM2), instalei e configurei um servidor SSH.
  *   Abri o terminal. 
* Instalei o pacote `openssh-server`:
```bash
sudo apt update
sudo apt install openssh-server
```

![Captura de tela do terminal mostrando a instalação do servidor OpenSSH no Ubuntu.](Screenshot from 2025-09-03 20-27-07.png)

  
* Iniciei o serviço SSH:
```bash
sudo systemctl start ssh
```
  
* Verifiquei o status do serviço:
```bash
sudo systemctl status ssh
```

![Captura de tela do terminal mostrando o status do serviço SSH no Ubuntu.](Screenshot from 2025-09-03 20-30-47.png)

*   Configurei o firewall (UFW) para permitir conexões SSH:

```bash
sudo ufw allow ssh
sudo ufw enable
```

![Captura de tela do terminal mostrando a configuração do firewall UFW para permitir SSH no Ubuntu.](Screenshot from 2025-09-03 20-31-32.png)

### 5. Configuração do Cliente SSH na VM1 (Windows 10)

**VM1: Windows 10**
*   No Windows 10 (VM1), o cliente SSH já veio pré-instalado em versões mais recentes.

Para configurar e testar o cliente SSH no Windows 10, segui estes passos:

1.  **Verifiquei a Instalação do Cliente SSH:**
    *   Abri o PowerShell ou o Prompt de Comando.
    *   Digitei `ssh` e pressionei Enter. Se o comando fosse reconhecido e mostrasse a ajuda do SSH, significava que o cliente estava instalado. Caso contrário, eu precisaria instalá-lo (geralmente via "Recursos Opcionais" nas Configurações do Windows).

![Captura de tela do PowerShell/CMD mostrando a ajuda do comando SSH, confirmando sua instalação.](VirtualBox_windpunk_03_09_2025_22_42_55.png)

2.  **Testei a Conectividade SSH com a VM2 (Ubuntu):**
    *   No PowerShell ou Prompt de Comando, utilizei o comando `ssh` para me conectar à VM2.
    *   O comando que usei foi: `ssh usuario@IP_DA_VM2`
        *   Substituí `usuario` pelo nome de usuário que configurei na VM2 (Ubuntu).
        *   Substituí `IP_DA_VM2` pelo endereço IP da minha máquina virtual Ubuntu.

![Captura de tela do terminal Ubuntu mostrando o endereço IP da VM.](vendo o ip do ubuntu.png)

*   Na primeira conexão, o sistema me perguntou se eu queria aceitar a chave de host da VM2. Digitei `yes` e pressionei Enter.
*   
* Em seguida, me pediu a senha do usuário na VM2. Digitei a senha e pressionei Enter.

![Captura de tela do PowerShell/CMD mostrando a conexão SSH bem-sucedida com a VM Ubuntu.](VirtualBox_windpunk_03_09_2025_22_45_49.png)


<note>

**Verificação:**

Após inserir a senha corretamente, fui conectado ao terminal da VM2 (Ubuntu) via SSH, confirmando que a comunicação entre as VMs estava funcionando.

</note>
