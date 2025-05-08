import { createCode, getAllCodes } from '../global/appwrite.js';

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  const formEl = document.querySelector('form');
  formEl.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = parseFormData(formData);

  for (let key in data) {
    data[key] = data[key].trim();

    if (key === 'MTN' || key === 'Airtel') data[key] = true;
  }

  if (await isValid(data)) {
    await createCode(data);
    e.target.reset();
  } else {
    alert(
      'Ntabwo bigenze neza!\nReba niba kode ushaka kongeramo idasanzwemo!\nCyangwa niba ibisabwa byose wabyujuje!'
    );
  }
}

function parseFormData(entries) {
  return Object.fromEntries(entries);
}

async function isValid(data) {
  if (data.title === '' || data.code === '') return false;

  const codes = (await getAllCodes()).documents;
  const codeExists = codes.find((code) => code.code === data.code);

  if (codeExists) return false;

  return true;
}
