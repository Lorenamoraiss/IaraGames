const games = [
  {
    id: 1,
    nome: "Super Mombo Quest",
    categoria: ["aventura"],
    popularidade: 4502,
    gratuito: false,
    precoOriginal: 180.90,
    precoAtual: 90.45,
    desconto: 50,
    element: null // será preenchido dinamicamente
  },
  {
    id: 2,
    nome: "Bem feito!",
    categoria: ["aventura"],
    popularidade: 51882,
    gratuito: true,
    precoAtual: 0,
    element: null
  },
  {
    id: 3,
    nome: "Bacuri",
    categoria: ["acao"],
    popularidade: 6269,
    gratuito: false,
    precoOriginal: 180.90,
    precoAtual: 170.90,
    desconto: 10,
    element: null
  },
  {
    id: 4,
    nome: "Unsighted",
    categoria: ["acao"],
    popularidade: 15368,
    gratuito: false,
    precoOriginal: 105.00,
    precoAtual: 41.96,
    desconto: 60,
    element: null
  },
  {
    id: 5,
    nome: "Curse of the Dead Gods",
    categoria: ["fantasia"],
    popularidade: 30944,
    gratuito: false,
    precoAtual: 104.90,
    element: null
  },
  {
    id: 6,
    nome: "Pocket Bravery",
    categoria: ["multiplayer"],
    popularidade: 10439,
    gratuito: false,
    precoAtual: 59.95,
    element: null
  },
  {
    id: 7,
    nome: "Until Dead",
    categoria: ["multiplayer", "fantasia"],
    popularidade: 10588,
    gratuito: true,
    precoAtual: 0,
    element: null
  },
  {
    id: 8,
    nome: "No place for Bravery",
    categoria: ["acao", "fantasia"],
    popularidade: 648,
    gratuito: false,
    precoOriginal: 59.90,
    precoAtual: 19.99,
    desconto: 65,
    element: null
  },
  {
    id: 9,
    nome: "Fobia",
    categoria: ["fantasia"],
    popularidade: 1439,
    gratuito: false,
    precoAtual: 159.50,
    element: null
  }
];

// Variáveis globais
let currentFilter = 'todos';
let currentSort = '';
let allGameCards = [];

// Função para inicializar o sistema
function initializeFilters() {
  // Mapear elementos HTML para os dados dos jogos
  mapGameElements();
  
  // Adicionar event listeners aos botões de filtro
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', handleFilterClick);
  });
  
  // Adicionar event listener ao select de ordenação
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', handleSortChange);
  }
  
  console.log('Sistema de filtros inicializado!');
}

// Função para mapear elementos HTML com os dados
function mapGameElements() {
  const gameCards = document.querySelectorAll('.game-card, .game-card1');
  
  gameCards.forEach((card, index) => {
    if (games[index]) {
      games[index].element = card;
    }
  });
  
  allGameCards = Array.from(gameCards);
}

// Função para lidar com cliques nos filtros
function handleFilterClick(event) {
  const button = event.target;
  const filter = button.getAttribute('data-filter');
  
  // Remover classe active de todos os botões
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Adicionar classe active ao botão clicado
  button.classList.add('active');
  
  // Atualizar filtro atual
  currentFilter = filter;
  
  // Aplicar filtros
  applyFilters();
  
  console.log(`Filtro aplicado: ${filter}`);
}

// Função para lidar com mudanças na ordenação
function handleSortChange(event) {
  currentSort = event.target.value;
  applyFilters();
  console.log(`Ordenação aplicada: ${currentSort}`);
}

// Função principal para aplicar filtros
function applyFilters() {
  let filteredGames = [...games];
  
  // Aplicar filtro de categoria
  if (currentFilter !== 'todos') {
    filteredGames = filteredGames.filter(game => {
      return game.categoria.includes(currentFilter);
    });
  }
  
  // Aplicar ordenação
  if (currentSort) {
    filteredGames = sortGames(filteredGames, currentSort);
  }
  
  // Mostrar/esconder cards
  showFilteredGames(filteredGames);
}

