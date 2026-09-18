# Projeto: Chat offline

Projeto de uma janela única de chat em que eu consigo enviar mensagens como usúario e como robô (atravez de um toggle no input de mensagem)

## Aspectos Tecnicos

Projeto feito em Vite + React + Typescript + TailWind
Todos os types salvos na pasta src/types (usando type e não interface)
Todos os componentes salvos na pasta src/components
O Historico do chat deve estar em um state sem persistencia

## Aspectos Visuais

A tela vai ter um fundo marrom claro

Todo o chat (incluindo historico de mensagens e input) terão uma largura maxima (2xl), centralizado, em tela maior.

o input será um card com fundo branco e altura ajustada conforme a mensagem.

o card ficará no cano inferior o tempo inteiro.

Dentro do card do input, do lado direito:

- Botão de enviar, que fica desabilitado quando não possuir mensagem digitada.

Dentro do card do input, do lado esquerdo:

- Um Botão que servirá como toggle para marcar se a mensagem enviada será via usúario (e fica do lado direito do historico)
  ou robô (que fica do lado esquerdo do histórico) - quando o toggle ativado (robô) o card do input terá uma borda roxa, indicando visualmente que a mensagem enviada será
  enviada como robô e não usúario.
