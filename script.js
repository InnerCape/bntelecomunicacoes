// =========================================================
// BN SOLUÇÕES — interações do site
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  const isCompactViewport = () => window.matchMedia('(max-width: 768px)').matches;

  // ---- Performance: lazy load imagens abaixo da dobra ----
  document.querySelectorAll('img').forEach((img) => {
    if (!img.hasAttribute('decoding')) img.decoding = 'async';
    const isPriorityImage = img.closest('header, .hero, .page-hero, .op-hero, .operator-hero-shell, .authorized-showcase');
    if (!isPriorityImage && !img.hasAttribute('loading')) img.loading = 'lazy';
  });

  // Logos do trust banner sao renderizados como wordmarks vetoriais em CSS.

  // ---- Ano dinâmico no rodapé ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Header: muda estilo ao rolar ----
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 24) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- WhatsApp links: mensagens contextuais por página/plano ----
  const WHATSAPP_NUMBER = '5531983618918';
  const path = (window.location.pathname || '').toLowerCase();

  const getOperatorFromPath = () => {
    if (path.endsWith('/vero.html') || path.endsWith('vero.html')) return 'VERO';
    if (path.endsWith('/nio.html') || path.endsWith('nio.html')) return 'NIO';
    if (path.endsWith('/algar.html') || path.endsWith('algar.html')) return 'ALGAR';
    return '';
  };

  const getDefaultMessageByPage = () => {
    const operator = getOperatorFromPath();
    if (operator) return `Olá! Tenho interesse nos planos da ${operator} e gostaria de mais informações.`;
    return 'Olá! Gostaria de mais informações sobre os planos de internet.';
  };

  const buildPlanMessage = (operator, planKey) => {
    const planMessages = {
      VERO: {
        plan1: [
          'Olá! Tenho interesse no plano VERO Wi-Fi 6.',
          '',
          '• Velocidade: 700 Mega',
          '• Benefícios: Wi-Fi 6 incluso + E+, Navegue e Ubook GO',
          '• Preço: R$ 124,99/mês',
          '',
          'Gostaria de mais informações sobre este plano.'
        ].join('\n'),
        plan2: [
          'Olá! Tenho interesse no plano VERO Wi-Fi 6 + 20 GIGA.',
          '',
          '• Velocidade: 700 Mega (fibra) + 20 GIGA (móvel)',
          '• Benefícios: Wi-Fi 6 incluso + E+, Navegue e AWDIO',
          '• Preço: R$ 129,99/mês',
          '',
          'Gostaria de mais informações sobre este plano.'
        ].join('\n'),
        plan3: [
          'Olá! Tenho interesse no plano VERO 800 Mega + Disney+.',
          '',
          '• Velocidade: 800 Mega + 30 GIGA (celular)',
          '• Benefícios: Disney+ com anúncios incluso',
          '• Preço: R$ 129,99/mês',
          '',
          'Gostaria de mais informações sobre este plano.'
        ].join('\n')
      },
      NIO: {
        plan1: [
          'Olá! Tenho interesse no plano NIO Essencial.',
          '',
          '• Velocidade: 600 Mega',
          '• Benefícios: Roteador Wi-Fi 5 incluso',
          '• Preço: R$ 110,00/mês',
          '',
          'Gostaria de mais informações sobre este plano.'
        ].join('\n'),
        plan2: [
          'Olá! Tenho interesse no plano NIO Super.',
          '',
          '• Velocidade: 800 Mega',
          '• Benefícios: Wi-Fi 6 + Globoplay por 12 meses',
          '• Preço: R$ 135,00/mês',
          '',
          'Gostaria de mais informações sobre este plano.'
        ].join('\n'),
        plan3: [
          'Olá! Tenho interesse no plano NIO Ultra.',
          '',
          '• Velocidade: 1 Giga',
          '• Benefícios: Wi-Fi 6 + Globoplay por 12 meses',
          '• Preço: R$ 150,00/mês',
          '',
          'Gostaria de mais informações sobre este plano.'
        ].join('\n')
      },
      ALGAR: {
        plan1: [
          'Olá! Tenho interesse no plano ALGAR 700 Mega.',
          '',
          '• Velocidade: 700 Mega',
          '• Benefícios: Inner AI Lite Anual + Wi-Fi incluso + suporte 24h',
          '• Preço: R$ 109,90/mês',
          '',
          'Gostaria de mais informações sobre este plano.'
        ].join('\n'),
        plan2: [
          'Olá! Tenho interesse no plano ALGAR 800 Mega.',
          '',
          '• Velocidade: 800 Mega',
          '• Benefícios: Inner AI Lite Anual + Wi-Fi incluso + suporte 24h',
          '• Preço: R$ 119,90/mês',
          '',
          'Gostaria de mais informações sobre este plano.'
        ].join('\n'),
        plan3: [
          'Olá! Tenho interesse no plano ALGAR 1 Giga.',
          '',
          '• Velocidade: 1 Giga',
          '• Benefícios: Inner AI Lite Anual + Wi-Fi incluso + suporte 24h',
          '• Preço: R$ 149,90/mês',
          '',
          'Gostaria de mais informações sobre este plano.'
        ].join('\n')
      }
    };

    if (!operator || !planKey) return '';
    return planMessages[operator] && planMessages[operator][planKey]
      ? planMessages[operator][planKey]
      : '';
  };

  const setWhatsAppHref = (el, message) => {
    if (!el || !message) return;
    const encoded = encodeURIComponent(message);
    el.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`);
  };

  // Planos por operadora (cards das páginas de operadora)
  const operatorFromPath = getOperatorFromPath();
  if (operatorFromPath) {
    const getPlanKeyByImage = (src, idx) => {
      // NIO cards are intentionally arranged in custom visual order.
      if (operatorFromPath === 'NIO') {
        const nioOrder = ['plan3', 'plan1', 'plan2'];
        return nioOrder[idx] || 'plan1';
      }

      // Algar cards are intentionally arranged in custom visual order.
      if (operatorFromPath === 'ALGAR') {
        const algarOrder = ['plan3', 'plan1', 'plan2'];
        return algarOrder[idx] || 'plan1';
      }
      const normalized = (src || '').toLowerCase();
      if (normalized.includes('plano2')) return 'plan2';
      if (normalized.includes('plano3') || normalized.includes('avatar')) return 'plan3';
      if (normalized.includes('plano')) return 'plan1';
      if (idx === 1) return 'plan2';
      if (idx === 2) return 'plan3';
      return 'plan1';
    };

    const planCards = document.querySelectorAll('.operator-plan-gallery > div');
    planCards.forEach((card, idx) => {
      const btn = card.querySelector('.btn-whatsapp');
      const img = card.querySelector('img');
      if (!btn) return;
      const planKey = getPlanKeyByImage(img ? img.getAttribute('src') : '', idx);
      const message = buildPlanMessage(operatorFromPath, planKey);
      if (message) setWhatsAppHref(btn, message);
    });
  }

  // Todos os demais links WhatsApp recebem mensagens curtas e contextuais
  const defaultMessage = getDefaultMessageByPage();
  document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
    if (link.closest('.operator-plan-gallery')) return;

    const label = (link.textContent || '').replace(/\s+/g, ' ').trim();
    const lowerLabel = label.toLowerCase();
    const operator = getOperatorFromPath();
    const operatorMessage = operator
      ? `Olá! Tenho interesse nos planos da ${operator} e gostaria de mais informações.`
      : defaultMessage;
    const coverageMessage = 'Olá! Gostaria de verificar a disponibilidade de internet no meu endereço.';

    if (/verificar cobertura|verifique cobertura|disponibilidade/.test(lowerLabel)) {
      setWhatsAppHref(link, coverageMessage);
      return;
    }

    if (/consultar planos/.test(lowerLabel)) {
      setWhatsAppHref(link, operatorMessage);
      return;
    }

    if (link.classList.contains('float-whatsapp') || link.closest('header') || link.closest('footer')) {
      setWhatsAppHref(link, operatorMessage);
      return;
    }

    if (label) {
      setWhatsAppHref(link, operatorMessage);
      return;
    }

    setWhatsAppHref(link, defaultMessage);
  });

  // Link social com ícone no rodapé: mantém destino Instagram com acessibilidade
  document.querySelectorAll('.footer-social-link').forEach((link) => {
    link.setAttribute('aria-label', 'Instagram da BN Soluções');
    link.setAttribute('title', 'Instagram da BN Soluções');
  });

  // ---- Menu mobile ----
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const headerCta = document.querySelector('.header-actions .btn-whatsapp');
  const dropdownToggle = document.getElementById('dropdown-toggle');

  if (menuToggle && mainNav) {
    menuToggle.setAttribute('aria-controls', 'main-nav');
    const MENU_ANIMATION_MS = 300;
    let isMenuAnimating = false;
    let menuAnimTimer = null;

    let navBackdrop = document.querySelector('.nav-backdrop');
    if (!navBackdrop) {
      navBackdrop = document.createElement('div');
      navBackdrop.className = 'nav-backdrop';
      navBackdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(navBackdrop);
    }

    if (headerCta && !mainNav.querySelector('.main-nav-mobile-cta')) {
      const mobileCtaWrap = document.createElement('div');
      mobileCtaWrap.className = 'main-nav-mobile-cta';
      const mobileCta = headerCta.cloneNode(true);
      mobileCta.classList.remove('btn-sm');
      mobileCta.classList.add('btn-lg');
      mobileCtaWrap.appendChild(mobileCta);
      mainNav.appendChild(mobileCtaWrap);
    }

    const setMenuState = (isOpen) => {
      if (isMenuAnimating) return;
      isMenuAnimating = true;
      menuToggle.classList.add('is-animating');
      clearTimeout(menuAnimTimer);

      mainNav.classList.toggle('open', isOpen);
      menuToggle.classList.toggle('active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      navBackdrop.classList.toggle('open', isOpen);
      if (!isOpen) {
        mainNav.querySelectorAll('.nav-dropdown.open').forEach((dropdown) => {
          dropdown.classList.remove('open');
        });
        if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
      }

      menuAnimTimer = window.setTimeout(() => {
        isMenuAnimating = false;
        menuToggle.classList.remove('is-animating');
      }, MENU_ANIMATION_MS);
    };

    const closeMenu = () => {
      setMenuState(false);
    };

    menuToggle.addEventListener('click', () => {
      if (isMenuAnimating) return;
      setMenuState(!mainNav.classList.contains('open'));
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    navBackdrop.addEventListener('click', closeMenu);

    document.addEventListener('click', (e) => {
      if (!isCompactViewport() || !mainNav.classList.contains('open')) return;
      if (mainNav.contains(e.target) || menuToggle.contains(e.target)) return;
      closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    let lastIsCompact = isCompactViewport();
    window.addEventListener('resize', () => {
      const nowIsCompact = isCompactViewport();
      if (lastIsCompact && !nowIsCompact) closeMenu();
      if (!nowIsCompact) {
        clearTimeout(menuAnimTimer);
        isMenuAnimating = false;
        menuToggle.classList.remove('is-animating');
        navBackdrop.classList.remove('open');
        document.body.classList.remove('menu-open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('open');
      }
      lastIsCompact = nowIsCompact;
    });
  }

  // ---- Dropdown "Operadoras" no menu ----
  const navDropdown = document.getElementById('nav-dropdown');
  if (navDropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navDropdown.classList.toggle('open');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (e) => {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- Scroll reveal ----
  const revealTargets = document.querySelectorAll(
    '.benefit-card, .step, .operator-card-premium, .testimonial-card, .reveal, .authorized-logo-card, .plan-card, .crosssell-card, .value-card, .client-action-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if (!isCompactViewport() && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('in-view'));
  }

  // ---- Contador animado das estatísticas do hero ----
  const statValues = document.querySelectorAll('.stat-value[data-target]');
  if (statValues.length && 'IntersectionObserver' in window) {
    const animateCount = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statValues.forEach(el => statObserver.observe(el));
  }

  // ---- Cursor de sinal decorativo (somente telas grandes) ----
  const signalCursor = document.querySelector('.signal-cursor');
  if (signalCursor && window.matchMedia('(min-width:1024px)').matches) {
    let raf = null;
    document.addEventListener('mousemove', (e) => {
      signalCursor.style.opacity = '1';
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        signalCursor.style.left = e.clientX + 'px';
        signalCursor.style.top = e.clientY + 'px';
      });
    });
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        signalCursor.style.width = '34px';
        signalCursor.style.height = '34px';
        signalCursor.style.borderColor = 'rgba(255,122,41,0.8)';
      });
      el.addEventListener('mouseleave', () => {
        signalCursor.style.width = '22px';
        signalCursor.style.height = '22px';
        signalCursor.style.borderColor = '';
      });
    });
  }

  // ---- Smooth scroll com offset para o header fixo ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // =========================================================
  // Validação de formulários — Funções compartilhadas
  // =========================================================
  const formValidators = {
    nome: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return { valid: false, message: 'Por favor, digite seu nome.' };
      if (trimmed.length < 3) return { valid: false, message: 'O nome deve ter pelo menos 3 caracteres.' };
      return { valid: true };
    },
    telefone: (value) => {
      const cleaned = value.replace(/\D/g, '');
      if (!cleaned) return { valid: false, message: 'Por favor, digite seu telefone.' };
      if (cleaned.length < 10) return { valid: false, message: 'O telefone deve ter pelo menos 10 dígitos.' };
      return { valid: true };
    }
  };

  const getErrorMsg = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field) return null;
    const formRow = field.closest('.form-row');
    if (!formRow) return null;
    return formRow.querySelector('.form-error-msg');
  };

  const showError = (fieldId, message) => {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const formRow = field.closest('.form-row');
    if (!formRow) return;
    formRow.classList.add('has-error');
    const errorMsg = getErrorMsg(fieldId);
    if (errorMsg) errorMsg.textContent = message;
  };

  const clearError = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const formRow = field.closest('.form-row');
    if (!formRow) return;
    formRow.classList.remove('has-error');
    const errorMsg = getErrorMsg(fieldId);
    if (errorMsg) errorMsg.textContent = '';
  };

  const validateField = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field) return true;
    if (!['nome', 'telefone'].includes(fieldId)) {
      clearError(fieldId);
      return true;
    }
    const value = field.value;
    const validator = formValidators[fieldId];
    if (!validator) {
      clearError(fieldId);
      return true;
    }
    const result = validator(value);
    if (result.valid) {
      clearError(fieldId);
      return true;
    } else {
      showError(fieldId, result.message);
      return false;
    }
  };

  const setupFormValidation = (form, fieldsToValidate = ['nome', 'telefone']) => {
    fieldsToValidate.forEach(fieldId => {
      const field = form.querySelector(`#${fieldId}`);
      if (!field) return;
      field.addEventListener('blur', () => validateField(fieldId));
      field.addEventListener('input', () => {
        const formRow = field.closest('.form-row');
        if (formRow && formRow.classList.contains('has-error')) {
          validateField(fieldId);
        }
      });
    });
  };

  // ---- Formulário de contato (contato.html) -> WhatsApp ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    setupFormValidation(contactForm);

    const whatsappNumber = WHATSAPP_NUMBER;
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all required fields
      const isNomeValid = validateField('nome');
      const isTelefoneValid = validateField('telefone');

      if (!isNomeValid || !isTelefoneValid) {
        return;
      }

      // All validations passed, send to WhatsApp
      const nome = contactForm.nome.value.trim();
      const telefone = contactForm.telefone.value.trim();
      const operadora = contactForm.operadora.value;
      const area = contactForm.area_cobertura ? contactForm.area_cobertura.value : '';
      const tipo = contactForm.tipo.value;
      const mensagem = contactForm.mensagem.value.trim();
      const linhas = [
        `Olá! Meu nome é ${nome}.`,
        `Telefone: ${telefone}`,
        `Operadora de interesse: ${operadora}`,
        area ? `Área de cobertura: ${area}` : null,
        `Tipo de plano: ${tipo}`,
        mensagem ? `Mensagem: ${mensagem}` : null
      ].filter(Boolean);
      const texto = encodeURIComponent(linhas.join('\n'));
      window.open(`https://wa.me/${whatsappNumber}?text=${texto}`, '_blank', 'noopener');
    });
  }

  // ---- Formulário de solicitação de serviço (home) -> WhatsApp ----
  const serviceForm = document.getElementById('service-form');
  if (serviceForm) {
    setupFormValidation(serviceForm);

    const whatsappNumber = WHATSAPP_NUMBER;
    serviceForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all required fields
      const isNomeValid = validateField('nome');
      const isTelefoneValid = validateField('telefone');

      if (!isNomeValid || !isTelefoneValid) {
        return;
      }

      // All validations passed, send to WhatsApp
      const nome = serviceForm.nome.value.trim();
      const telefone = serviceForm.telefone.value.trim();
      const endereco = serviceForm.endereco.value.trim();
      const operadora = serviceForm.operadora.value;
      const area = serviceForm.area_cobertura ? serviceForm.area_cobertura.value : '';
      const tipo = serviceForm.tipo.value;
      const servico = serviceForm.servico.value.trim();
      const linhas = [
        `Olá! Meu nome é ${nome}.`,
        `Telefone: ${telefone}`,
        endereco ? `Endereço: ${endereco}` : null,
        `Operadora desejada: ${operadora}`,
        area ? `Área de cobertura: ${area}` : null,
        `Tipo de plano: ${tipo}`,
        servico ? `Serviço desejado: ${servico}` : null
      ].filter(Boolean);
      const texto = encodeURIComponent(linhas.join('\n'));
      window.open(`https://wa.me/${whatsappNumber}?text=${texto}`, '_blank', 'noopener');
    });
  }

  // =========================================================
  // Área de cobertura dinâmica por operadora
  // =========================================================
  const AREAS_BY_OPERATOR = {
    VERO: [
      "ALFREDO VASCONCELOS",
      "ANTÔNIO CARLOS",
      "BARÃO DE COCAIS",
      "BARROSO",
      "BELO HORIZONTE",
      "BETIM",
      "BICAS",
      "BOA ESPERANÇA",
      "BOM DESPACHO",
      "BOM SUCESSO",
      "BRUMADINHO",
      "CAETÉ",
      "CAMPO BELO",
      "CARATINGA",
      "CARMO DA MATA",
      "CARMÓPOLIS DE MINAS",
      "CAXAMBU",
      "CLÁUDIO",
      "CONCEIÇÃO DA BARRA DE MINAS",
      "CONGONHAS",
      "CONSELHEIRO LAFAIETE",
      "CONTAGEM",
      "CORONEL FABRICIANO",
      "CRISTIANO OTONI",
      "DIVINÓPOLIS",
      "DORES DE CAMPOS",
      "ENTRE RIOS DE MINAS",
      "ESMERALDAS",
      "GOVERNADOR VALADARES",
      "GUARARÁ",
      "IGARAPÉ",
      "IPATINGA",
      "ITABIRA",
      "ITABIRITO",
      "ITAGUARA",
      "ITATIAIUÇU",
      "ITAÚNA",
      "JECEABA",
      "JOÃO MONLEVADE",
      "JUIZ DE FORA",
      "LAVRAS",
      "LEOPOLDINA",
      "LIMA DUARTE",
      "MANHUAÇU",
      "MAR DE ESPANHA",
      "MARIANA",
      "MARTINHO CAMPOS",
      "MATIAS BARBOSA",
      "MATOZINHOS",
      "NEPOMUCENO",
      "NOVA LIMA",
      "NOVA SERRANA",
      "OLIVEIRA",
      "OURO BRANCO",
      "OURO PRETO",
      "PARÁ DE MINAS",
      "PEDRO LEOPOLDO",
      "PEQUERI",
      "PERDÕES",
      "PONTE NOVA",
      "RESSAQUINHA",
      "RIBEIRÃO DAS NEVES",
      "RIBEIRÃO VERMELHO",
      "SABARÁ",
      "SANTA BÁRBARA",
      "SANTA CRUZ DE MINAS",
      "SANTA LUZIA",
      "SANTANA DO PARAÍSO",
      "SANTO ANTÔNIO DO AMPARO",
      "SANTOS DUMONT",
      "SÃO BRÁS DO SUAÇUÍ",
      "SÃO FRANCISCO DE PAULA",
      "SÃO JOAQUIM DE BICAS",
      "SÃO JOSÉ DA LAPA",
      "SÃO LOURENÇO",
      "SETE LAGOAS",
      "TEÓFILO OTONI",
      "TIMÓTEO",
      "TIRADENTES",
      "UBÁ",
      "VESPASIANO",
      "VIÇOSA",
      "VISCONDE DO RIO BRANCO"
    ],
    NIO: [
      "ARAGUARI",
      "CAXAMBU",
      "CORONEL FABRICIANO",
      "ESMERALDAS",
      "GOVERNADOR VALADARES",
      "ITABIRA",
      "JOÃO MONLEVADE",
      "LAVRAS",
      "MURIAÉ",
      "PARACATU",
      "PATROCÍNIO",
      "SABARÁ",
      "SANTA RITA DO SAPUCAÍ",
      "TIMÓTEO"
    ],
    Algar: [
      "BELO HORIZONTE",
      "BERIZAL",
      "BETIM",
      "CARATINGA",
      "CATAGUASES",
      "CONTAGEM",
      "DIVINÓPOLIS",
      "IBIRITÉ",
      "IPATINGA",
      "JUIZ DE FORA",
      "LAGOA SANTA",
      "LEOPOLDINA",
      "MONTES CLAROS",
      "NOVA LIMA",
      "POÇOS DE CALDAS",
      "POUSO ALEGRE",
      "RIBEIRÃO DAS NEVES",
      "SANTA LUZIA",
      "SÃO LOURENÇO",
      "SETE LAGOAS",
      "UBÁ",
      "VARGINHA",
      "VESPASIANO"
    ]
  };

  const setupCoverageArea = (operadoraSelect, areaRow, areaSelect, areaNote) => {
    if (!operadoraSelect || !areaRow || !areaSelect) return;

    const updateAreas = () => {
      const areas = AREAS_BY_OPERATOR[operadoraSelect.value];

      if (!areas) {
        areaRow.hidden = true;
        return;
      }

      areaRow.hidden = false;
      areaSelect.innerHTML = '<option value="">Selecione sua área</option>' +
        areas.map(a => `<option value="${a}">${a}</option>`).join('') +
        '<option value="Minha área não está na lista">Minha área não está na lista</option>';

      if (areaNote) {
        areaNote.textContent = `Áreas atendidas pela ${operadoraSelect.value} em Sete Lagoas (lista de exemplo — confirmamos sua rua pelo WhatsApp).`;
      }
    };

    operadoraSelect.addEventListener('change', updateAreas);
    updateAreas();
  };

  setupCoverageArea(
    document.getElementById('operadora'),
    document.getElementById('area-cobertura-row'),
    document.getElementById('area-cobertura'),
    document.getElementById('area-cobertura-note')
  );

  // ---- Card de velocidade do hero (páginas que ainda usam o mockup) ----
  const speedValue = document.getElementById('speed-value');
  const speedRing = document.getElementById('speed-ring-fill');
  if (speedValue && speedRing) {
    const target = 587;
    const circumference = 440;
    const finalOffset = circumference * (1 - 0.86);
    const animateSpeed = () => {
      speedRing.style.strokeDashoffset = finalOffset;
      const duration = 1600;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        speedValue.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    setTimeout(animateSpeed, 400);
  }

  // ---- Verificador de cobertura NIO ----
  const coverageForm = document.getElementById('coverage-check-form');
  if (coverageForm) {
    const cepInput = document.getElementById('cep-input');
    const numeroInput = document.getElementById('numero-input');
    const resultDiv = document.getElementById('coverage-result');

    if (cepInput) {
      cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) {
          value = value.slice(0, 5) + '-' + value.slice(5, 8);
        }
        e.target.value = value;
      });
    }

    coverageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const cep = cepInput.value.replace(/\D/g, '');
      const numero = numeroInput.value.trim();

      if (!cep || cep.length < 5) {
        resultDiv.style.display = 'block';
        resultDiv.style.borderLeftColor = '#FF6B6B';
        resultDiv.style.background = 'rgba(255, 107, 107, 0.1)';
        resultDiv.textContent = '❌ Por favor, preencha um CEP válido.';
        return;
      }

      if (!numero) {
        resultDiv.style.display = 'block';
        resultDiv.style.borderLeftColor = '#FF6B6B';
        resultDiv.style.background = 'rgba(255, 107, 107, 0.1)';
        resultDiv.textContent = '❌ Por favor, preencha o número da residência.';
        return;
      }

      // Simular verificação (em produção, seria uma chamada à API real)
      resultDiv.style.display = 'block';
      resultDiv.style.borderLeftColor = 'var(--teal)';
      resultDiv.style.background = 'rgba(73, 184, 72, 0.1)';
      resultDiv.innerHTML = `
        <strong>✅ NIO disponível!</strong><br>
        <span style="font-size:0.9rem; display:block; margin-top:8px;">CEP: ${cep} | Nº ${numero}</span>
        <span style="font-size:0.9rem; display:block; margin-top:4px;">A cobertura NIO atende sua região.</span>
        <span style="font-size:0.85rem; display:block; margin-top:8px; opacity:0.8;">Fale com a BN Soluções para confirmar instalação e contratar seu plano.</span>
      `;

      // Auto-scroll para resultado
      setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    });
  }

  // ---- Coverage checker para VERO ----
  const coverageFormVero = document.getElementById('coverage-check-form-vero');
  if (coverageFormVero) {
    const cepInput = document.getElementById('cep-input-vero');
    const numeroInput = document.getElementById('numero-input-vero');
    const resultDiv = document.getElementById('coverage-result-vero');

    if (cepInput) {
      cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) {
          value = value.slice(0, 5) + '-' + value.slice(5, 8);
        }
        e.target.value = value;
      });
    }

    coverageFormVero.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const cep = cepInput.value.replace(/\D/g, '');
      const numero = numeroInput.value.trim();

      if (!cep || cep.length < 5) {
        resultDiv.style.display = 'block';
        resultDiv.style.borderLeftColor = '#FF6B6B';
        resultDiv.style.background = 'rgba(255, 107, 107, 0.1)';
        resultDiv.textContent = '❌ Por favor, preencha um CEP válido.';
        return;
      }

      if (!numero) {
        resultDiv.style.display = 'block';
        resultDiv.style.borderLeftColor = '#FF6B6B';
        resultDiv.style.background = 'rgba(255, 107, 107, 0.1)';
        resultDiv.textContent = '❌ Por favor, preencha o número da residência.';
        return;
      }

      // Simular verificação (em produção, seria uma chamada à API real)
      resultDiv.style.display = 'block';
      resultDiv.style.borderLeftColor = '#D81B60';
      resultDiv.style.background = 'rgba(216, 27, 96, 0.1)';
      resultDiv.innerHTML = `
        <strong>✅ VERO disponível!</strong><br>
        <span style="font-size:0.9rem; display:block; margin-top:8px;">CEP: ${cep} | Nº ${numero}</span>
        <span style="font-size:0.9rem; display:block; margin-top:4px;">A cobertura VERO atende sua região.</span>
        <span style="font-size:0.85rem; display:block; margin-top:8px; opacity:0.8;">Fale com a BN Soluções para confirmar instalação e contratar seu plano.</span>
      `;

      // Auto-scroll para resultado
      setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    });
  }

  // ---- Coverage checker para ALGAR ----
  const coverageFormAlgar = document.getElementById('coverage-check-form-algar');
  if (coverageFormAlgar) {
    const cepInput = document.getElementById('cep-input-algar');
    const numeroInput = document.getElementById('numero-input-algar');
    const resultDiv = document.getElementById('coverage-result-algar');

    if (cepInput) {
      cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) {
          value = value.slice(0, 5) + '-' + value.slice(5, 8);
        }
        e.target.value = value;
      });
    }

    coverageFormAlgar.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const cep = cepInput.value.replace(/\D/g, '');
      const numero = numeroInput.value.trim();

      if (!cep || cep.length < 5) {
        resultDiv.style.display = 'block';
        resultDiv.style.borderLeftColor = '#FF6B6B';
        resultDiv.style.background = 'rgba(255, 107, 107, 0.1)';
        resultDiv.textContent = '❌ Por favor, preencha um CEP válido.';
        return;
      }

      if (!numero) {
        resultDiv.style.display = 'block';
        resultDiv.style.borderLeftColor = '#FF6B6B';
        resultDiv.style.background = 'rgba(255, 107, 107, 0.1)';
        resultDiv.textContent = '❌ Por favor, preencha o número da residência.';
        return;
      }

      // Simular verificação (em produção, seria uma chamada à API real)
      resultDiv.style.display = 'block';
      resultDiv.style.borderLeftColor = '#2EC4B6';
      resultDiv.style.background = 'rgba(46, 196, 182, 0.1)';
      resultDiv.innerHTML = `
        <strong>✅ Algar disponível!</strong><br>
        <span style="font-size:0.9rem; display:block; margin-top:8px;">CEP: ${cep} | Nº ${numero}</span>
        <span style="font-size:0.9rem; display:block; margin-top:4px;">A cobertura Algar atende sua região.</span>
        <span style="font-size:0.85rem; display:block; margin-top:8px; opacity:0.8;">Fale com a BN Soluções para confirmar instalação e contratar seu plano.</span>
      `;

      // Auto-scroll para resultado
      setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    });
  }

});