// Função para ordenar jogos
function sortGames(games, sortType) {
  return games.sort((a, b) => {
    switch (sortType) {
      case 'nome':
        return a.nome.localeCompare(b.nome);
      
      case 'popularidade':
        return b.popularidade - a.popularidade;
      
      case 'gratuito':
        // Jogos gratuitos primeiro
        if (a.gratuito && !b.gratuito) return -1;
        if (!a.gratuito && b.gratuito) return 1;
        return 0;
      
      case 'preco-asc':
        const precoA = a.precoAtual || 0;
        const precoB = b.precoAtual || 0;
        // Jogos gratuitos vão para o início
        if (a.gratuito && !b.gratuito) return -1;
        if (!a.gratuito && b.gratuito) return 1;
        return precoA - precoB;
      
      case 'preco-desc':
        const precoDescA = a.precoAtual || 0;
        const precoDescB = b.precoAtual || 0;
        // Jogos pagos primeiro, ordenados por preço decrescente
        if (a.gratuito && !b.gratuito) return 1;
        if (!a.gratuito && b.gratuito) return -1;
        return precoDescB - precoDescA;
      
      default:
        return 0;
    }
  });
}

// Função para mostrar apenas os jogos filtrados
function showFilteredGames(filteredGames) {
  // Esconder todos os cards primeiro
  allGameCards.forEach(card => {
    card.style.display = 'none';
    card.parentElement.style.display = 'none'; // Esconder o col-md-4 também
  });
  
  // Mostrar apenas os cards filtrados
  filteredGames.forEach(game => {
    if (game.element) {
      game.element.style.display = 'block';
      game.element.parentElement.style.display = 'block';
    }
  });
  
  console.log(`Mostrando ${filteredGames.length} jogos`);
}

// Função para resetar filtros
function resetFilters() {
  currentFilter = 'todos';
  currentSort = '';
  
  // Resetar botões
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector('[data-filter="todos"]').classList.add('active');
  
  // Resetar select
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.value = '';
  }
  
  // Mostrar todos os jogos
  applyFilters();
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM carregado, inicializando filtros...');
  initializeFilters();
});

// Funcionalidade adicional: busca por nome (opcional)
function searchGames(searchTerm) {
  const filteredGames = games.filter(game => 
    game.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );
  showFilteredGames(filteredGames);
}

// Exportar funções para uso global (opcional)
window.gameFilters = {
  reset: resetFilters,
  search: searchGames,
  applyFilters: applyFilters
};

function applyFilters() {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const sortBy = document.getElementById('sort-select').value;
    
    // Seleciona todos os cards de jogo de todos os containers
    const allGameCards = document.querySelectorAll('.game-card, .game-card1');
    
    // Primeiro, mostra todos os cards
    allGameCards.forEach(card => {
        card.style.display = 'block';
    });
    
    // Aplica filtro de categoria
    if (activeFilter !== 'todos') {
        allGameCards.forEach(card => {
            const categories = card.dataset.category.split(',');
            if (!categories.includes(activeFilter)) {
                card.style.display = 'none';
            }
        });
    }
    
    // Aplica ordenação apenas aos cards visíveis
    const visibleCards = Array.from(allGameCards).filter(card => 
        card.style.display !== 'none'
    );
    
    if (sortBy && visibleCards.length > 0) {
        // Remove cards dos containers originais
        visibleCards.forEach(card => card.remove());
        
        // Ordena os cards
        visibleCards.sort((a, b) => {
            switch (sortBy) {
                case 'nome':
                    return a.dataset.nome.localeCompare(b.dataset.nome);
                case 'popularidade':
                    return parseInt(b.dataset.popularidade) - parseInt(a.dataset.popularidade);
                case 'gratuito':
                    const aGratuito = a.dataset.gratuito === 'true';
                    const bGratuito = b.dataset.gratuito === 'true';
                    return bGratuito - aGratuito;
                case 'preco-asc':
                    return getPrice(a) - getPrice(b);
                case 'preco-desc':
                    return getPrice(b) - getPrice(a);
                default:
                    return 0;
            }
        });
        
        // Redistribui os cards ordenados no primeiro container
        const firstContainer = document.getElementById('game-list');
        visibleCards.forEach(card => {
            firstContainer.appendChild(card);
        });
        
        // Limpa os outros containers
        document.getElementById('game-list2').innerHTML = '';
        document.getElementById('game-list3').innerHTML = '';
    }
}