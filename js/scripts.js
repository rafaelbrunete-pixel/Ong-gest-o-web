document.addEventListener('DOMContentLoaded', function () {
  const cpf = document.getElementById('cpf');
  const tel = document.getElementById('telefone');
  const cep = document.getElementById('cep');
  const form = document.getElementById('cadastroForm');
  const msgSuccess = document.getElementById('msgSuccess');

  function setMask(el, maskFn) {
    if (!el) return;
    el.addEventListener('input', function (e) {
      const pos = el.selectionStart;
      const oldLen = el.value.length;
      el.value = maskFn(el.value);
      const newLen = el.value.length;
      el.selectionStart = el.selectionEnd = pos + (newLen - oldLen);
    });
  }

  function maskCPF(v) {
    v = v.replace(/\D/g, '').slice(0,11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return v;
  }

  function maskTel(v) {
    v = v.replace(/\D/g, '').slice(0,11);
    v = v.replace(/^(\d{2})(\d)/, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    return v;
  }

  function maskCEP(v) {
    v = v.replace(/\D/g, '').slice(0,8);
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    return v;
  }

  setMask(cpf, maskCPF);
  setMask(tel, maskTel);
  setMask(cep, maskCEP);

  if (form) {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        return;
      }
      e.preventDefault();
      form.classList.add('hidden');
      if (msgSuccess) msgSuccess.classList.remove('hidden');
    });
  }
});
