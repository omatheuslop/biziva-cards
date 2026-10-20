<p align="center"><img src="public/biziva/brand.svg" width="64" alt="Biziva" /></p>

# Biziva Cards

Uma ideia. Um card de presença. Transforme uma mensagem em SVG editável ou PNG. Sem dependências externas, upload ou geração paga.

Fork completo de [carbon-app/carbon](https://github.com/carbon-app/carbon), referência `1334429ae63f9a3d052d59ec8c6b158fa5db0943`. Licença **MIT**, copyright, histórico e aplicação original preservados. O projeto original tinha 36,117 estrelas na consulta de 19/10/2026; essas estrelas não pertencem a este fork. Não prometemos viralização.

## Começar em menos de um minuto

Requer Node.js 22 ou superior. O workspace Biziva não instala dependências nem exige chaves:

```sh
git clone https://github.com/omatheuslop/biziva-cards.git
cd biziva-cards
npm run biziva
```

Abra http://127.0.0.1:8891/biziva/ . Porta opcional: `PORT=8892 npm run biziva`. O servidor escuta somente em loopback. Para produção, configure sua própria hospedagem HTTPS; este commit não provisiona SaaS.

## O que foi acrescentado

Transforme uma mensagem em SVG editável ou PNG. Sem dependências externas, upload ou geração paga. Interface Biziva, entrada e saída revisáveis, exportação explícita e projeto local portátil, sem persistir dados automaticamente. Implementação em `public/biziva/logic.mjs`; UI em `public/biziva/`.

O texto do resultado é tratado como dado, nunca executado. Entradas grandes e formatos inválidos são rejeitados; exportações antigas são desabilitadas quando a entrada muda.

## App original

As funcionalidades completas do upstream continuam no repositório. Siga [UPSTREAM-README.md](UPSTREAM-README.md) para instalar, compilar e configurar o app original. A entrada nativa tem um atalho para `/biziva/index.html`; esse workspace também pode ser servido pelos assets públicos do app original. O servidor mínimo `npm run biziva` serve apenas a extensão local, não substitui backends ou protocolos do original.

## Verificação

```sh
npm run test:biziva
```

CI da extensão e testes locais não certificam todo o código, dependências, integrações ou protocolos herdados do upstream. Leia [BIZIVA.md](BIZIVA.md) para o escopo e limites.
