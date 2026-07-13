// =========================================================
// ÁREA DO CLIENTE — lógica de demonstração (front-end only)
//
// IMPORTANTE PARA QUEM FOR LIGAR ISSO A UM BACKEND DE VERDADE:
// Os dados abaixo (MOCK_CUSTOMERS) são só um exemplo estático
// pra você ver a experiência funcionando no navegador. Isso NÃO
// é seguro para produção: qualquer pessoa pode abrir o código-fonte
// e ver esses dados. Antes de publicar de verdade, troque a função
// findCustomer() e sendVerificationCode() por chamadas reais a um
// backend (ex.: uma API que consulta seu banco de dados e dispara
// SMS/e-mail via um provedor como Twilio ou SendGrid), nunca
// devolvendo dados do cliente antes do código ser confirmado.
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  const MOCK_CUSTOMERS = [
    {
      cpf: '12345678900',
      contatos: ['31990001111', 'maria@exemplo.com'],
      nome: 'Maria Aparecida Souza',
      telefone: '(31) 99000-1111',
      email: 'maria@exemplo.com',
      operadora: 'NIO',
      plano: 'NIO Super 800 Mega',
      endereco: 'Rua das Palmeiras, 245 — Centro, Sete Lagoas - MG',
    },
    {
      cpf: '98765432100',
      contatos: ['31988882222', 'roberto@exemplo.com'],
      nome: 'Roberto Nunes Almeida',
      telefone: '(31) 98888-2222',
      email: 'roberto@exemplo.com',
      operadora: 'Algar',
      plano: 'Algar 600 Mega',
      endereco: 'Av. Getúlio Vargas, 900 — Santa Luzia, Sete Lagoas - MG',
    },
  ];

  const loginSection = document.getElementById('etapa-login');
  const otpSection = document.getElementById('etapa-otp');
  const dashboardSection = document.getElementById('etapa-dashboard');
  const novoSection = document.getElementById('etapa-novo');
  if (!loginSection) return; // não está na página cliente.html

  const loginForm = document.getElementById('login-form');
  const otpForm = document.getElementById('otp-form');
  const otpDestino = document.getElementById('otp-destino');
  const voltarLogin = document.getElementById('voltar-login');

  let pendingCustomer = null;
  let demoCode = null;

  const showOnly = (section) => {
    [loginSection, otpSection, dashboardSection, novoSection].forEach(s => {
      if (!s) return;
      s.hidden = (s !== section);
    });
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onlyDigits = (str) => (str || '').replace(/\D/g, '');

  // Simula a busca no "banco de dados" — troque por fetch('/api/customers/lookup', ...)
  const findCustomer = (cpf, contato) => {
    const cpfDigits = onlyDigits(cpf);
    const contatoNorm = (contato || '').trim().toLowerCase();
    return MOCK_CUSTOMERS.find(c => {
      const matchesCpf = c.cpf === cpfDigits;
      const matchesContato = c.contatos.some(x =>
        x.toLowerCase() === contatoNorm || onlyDigits(x) === onlyDigits(contatoNorm)
      );
      return matchesCpf && matchesContato;
    }) || null;
  };

  // Simula o envio de um código de verificação — troque por uma chamada real
  // de backend que dispara SMS/e-mail e nunca expõe o código no front-end.
  const sendVerificationCode = (customer) => {
    demoCode = String(Math.floor(100000 + Math.random() * 900000));
    // Em produção isso NUNCA aparece no client-side — aqui é só para teste local:
    console.info('[DEMO] Código de verificação simulado:', demoCode);
    return demoCode;
  };

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cpf = document.getElementById('cpf').value;
    const contato = document.getElementById('contato').value;

    const customer = findCustomer(cpf, contato);

    if (!customer) {
      showOnly(novoSection);
      return;
    }

    pendingCustomer = customer;
    sendVerificationCode(customer);
    const destinoMasked = customer.email && contato.includes('@')
      ? customer.email.replace(/(.{2}).+(@.+)/, '$1•••$2')
      : customer.telefone.replace(/\d(?=\d{2})/g, '•');
    otpDestino.textContent = `Enviamos um código de 6 dígitos para ${destinoMasked}.`;
    showOnly(otpSection);
  });

  otpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const typed = document.getElementById('otp').value.trim();

    // Demo: aceita o código gerado OU "000000" para facilitar testes.
    if (typed === demoCode || typed === '000000') {
      fillDashboard(pendingCustomer);
      showOnly(dashboardSection);
    } else {
      alert('Código incorreto. Confira o console do navegador para ver o código de teste (ambiente de demonstração).');
    }
  });

  if (voltarLogin) {
    voltarLogin.addEventListener('click', (e) => {
      e.preventDefault();
      showOnly(loginSection);
    });
  }

  const maskCpf = (cpf) => {
    const d = onlyDigits(cpf);
    if (d.length !== 11) return cpf;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.***-${d.slice(9, 11)}`;
  };

  function fillDashboard(customer) {
    document.getElementById('dash-nome').textContent = customer.nome;
    document.getElementById('dash-cpf').textContent = maskCpf(customer.cpf);
    document.getElementById('dash-telefone').textContent = customer.telefone;
    document.getElementById('dash-email').textContent = customer.email;
    document.getElementById('dash-operadora').textContent = customer.operadora;
    document.getElementById('dash-plano').textContent = customer.plano;
    document.getElementById('dash-endereco').textContent = customer.endereco;
  }

  // ---- Ações rápidas do painel -> WhatsApp com mensagem pronta ----
  const whatsappNumber = '#WHATSAPP_AQUI';
  const actionMessages = {
    suporte: 'Olá! Preciso de suporte técnico com a minha internet.',
    endereco: 'Olá! Preciso alterar o endereço de instalação da minha internet.',
    plano: 'Olá! Quero saber sobre outros planos disponíveis para o meu endereço.',
    fatura: 'Olá! Poderia me enviar a segunda via da minha fatura?',
    atendente: 'Olá! Gostaria de falar com um atendente, por favor.',
  };

  document.querySelectorAll('.client-action-card').forEach(card => {
    card.addEventListener('click', () => {
      const action = card.getAttribute('data-action');
      const nome = pendingCustomer ? pendingCustomer.nome.split(' ')[0] : '';
      const msg = (nome ? `Olá! Aqui é ${nome}. ` : 'Olá! ') + (actionMessages[action] || 'Preciso de ajuda.');
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    });
  });

});