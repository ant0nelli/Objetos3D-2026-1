import { preloadModel, getModel } from './utils/ModelManager.js';
import { Viewer3D } from './utils/Viewer3D.js';

// Inicializa a classe do motor 3D
const viewer = new Viewer3D('modal-canvas-container');

// Variáveis de controle
let currentUrl = null;
let isLoading3D = false; 

// Elementos do DOM
const gallery = document.getElementById('acervo-gallery');
const modal = document.getElementById('modal');
const sectionInfo = document.getElementById('section-info');
const section3d = document.getElementById('section-3d');
const activate3dBtn = document.getElementById('activate-3d-btn');
const loading = document.getElementById('modal-loading');

// Dados de teste
const items = [
  { 
    name: 'Arma', 
    url: '/models/armaOtimizado2.glb',
    img: '/public/models/Arma.png',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet tellus at velit tempus posuere id quis turpis. Donec accumsan nulla nibh. Proin fringilla elementum odio. Praesent nec sollicitudin nibh. Duis vel urna mollis, ultrices nibh nec, pulvinar sapien. Suspendisse lacinia, dolor ut ultricies consectetur, ipsum mi venenatis tellus, in fringilla elit ex a est. Quisque vel mollis massa, sit amet consectetur dolor. Aliquam interdum quam est, quis pharetra tortor tincidunt a. Nam commodo dapibus ante, id vulputate tellus maximus at. Nullam ipsum enim, hendrerit placerat magna sit amet, accumsan tincidunt justo. Nunc quis velit quis lectus dictum tristique. Nulla feugiat malesuada metus, eget aliquet nisl iaculis at. Maecenas nec tempus odio.'
  },
  { 
    name: 'Balaio', 
    url: '/models/balaioOtimizado2.glb',
    img: '/public/models/Balaio.png',
    desc: 'Utensílio utilizado para transporte de mantimentos...'
  }
];

// 1. Renderizar cards do acervo na tela
items.forEach(item => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-preview"><img src="${item.img}" style="width:100%; height:100%; object-fit:cover;"></div>
    <div class="card-title">${item.name}</div>
  `;
  card.onclick = () => openAcervoModal(item);
  gallery.appendChild(card);
});

// 2. Abrir o Popup com a Foto/Texto e INICIAR O PRELOAD SILENCIOSO
function openAcervoModal(item) {
  // Guarda a URL atual para o botão 3D saber o que buscar depois
  currentUrl = item.url;

  // Reseta o estado do modal para mostrar apenas a aba de info
  sectionInfo.classList.remove('hidden');
  section3d.classList.add('hidden');
  modal.classList.remove('hidden');

  // Preenche os dados textuais do objeto
  document.getElementById('item-title').innerText = item.name;
  document.getElementById('item-description').innerText = item.desc;
  document.getElementById('item-img').src = item.img;

  // Dispara o carregamento em background!
  // Chama a sua função do ModelManager para baixar sem travar a tela.
  if (item.url) {
        activate3dBtn.style.display = 'block'; 
        preloadModel(item.url);
    } else {
        activate3dBtn.style.display = 'none'; 
    }
  
  preloadModel(item.url);
}

// 3. O Clique no Botão "Visualizar em 3D"
activate3dBtn.onclick = async () => {
    // Trava Anti-Ansiedade: Se já estiver processando, ignora novos cliques
    if (isLoading3D) return; 
    
    isLoading3D = true;
    
    // Troca as telas dentro do modal (esconde info, mostra canvas)
    sectionInfo.classList.add('hidden');
    section3d.classList.remove('hidden');
    loading.classList.remove('hidden'); // Mostra a ampulheta/spinner

    // Liga as luzes e prepara a cena 3D (se for a primeira vez que clica)
    viewer.init();
    
    try {
        // Pede o modelo pro Manager. 
        // Se o preload já acabou, aparece instantaneamente. 
        // Se não, aguarda na tela de loading até o Manager devolver.
        const model = await getModel(currentUrl); 
        
        loading.classList.add('hidden'); // Esconde o spinner
        viewer.displayModel(model); // Pede pro viewer mostrar o modelo centralizado

    } catch (e) {
        loading.innerHTML = "<p style='color:red; font-weight:bold;'> Erro ao carregar o modelo.</p>";
        console.error(e);
    } finally {
        // Libera o botão independente de ter dado certo ou erro
        isLoading3D = false; 
    }
};

// 4. Fechar e limpar
document.getElementById('close-btn').onclick = () => modal.classList.add('hidden');
