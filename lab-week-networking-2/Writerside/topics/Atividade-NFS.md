# Atividade #2.1: Configurando um NFS Share

## Objetivo

Meu objetivo nesta atividade foi configurar um compartilhamento de arquivos em rede utilizando o Network File System (NFS). Com o NFS, eu esperava poder acessar e manipular arquivos em um computador remoto (minha VM2) como se estivessem na minha própria máquina local (minha VM1), facilitando o gerenciamento centralizado de dados.

---

## Descrição da Atividade: Minha Jornada de Configuração e Depuração

Segui os passos para configurar um servidor NFS na minha **VM2 (Ubuntu Desktop)** e um cliente NFS na minha **VM1 (Windows 10)**. Enfrentei alguns desafios, mas consegui depurar e resolver os problemas.

### A. Configurando o NFS Server (VM2)

Primeiro, instalei e configurei o servidor NFS na minha segunda máquina virtual (**VM2 - Ubuntu**).

**1. Instalei o pacote do servidor NFS:**

Para começar, precisei instalar o software do servidor NFS na minha VM2. Executei o comando abaixo no terminal da **VM2** para instalar os pacotes necessários:

```bash
sudo apt update && sudo apt install nfs-kernel-server -y
```

*   `sudo apt update`: Atualiza a lista de pacotes disponíveis nos repositórios.
*   `sudo apt install nfs-kernel-server -y`: Instala o pacote `nfs-kernel-server`, que é o servidor NFS. O `-y` aceita automaticamente as perguntas de confirmação.

**1.1. Configurei o Firewall (VM2): A Grande Batalha Contra o Erro 53**

Esta foi a parte mais desafiadora da configuração. Inicialmente, ao tentar montar o compartilhamento no Windows, eu recebia o temido "Erro 53: Caminho de rede não encontrado". Minha investigação me levou ao firewall.

**Minha Investigação:**

1.  **Verificação Inicial do Serviço NFS:** Primeiro, confirmei se o serviço NFS estava rodando na VM2 com `sudo systemctl status nfs-kernel-server`. Ele estava ativo, então o problema não era o serviço em si.
2.  **Suspeita do Firewall:** Minha próxima suspeita foi o firewall (UFW). Verifiquei o status com `sudo ufw status`.
3.  **Análise dos Logs:** Para entender o que estava sendo bloqueado, tentei montar o compartilhamento no Windows e, imediatamente depois, verifiquei os logs do sistema na VM2 com `tail -n 50 /var/log/syslog`. Foi aí que encontrei as mensagens `[UFW BLOCK]` indicando que o tráfego da minha VM1 (`192.168.1.33`) para a VM2 (`192.168.1.23`) estava sendo bloqueado nas portas 111 (TCP e UDP) e 2049 (UDP).

**Minhas Ações para Liberar o Firewall:**

Para permitir que o NFS se comunicasse através da rede, precisei configurar o firewall da VM2 para liberar as portas apropriadas.

*   **Verifiquei o status do firewall:**

```c#
sudo ufw status
```


*   **Adicionei a regra geral para NFS:**
    Como o firewall estava ativo e bloqueando as portas NFS, adicionei uma regra para permitir o tráfego NFS.

```sh
sudo ufw allow nfs
```

![Saída do comando 'sudo ufw status' mostrando as regras de firewall após permitir o tráfego NFS.](Screenshot from 2025-09-10 17-01-29.png)

*   **Liberei a porta do `rpcbind` (Portmapper):**
    Descobri que o NFS depende do serviço `rpcbind` (também conhecido como portmapper), que usa a porta 111. O `syslog` mostrou que essa porta estava sendo bloqueada tanto para TCP quanto para UDP. Então, liberei ambas:

```sh
sudo ufw allow 111/tcp
sudo ufw allow 111/udp
```

![Saída do comando 'sudo ufw status' mostrando as regras de firewall após permitir o tráfego na porta 111 (rpcbind).](Screenshot from 2025-09-10 18-29-42.png)

*   **Liberei a porta principal do NFS:**
    A porta principal do NFS é a 2049. Embora `ufw allow nfs` devesse cobrir isso, o log indicou que o UDP ainda estava sendo bloqueado. Então, liberei explicitamente para TCP e UDP:

```sh
sudo ufw allow 2049/tcp
sudo ufw allow 2049/udp
```



*   **Verifiquei novamente o status para confirmar que as regras foram adicionadas:**

```sh
sudo ufw status
```
Após essas liberações, o firewall parou de ser um problema.

