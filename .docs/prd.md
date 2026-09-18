# PRD — Chat Offline

## 1. Visão Geral

Aplicação de janela única de chat onde o usuário pode enviar mensagens como **usuário** ou como **robô**, alternando via toggle no campo de input. O histórico de mensagens é mantido apenas em state (sem persistência). O projeto utiliza **Vite + React + TypeScript + Tailwind CSS v4**.

---

## 2. Requisitos Funcionais

### 2.1 Histórico de Mensagens

| Regra | Detalhe |
|---|---|
| Armazenamento | State React (`useState`), sem persistência (refresh limpa tudo) |
| Ordenação | Cronológica — mensagens mais antigas no topo, mais recentes embaixo |
| Scroll | Auto-scroll para a mensagem mais recente ao enviar |
| Layout — Usuário | Bolha alinhada à **direita** |
| Layout — Robô | Bolha alinhada à **esquerda** |
| Cor das bolhas | Mesma cor (branco), diferenciação apenas pelo lado |
| Metadados | Cada mensagem exibe o **texto** + **horário de envio** (HH:mm) |

### 2.2 Campo de Input (Card inferior)

| Regra | Detalhe |
|---|---|
| Posição | Fixo no fundo da tela, centralizado, largura máxima `2xl` |
| Fundo | Branco, com cantos arredondados |
| Tipo de campo | `<textarea>` multilinha, **cresce automaticamente** conforme o texto |
| Borda padrão | Neutra (cinza claro) |
| Borda modo robô | **Roxa**, indicando visualmente que a próxima mensagem será enviada como robô |

### 2.3 Toggle Usuário / Robô

| Regra | Detalhe |
|---|---|
| Posição | Lado **esquerdo** do card de input |
| Visual | Botão com **ícone + texto** que alterna entre modo usuário e modo robô |
| Estado padrão | Usuário |
| Comportamento | Click alterna o modo; o card de input reflete o estado com a borda roxa (robô ativo) |

### 2.4 Botão de Enviar

| Regra | Detalhe |
|---|---|
| Posição | Lado **direito** do card de input |
| Estado desabilitado | Quando o textarea está vazio (ou contém apenas espaços) |
| Ação | Envia a mensagem com o sender correspondente ao toggle atual e limpa o textarea |

### 2.5 Indicador de "Digitando" (Robô)

| Regra | Detalhe |
|---|---|
| Quando aparece | Ao enviar uma mensagem no modo **robô** |
| Comportamento | Exibe um indicador animado de "digitando" (bolinhas pulsantes) do lado esquerdo, **antes** da mensagem do robô aparecer |
| Delay | Pequeno delay simulado (800ms–1500ms) antes de revelar a mensagem real |
| Ao terminar | O indicador desaparece e a mensagem do robô aparece normalmente no histórico |

---

## 3. Requisitos Visuais

- **Fundo da página**: marrom claro (`bg-amber-50` ou similar)
- **Container do chat** (histórico + input): largura máxima `max-w-2xl`, centralizado horizontalmente
- **Bolhas de mensagem**: fundo branco, cantos arredondados, sombra sutil
- **Card de input**: fundo branco, cantos arredondados, sombra sutil, borda condicional (roxa quando robô ativo)
- **Layout responsivo**: Em telas menores, o chat ocupa toda a largura com padding lateral

---

## 4. Requisitos Técnicos

| Item | Convenção |
|---|---|
| Types | Pasta `src/types/`, usando `type` (não `interface`) |
| Componentes | Pasta `src/components/` |
| State | `useState` no componente principal (sem Context, Redux ou persistência) |
| Estilização | Tailwind CSS v4 |

---

## 5. Estrutura de Arquivos (Proposta)

```
src/
├── types/
│   └── chat.ts              # Message type, Sender type
├── components/
│   ├── ChatHistory.tsx       # Container do histórico de mensagens
│   ├── MessageBubble.tsx     # Bolha individual de mensagem
│   ├── ChatInput.tsx         # Card de input completo (textarea + toggle + botão)
│   └── TypingIndicator.tsx   # Indicador animado de "digitando"
├── App.tsx                   # Componente raiz — state do chat + layout
├── App.css                   # Estilos globais (se necessário)
├── index.css                 # Tailwind imports
└── main.tsx                  # Entry point
```

