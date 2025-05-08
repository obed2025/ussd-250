import { getAllCodes } from './global/appwrite.js';

document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
  const codesEl = document.getElementById('codes');
  const codes = (await getAllCodes()).documents;
  codesEl.innerHTML = '';

  for (const codeData of codes) displayCode(codesEl, codeData);
}

function displayCode(codesEl, { code, title, description, MTN, Airtel }) {
  const li = document.createElement('li');
  li.className = 'codes__list-item';

  li.innerHTML = `
      <a href="tel:${code.replace('#', '%23')}"><h2>${code}</h2></a>
      <h4>${title}</h4>
      ${description ? `<p>${description}</p>` : ''}
      <ul class="networks">
        ${MTN ? '<li class="networks__item networks__item--mtn"></li>' : ''}
        ${
          Airtel
            ? '<li class="networks__item networks__item--airtel"></li>'
            : ''
        }
      </ul>
    `;

  codesEl.appendChild(li);
}
