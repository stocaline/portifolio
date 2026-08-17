# Propostas

Pasta para hospedar propostas em HTML junto com o portfólio.

## Como publicar uma proposta

1. Copie o arquivo `.html` da proposta para dentro desta pasta.
2. Use um nome simples, sem espaços nem acentos (ex.: `cliente-acme.html`).
3. Faça o deploy (push para o Git → Vercel publica sozinho).

Pronto. A proposta fica acessível em:

```
https://SEU-DOMINIO/propostas/cliente-acme.html
```

## Observações

- Arquivos aqui são servidos "como estão" pelo Vite (nada é processado).
- CSS e JavaScript embutidos no HTML funcionam normalmente.
- Se a proposta tiver imagens/arquivos próprios, crie uma subpasta
  (ex.: `propostas/cliente-acme/index.html` + imagens) e acesse por
  `/propostas/cliente-acme/`.
