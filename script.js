function analisarPadroes() {
  const button = document.querySelector('button');
  button.classList.add('loading');
  
  setTimeout(() => {
    const texto = document.getElementById('textInput').value;
    const results = document.getElementById('results');
    results.innerHTML = '';

    const padroes = {
      datas: {
        items: texto.match(/\d{2}\/\d{2}\/\d{4}|\d{2}\-\d{2}\-\d{4}/g) || [],
        icon: 'fa-calendar',
        class: 'pattern-type-datas'
      },
      emails: {
        items: texto.match(/[\w\.-]+@[\w\.-]+\.\w+/g) || [],
        icon: 'fa-envelope',
        class: 'pattern-type-emails'
      },
      telefones: {
        items: texto.match(/\(\d{2}\)\s*\d{4,5}\-\d{4}|\d{2}\s*\d{4,5}\-\d{4}/g) || [],
        icon: 'fa-phone',
        class: 'pattern-type-telefones'
      },
      nomes: {
        items: texto.match(/[A-Z][a-z]+ [A-Z][a-z]+/g) || [],
        icon: 'fa-user',
        class: 'pattern-type-nomes'
      },
      urls: {
        items: texto.match(/https?:\/\/[\w\-\.]+\.\w{2,5}(\/\S*)?/g) || [],
        icon: 'fa-link',
        class: 'pattern-type-urls'
      }
    };

    const totalPadroes = Object.values(padroes).reduce((acc, pattern) => acc + pattern.items.length, 0);
    
    if (totalPadroes === 0) {
      results.innerHTML = `<p>Nenhum padrão encontrado no texto fornecido.</p>`;
      button.classList.remove('loading');
      return;
    }

    for (const [key, pattern] of Object.entries(padroes)) {
      if (pattern.items.length > 0) {
        const patternGroup = document.createElement('div');
        patternGroup.classList.add('pattern-group', pattern.class);
        
        const title = document.createElement('div');
        title.classList.add('pattern-title');
        title.innerHTML = `<i class="fa ${pattern.icon}"></i> ${key.charAt(0).toUpperCase() + key.slice(1)} <span class="pattern-count">${pattern.items.length}</span>`;
        
        const itemsContainer = document.createElement('div');
        itemsContainer.classList.add('pattern-items');
        
        pattern.items.forEach(item => {
          const highlight = document.createElement('span');
          highlight.classList.add('highlight');
          highlight.textContent = item;
          itemsContainer.appendChild(highlight);
          itemsContainer.appendChild(document.createElement('br'));
        });

        patternGroup.appendChild(title);
        patternGroup.appendChild(itemsContainer);
        results.appendChild(patternGroup);
      }
    }
    button.classList.remove('loading');
  }, 300);
}

function limparTexto() {
  document.getElementById('textInput').value = '';
  document.getElementById('results').innerHTML = '';
}

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'Enter') {
    analisarPadroes();
  }
});
