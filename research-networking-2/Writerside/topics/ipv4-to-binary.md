# Conversão de Endereço IPv4 para Binário

Um endereço IPv4 (Internet Protocol version 4) é um número de 32 bits usado para identificar um dispositivo em uma rede. Para facilitar a leitura e a memorização por humanos, ele é geralmente representado em formato decimal, dividido em quatro octetos (grupos de 8 bits) separados por pontos, como em `20.171.49.31`.

No entanto, para os computadores e dispositivos de rede, esse endereço é apenas uma longa sequência de 32 bits (zeros e uns). A conversão do formato decimal para o binário é um processo fundamental para entender o funcionamento das redes.

## Endereço a ser Convertido

**Endereço IPv4 Decimal:** `20.171.49.31`

## Processo de Conversão

Para converter o endereço, convertemos cada um dos quatro octetos (os números separados por pontos) para seu equivalente binário de 8 bits.

### 1. Conversão do primeiro octeto: 20

Para converter 20 para binário, usamos divisões sucessivas por 2:

*   20 ÷ 2 = 10, resto **0**
*   10 ÷ 2 = 5, resto **0**
*   5 ÷ 2 = 2, resto **1**
*   2 ÷ 2 = 1, resto **0**
*   1 ÷ 2 = 0, resto **1**

Lendo os restos de baixo para cima, temos `10100`. Como cada octeto deve ter 8 bits, adicionamos zeros à esquerda até completar o tamanho: `00010100`.

**Decimal 20 = Binário `00010100`**

### 2. Conversão do segundo octeto: 171

*   171 ÷ 2 = 85, resto **1**
*   85 ÷ 2 = 42, resto **1**
*   42 ÷ 2 = 21, resto **0**
*   21 ÷ 2 = 10, resto **1**
*   10 ÷ 2 = 5, resto **0**
*   5 ÷ 2 = 2, resto **1**
*   2 ÷ 2 = 1, resto **0**
*   1 ÷ 2 = 0, resto **1**

Lendo de baixo para cima, temos `10101011`. Este número já tem 8 bits.

**Decimal 171 = Binário `10101011`**

### 3. Conversão do terceiro octeto: 49

*   49 ÷ 2 = 24, resto **1**
*   24 ÷ 2 = 12, resto **0**
*   12 ÷ 2 = 6, resto **0**
*   6 ÷ 2 = 3, resto **0**
*   3 ÷ 2 = 1, resto **1**
*   1 ÷ 2 = 0, resto **1**

Lendo de baixo para cima, temos `110001`. Completando com zeros à esquerda: `00110001`.

**Decimal 49 = Binário `00110001`**

### 4. Conversão do quarto octeto: 31

*   31 ÷ 2 = 15, resto **1**
*   15 ÷ 2 = 7, resto **1**
*   7 ÷ 2 = 3, resto **1**
*   3 ÷ 2 = 1, resto **1**
*   1 ÷ 2 = 0, resto **1**

Lendo de baixo para cima, temos `11111`. Completando com zeros à esquerda: `00011111`.

**Decimal 31 = Binário `00011111`**

## Resultado Final

Juntando os quatro octetos em sua forma binária, obtemos o endereço IPv4 completo de 32 bits:

**`00010100.10101011.00110001.00011111`**