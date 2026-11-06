# Política de Segurança

## Versões suportadas

A branch `main` é a única versão mantida e recebe correções de segurança.

## Como reportar uma vulnerabilidade

**Não abra uma issue pública** com detalhes de uma vulnerabilidade. Em vez disso:

1. Use o recurso **Private vulnerability reporting** do GitHub, em *Security → Advisories → Report a vulnerability*.
2. Ou envie um e-mail para o autor pelo endereço público do perfil [@jrchakalo](https://github.com/jrchakalo).

Inclua, se possível:

- descrição do problema;
- passos para reproduzir;
- impacto esperado;
- versão/commit afetado;
- sugestão de correção, se houver.

Você receberá um retorno assim que possível. Pedimos que não divulgue publicamente o problema antes de uma correção.

## Escopo

- Aplicação Next.js (frontend e Route Handlers).
- Worker de ingestão (`worker/index.ts`).
- Schema, migrations e policies do Supabase.
- Configuração de autenticação e variáveis de ambiente.

## Diretrizes de segurança do projeto

- **Nunca** commite `.env`, chaves, tokens ou senhas reais.
- A chave `SUPABASE_SERVICE_ROLE_KEY` deve existir apenas no servidor.
- RLS deve permanecer habilitado em todas as tabelas do Supabase.
- O endpoint `/api/cron/update` deve ser protegido pelo `CRON_SECRET`.
- Rotas de dados devem exigir sessão autenticada.
- Rode `npm audit --omit=dev` antes de cada deploy e mantenha as dependências de produção atualizadas.
- Use senhas fortes e exclusivas para `ADMIN_PASSWORD` e `CRON_SECRET`.
- A conta `demo` é pública por design e deve permanecer **somente leitura**. Nunca reutilize nela a senha do administrador nem conceda permissões de escrita.

## Boas práticas para quem for implantar

- Gere `NEXTAUTH_SECRET` e `CRON_SECRET` com `openssl rand -base64 32`.
- Configure `NEXTAUTH_URL` com a URL canônica de produção.
- Restrinja o acesso ao painel do Supabase e às variáveis da Vercel.
- Revise periodicamente os logs de acesso e o uso da API de odds.
- Não reutilize a chave `service_role` em aplicações client-side.

## Agradecimentos

Obrigado por ajudar a manter este projeto seguro e útil como material de estudo.
