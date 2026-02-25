# Guía de Despliegue en Cloudflare Pages

Este proyecto está optimizado para funcionar en **Cloudflare Pages** utilizando el adaptador `next-on-pages`.

## Requisitos Previos

1. Una cuenta de [Cloudflare](https://dash.cloudflare.com/).
2. El código subido a un repositorio de GitHub (que ya preparamos).

## Pasos para el Despliegue

### 1. Configuración en el Panel de Cloudflare
1. Ve a **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Selecciona tu repositorio `pulse-credit-portal`.
3. En la configuración de la build (**Build settings**):
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output`
   - **Root directory**: `/`

### 2. Variables de Entorno
Debes añadir las siguientes variables en **Settings** > **Environment variables** de tu proyecto en Cloudflare (tanto en Preview como en Production):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `HUBSPOT_PRIVATE_APP_TOKEN`
- `NEXT_PUBLIC_APP_URL` (la URL que te asigne Cloudflare)

### 3. Modo Edge (Opcional pero recomendado)
Para un rendimiento óptimo en Cloudflare, puedes añadir lo siguiente a tus rutas de API y páginas dinámicas:

```typescript
export const runtime = 'edge';
```

## Comandos Útiles (Local)
Si tienes instalado `wrangler`, puedes probar la build localmente con:
```bash
npx @cloudflare/next-on-pages
npx wrangler pages dev .vercel/output
```

---
© 2026 Pulse Agency LLC | Fullstack Deployment Strategy
