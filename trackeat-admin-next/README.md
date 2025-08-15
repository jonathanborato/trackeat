# TrackEat Admin (Next.js + Tailwind)

Admin web do TrackEat com abas para Mapa, Entregadores, Entregas, Fila, Financeiro e Configurações.

## Rodando localmente
```bash
npm install
npm run dev
# abra http://localhost:3000
```

## Deploy na Vercel (GitHub)
1. Suba este projeto para um repositório no GitHub (ex.: `trackeat-admin`).
2. Acesse https://vercel.com → **Add New → Project → Import Git Repository**.
3. Escolha seu repo e clique em **Deploy** (nenhuma configuração extra necessária).
4. (Opcional) Em **Domains**, conecte `admin.seu-dominio.com.br`.

## Estrutura
- `app/page.tsx`: interface principal (React + Tailwind)
- `app/globals.css`: estilos globais e utilitários (`@apply`)
- `tailwind.config.js`, `postcss.config.js`: configuração do Tailwind
- `next.config.mjs`: configuração do Next

> O mapa é um placeholder — depois substitua por Mapbox/Google Maps.