### B. Criei e Preparei o Diretório de Compartilhamento (VM2)

Em seguida, criei a pasta que seria compartilhada pela rede.

**2. Criei o diretório compartilhado:**

Este diretório conteria os arquivos que a VM1 poderia acessar. Executei o comando para criar a pasta:

```bash
sudo mkdir -p /srv/nfs/shared_directory
```

![Comando 'sudo mkdir -p /srv/nfs/shared_directory' sendo executado no terminal para criar o diretório compartilhado.](%22sudo%20mkdir%20-p%20%20srv%20nfs%20shared_directory%22.png)

*   `sudo mkdir -p`: Cria o diretório `/srv/nfs/shared_directory`. O `-p` garante que os diretórios pai (`/srv` e `/srv/nfs`) sejam criados se não existirem.

**3. Atribuí as permissões corretas:**

Foi crucial ajustar as permissões do diretório para que ele pudesse ser acessado pela rede de forma segura e anônima, como o Windows esperava.

```bash
sudo chown nobody:nogroup /srv/nfs/shared_directory
sudo chmod 777 /srv/nfs/shared_directory
```
![Comandos 'sudo chown nobody:nogroup' e 'sudo chmod 777' sendo executados para atribuir as permissões corretas ao diretório compartilhado.](3.%20Atribua%20as%20permiss%C3%B5es%20corretas:.png)

*   `sudo chown nobody:nogroup`: Altera o proprietário do diretório para `nobody` e o grupo para `nogroup`. Isso é importante para montagens anônimas, onde o cliente NFS se conecta como um usuário sem privilégios.
*   `sudo chmod 777`: Concede permissões totais (leitura, escrita e execução) para o proprietário, grupo e outros. Isso garante que o Windows possa ler e escrever no diretório.

> Fiz o SSH para me conectar do meu host (fedora) para a VM2 (ubuntu).
> ![Terminal mostrando a conexão SSH do host Fedora para a VM2 Ubuntu.](Screenshot from 2025-09-09 17-20-22.png)

**4. Configurei o arquivo de "exportações" do NFS: O Erro do IP**

Este foi outro ponto crítico. O arquivo `/etc/exports` define quais diretórios serão compartilhados e para quem.

**Minha Investigação:**

1.  **Erro 53 Persistente:** Mesmo com o firewall ajustado, o erro 53 persistia.
2.  **Verificação do `/etc/exports`:** Suspeitei que o problema poderia estar na configuração de exportação. Verifiquei o conteúdo do arquivo com `cat /etc/exports`.
3.  **Descoberta do IP Incorreto:** Percebi que o IP da minha VM1 (Windows) estava incorreto no arquivo `/etc/exports`. Eu havia colocado `192.168.1.31`, mas o IP real da minha VM1 era `192.168.1.33`. O servidor NFS só permitia acesso do IP especificado, causando o erro.

**Minhas Ações para Corrigir o `/etc/exports`:**

Abri o arquivo `/etc/exports` para edição:

```bash
sudo vi /etc/exports
```

Adicionei a seguinte linha no final do arquivo (substituindo `IP_DA_VM1` pelo endereço IP real da minha VM1, que no meu caso era `192.168.1.33`):

```
/srv/nfs/shared_directory 192.168.1.33(rw,sync,no_subtree_check)
```

![Conteúdo do arquivo '/etc/exports' mostrando a linha de configuração para o compartilhamento NFS, incluindo o IP do cliente e as opções de exportação.](Screenshot from 2025-09-10 17-32-50.png)

*   `/srv/nfs/shared_directory`: O caminho absoluto do diretório a ser compartilhado na VM2.
*   `192.168.1.33`: O endereço IP da VM1 (cliente) que terá permissão para acessar o compartilhamento.
*   `(rw,sync,no_subtree_check)`: Opções de exportação:
    *   `rw`: Permite acesso de leitura e escrita.
    *   `sync`: Garante que as alterações sejam gravadas no disco antes que a operação seja confirmada.
    *   `no_subtree_check`: Desabilita a verificação de subárvore, o que pode melhorar o desempenho e evitar problemas com clientes NFS mais antigos.

**5. Exporte o diretório compartilhado:**

Após salvar as alterações no `/etc/exports`, precisei aplicar as configurações e reiniciar o serviço NFS para que as mudanças tivessem efeito.

```bash
sudo exportfs -a
sudo systemctl restart nfs-kernel-server
```