---

## 6. Definição de Types

```typescript
// src/types/chat.ts

type Sender = "user" | "bot"

type Message = {
  id: string
  text: string
  sender: Sender
  timestamp: Date
}
```

---

## 7. Divisão em Tarefas (Ordem Progressiva)

### Tarefa 1 — Tipos e Fundação
> Criar os types base e preparar a estrutura de pastas.

- [ ] Criar `src/types/chat.ts` com os types `Sender` e `Message`
- [ ] Limpar o `App.tsx` padrão do Vite (remover conteúdo boilerplate)
- [ ] Configurar o fundo marrom claro na página e o container centralizado `max-w-2xl`

---

### Tarefa 2 — Componente `MessageBubble`
> Componente de bolha de mensagem individual.

- [ ] Criar `src/components/MessageBubble.tsx`
- [ ] Props: recebe um objeto `Message`
- [ ] Alinhar à direita quando `sender === "user"`, à esquerda quando `sender === "bot"`
- [ ] Exibir texto da mensagem + horário formatado (HH:mm)
- [ ] Estilo: fundo branco, cantos arredondados, sombra sutil

---

### Tarefa 3 — Componente `ChatHistory`
> Container scrollável que renderiza a lista de mensagens.

- [ ] Criar `src/components/ChatHistory.tsx`
- [ ] Props: recebe array de `Message[]`
- [ ] Renderizar uma `MessageBubble` para cada mensagem
- [ ] Scroll vertical quando o conteúdo exceder a viewport
- [ ] Auto-scroll para o fundo ao receber nova mensagem (via `useEffect` + `ref`)

---

### Tarefa 4 — Componente `ChatInput` (base)
> Card de input com textarea e botão de enviar.

- [ ] Criar `src/components/ChatInput.tsx`
- [ ] Textarea multilinha com auto-resize (ajustar altura conforme conteúdo)
- [ ] Botão de enviar no lado direito, desabilitado quando textarea vazio
- [ ] Card fixo no fundo da tela, fundo branco, cantos arredondados
- [ ] Props: callback `onSend(text: string, sender: Sender)`

---

### Tarefa 5 — Toggle Usuário / Robô
> Adicionar o toggle dentro do `ChatInput`.

- [ ] Botão com ícone + texto no lado esquerdo do card
- [ ] State interno para o modo ativo (`user` | `bot`)
- [ ] Quando `bot` ativo: borda do card muda para roxa
- [ ] O sender enviado no `onSend` reflete o estado do toggle

---

### Tarefa 6 — Integração no `App.tsx`
> Juntar tudo no componente raiz.

- [ ] State `messages: Message[]` com `useState`
- [ ] Função `handleSend` que cria uma nova `Message` e adiciona ao state
- [ ] Renderizar `ChatHistory` com as mensagens
- [ ] Renderizar `ChatInput` com o callback `onSend`
- [ ] Layout completo: fundo marrom, container centralizado, input fixo no fundo

---

### Tarefa 7 — Indicador de "Digitando"
> Simular delay e mostrar indicador antes da mensagem do robô aparecer.

- [ ] Criar `src/components/TypingIndicator.tsx` com animação de "digitando" (3 bolinhas pulsantes)
- [ ] No `App.tsx`, ao enviar mensagem como robô:
  1. Ativar state `isTyping = true`
  2. Exibir `TypingIndicator` no final do histórico (lado esquerdo)
  3. Após delay (800ms–1500ms), adicionar a mensagem real e desativar `isTyping`
- [ ] Auto-scroll ao exibir o indicador e ao exibir a mensagem final

---

### Tarefa 8 — Polimento Final
> Ajustes visuais e de UX.

- [ ] Revisar responsividade em telas pequenas
- [ ] Garantir que o textarea limpa corretamente após envio
- [ ] Garantir que o scroll funciona bem com muitas mensagens
- [ ] Testar fluxo completo: enviar como usuário → toggle → enviar como robô (com delay) → toggle → enviar como usuário
- [ ] Verificar build (`npm run build`) sem erros

---

## 8. Fora de Escopo (v1)

- Persistência de mensagens (localStorage, banco de dados)
- Múltiplas conversas / abas
- Envio de arquivos, imagens ou emojis
- Autenticação
- Backend / API real
