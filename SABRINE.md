# Sabrine Reis — Manicure e pedicure
Site estático responsivo para Castilho–SP. WhatsApp: +55 18 99762-3184.

## Uso e produção
Não há dependências externas. Execute `npm test` e `npm run build`. Publique o conteúdo de `dist/` na raiz da hospedagem (por exemplo, `public_html` na Hostinger). Também é possível servir diretamente index.html, style.css, app.js e assets/.

## Atendimento
Dois fluxos: solicitação de agendamento e orçamento. Serviço é texto livre. Agendamento exige nome, telefone, descrição, data, horário e local; orçamento permite data e horário opcionais. Domicílio exige endereço. A mensagem é revisada antes de abrir WhatsApp e precisa ser enviada pela cliente.

Não existe banco de dados, reserva automática, calendário de vagas ou bloqueio de horários. Dias de trabalho não foram informados: data/hora são preferências, não disponibilidade real. Sabrine confirma serviço, valores, deslocamento e horário na conversa. Para agenda sincronizada será necessário definir jornadas e integrar um backend de reservas.

## Imagens
Retrato profissional criado com IA a partir das referências fornecidas, sujeito à avaliação de fidelidade pela titular. Fotos de trabalhos são originais, com enquadramento no layout; o acabamento das unhas não foi alterado. Nenhum arquivo pessoal de referência adicional foi publicado.

## Privacidade
O formulário não persiste dados, não usa analytics e apenas monta um link wa.me. Dados são enviados ao WhatsApp quando a cliente continua e envia a mensagem.

## Converge
O link fornecido não pôde ser visualizado. Este repositório contém uma implementação independente; não foi verificada sincronização com o projeto Converge.

## Integração no Converge
A estrutura React/Vite é preservada na branch enter-main. A página é um componente React nativo; as rotas / e /sabrine/index.html renderizam o mesmo site sem redirecionamento. Imagens são importadas pelo Vite e entram no bundle. A pasta public/sabrine permanece como exportação estática independente. A publicação pública deve ser conferida no painel.