*   `sudo exportfs -a`: Exporta todos os diretórios listados em `/etc/exports`.
* ![Comando 'sudo exportfs -a' sendo executado para aplicar as configurações de compartilhamento do arquivo /etc/exports.](Screenshot from 2025-09-09 18-28-19.png)
*   `sudo systemctl restart nfs-kernel-server`: Reinicia o serviço do servidor NFS para que ele leia as novas configurações.


### C. Configurei o NFS Client (VM1 - Windows 10)

Depois de configurar o servidor, fui para a **VM1 (Windows 10)** para configurar o cliente NFS e acessar o diretório remoto.

**6. Habilitei o Cliente para NFS (Apenas Windows Pro/Enterprise):**

O cliente NFS não vem incluído em todas as edições do Windows. Primeiro, verifiquei se o recurso estava disponível e, se estivesse, ativei-o.

1.  Pressionei a tecla `Windows + R`, digitei `optionalfeatures` e teclei Enter.
2.  Na janela "Recursos do Windows" que abriu, rolei a lista e procurei por **"Serviços para NFS"**.
3.  Encontrei, expandi o item e marquei a caixa **"Cliente para NFS"**.
4.  Cliquei em **OK** e aguardei a conclusão da instalação.



**7. Montei o diretório compartilhado:**

Com o cliente NFS ativo, conectei o diretório remoto da VM2 a uma letra de unidade na VM1.

Recomendo usar o **Prompt de Comando (cmd)** ou **PowerShell** para este passo.

**No Prompt de Comando (cmd):**
```shell
mount -o anon IP_DA_VM2:/srv/nfs/shared_directory Z:
```

**Alternativa para PowerShell:**
Se preferir usar o PowerShell, o parâmetro `-o` pode causar um erro. Para evitar isso, usei o operador de parada de análise (`--%`) que força o PowerShell a passar os argumentos corretamente:
```powershell
mount.exe --% -o anon IP_DA_VM2:/srv/nfs/shared_directory Z:
```

*   `mount.exe`: O comando para montar compartilhamentos NFS no Windows.
*   `--%`: Operador de parada de análise do PowerShell, necessário para passar argumentos literais para executáveis externos.
*   `-o anon`: Opção para montar o compartilhamento como um usuário anônimo, correspondendo à configuração `nobody:nogroup` no servidor.
*   `IP_DA_VM2:/srv/nfs/shared_directory`: O caminho do compartilhamento NFS na VM2 (substitua `IP_DA_VM2` pelo IP real da sua VM2, que no meu caso era `192.168.1.23`).
*   `Z:`: A letra da unidade que será atribuída ao compartilhamento no Windows.

![Prompt de Comando do Windows executando o comando 'mount' para mapear o compartilhamento NFS da VM2 para a unidade Z:.](Screenshot from 2025-09-10 18-46-05.png)

> Tive problemas com o erro 53, que foram resolvidos após corrigir o IP no `/etc/exports` e liberar as portas corretas no firewall da VM2. A depuração dos logs do `syslog` foi crucial para identificar os bloqueios do firewall.

### D. Testei o Acesso e a Edição (VM1 - Windows)

Finalmente, verifiquei se tudo estava funcionando como esperado a partir do Windows.

**8. Acessei o compartilhamento e listei os arquivos:**

Abri o **Prompt de Comando** ou **PowerShell** e mudei para a unidade que acabei de mapear.

```powershell
Z:\
dir
```

O diretório estava vazio, como esperado.

![Imagem do terminal listando os diretórios da VM2 a partir da VM1.](Screenshot from 2025-09-10 18-47-33.png)

**9. Criei e verifiquei um arquivo:**

Agora, criei um arquivo de teste para confirmar que a escrita no diretório compartilhado estava funcionando.

```powershell
echo "Teste de escrita a partir da VM1 (Windows)!" > teste.txt
type teste.txt
```

![Prompt de Comando do Windows criando um arquivo 'teste.txt' no diretório compartilhado para verificar a permissão de escrita.](Screenshot from 2025-09-10 18-48-30.png)

Para confirmar que o arquivo foi realmente criado na VM2 (Ubuntu), fui até o terminal da **VM2** e verifiquei o conteúdo do arquivo:

```bash
cat /srv/nfs/shared_directory/teste.txt
```

## Referências

*   [Ubuntu Documentation: NFS Howto](https://ubuntu.com/server/docs/service-nfs)
*   [Microsoft Learn: Network File System (NFS) in Windows Server](https://learn.microsoft.com/en-us/windows-server/storage/nfs/nfs-overview)
