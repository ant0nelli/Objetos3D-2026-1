import { getModel } from './utils/ModelManager.js';
import { Viewer3D } from './utils/Viewer3D.js';

const viewer = new Viewer3D('modal-canvas-container');
const modal = document.getElementById('modal');
const loading = document.getElementById('modal-loading');

// Lista de modelos. 
const models = [
  { 
    name: 'Arma', 
    url: '/models/armaOtimizado2.glb',
    img: '/public/models/Arma.png' 
  },
  { 
    name: 'Balaio', 
    url: '/models/balaioOtimizado2.glb',
    img: '/public/models/Balaio.png' 
  },
  { name: 'Barro', url: '/models/barroOtimizado2.glb' },
  { name: 'Bule', url: '/models/buleOtimizado2.glb' },
  { name: 'Cadeira', url: '/models/cadeiraOtimizado2.glb' },
  { name: 'Caixa Registradora', url: '/models/caixaRegistradoraOtimizado2.glb' },
  { name: 'Canoa', url: '/models/canoaOtimizado2.glb' },
  { name: 'Carranca', url: '/models/carrancaOtimizado2.glb' },
  { name: 'Chaleira', url: '/models/chaleiraOtimizado2.glb' },
  { name: 'Chapéu', url: '/models/chapeuOtimizado2.glb' },
  { name: 'Charrete', url: '/models/charreteOtimizado2.glb' },
  { name: 'Coador de Café', url: '/models/coadorCafeOtimizado.glb' },
  { name: 'Cocar Indígena', url: '/models/cocarIndigenaOtimizado.glb' },
  { name: 'Crânio de Onça Otimizado', url: '/models/cranioOncaOtimizado.glb' },
  { name: 'Digitalizadora Otimizada', url: '/models/digitalizadoraOtimizado.glb' },
  { name: 'Espírito Santo Otimizado', url: '/models/espiritoSantoOtimizado.glb' },
  { name: 'Ferro Otimizado', url: '/models/ferroOtimizado.glb' },
  { name: 'Incenso Otimizado', url: '/models/incensoOtimizado.glb' },
  { name: 'Jarro de Barro Otimizado', url: '/models/jarroBarroOtimizado.glb' },
  { name: 'Jarro de Metal Otimizado', url: '/models/jarroMetalOtimizado.glb' },
  { name: 'Lampião Otimizado', url: '/models/lampiaoOtimizado.glb' },
  { name: 'Máquina de Costura Otimizada', url: '/models/maquinaCosturaOtimizado.glb' },
  { name: 'Máquina de Vídeo Otimizada', url: '/models/maquinaVideoOtimizado.glb' },
  { name: 'Máscara de Homem Otimizada', url: '/models/mascaraHomemOtimizado.glb' },
  { name: 'Máscara de Macaco Otimizada', url: '/models/mascaraMacacoOtimizado.glb' },
  { name: 'Mesa e Cadeira Otimizadas', url: '/models/mesaCadeiraOtimizado.glb' },
  { name: 'Pilão Otimizado', url: '/models/pilaoOtimizado.glb' },
  { name: 'Telefone de Mesa Otimizado', url: '/models/telefoneMesaOtimizado.glb' },
  { name: 'Telefone de Parede Otimizado', url: '/models/telefoneParedeOtimizado.glb' },
  { name: 'Tigre Otimizado', url: '/models/tigreOtimizado.glb' },
  { name: 'Vela de Mesa Otimizada', url: '/models/velaMesaOtimizado.glb' },
  { name: 'Xícara Otimizada', url: '/models/xicaraOtimizado.glb' },
  { name: 'Arma', url: '/models/originais/arma.glb' },
  { name: 'Balaio', url: '/models/originais/balaio.glb' },
  { name: 'Barro', url: '/models/originais/barro.glb' },
  { name: 'Bule', url: '/models/originais/bule.glb' },
  { name: 'Cadeira', url: '/models/originais/cadeira.glb' },
  { name: 'Caixa Registradora', url: '/models/originais/caixa_registrado.glb' },
  { name: 'Canoa', url: '/models/originais/canoa.glb' },
  { name: 'Carranca', url: '/models/originais/carranca.glb' },
  { name: 'Chaleira', url: '/models/originais/chaleira.glb' },
  { name: 'Chapéu', url: '/models/originais/chapeu.glb' },
  { name: 'Charrete', url: '/models/originais/charrete.glb' },
  { name: 'Coador de Café', url: '/models/originais/coador_cafe.glb' },
  { name: 'Cocar Indígena', url: '/models/originais/cocar_ind.glb' },
  { name: 'Crânio de Onça', url: '/models/originais/cranio_onca.glb' },
  { name: 'Digitalizadora', url: '/models/originais/digitalizadora.glb' },
  { name: 'Espírito Santo', url: '/models/originais/espiritoSanto.glb' },
  { name: 'Ferro', url: '/models/originais/ferro.glb' },
  { name: 'Incenso', url: '/models/originais/incenso.glb' },
  { name: 'Jarro de Barro', url: '/models/originais/jarroBarro.glb' },
  { name: 'Jarro de Metal', url: '/models/originais/jarroMetal.glb' },
  { name: 'Lampião', url: '/models/originais/lampiao.glb' },
  { name: 'Máquina de Costura', url: '/models/originais/maquina_costura.glb' },
  { name: 'Máquina de Vídeo', url: '/models/originais/maquina_video.glb' },
  { name: 'Máscara de Homem', url: '/models/originais/mascara_homem.glb' },
  { name: 'Máscara de Macaco', url: '/models/originais/mascara_macaco.glb' },
  { name: 'Mesa e Cadeira', url: '/models/originais/mesa_cadeira.glb' },
  { name: 'Pilão', url: '/models/originais/pilao.glb' },
  { name: 'Telefone de Mesa', url: '/models/originais/telefone_mesa.glb' },
  { name: 'Telefone de Parede', url: '/models/originais/telefone_parede.glb' },
  { name: 'Tigre', url: '/models/originais/tigre.glb' },
  { name: 'Vela de Mesa', url: '/models/originais/vela_mesa.glb' },
  { name: 'Xícara', url: '/models/originais/xicara.glb' }
];

const gallery = document.getElementById('gallery');

models.forEach(model => {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Verifica: se tiver a propriedade 'img', coloca a foto. Senão, põe o ícone.
    const previewContent = model.img 
        ? `<img src="${model.img}" style="width:100%; height:100%; object-fit:cover; border-radius: 12px 12px 0 0;">` 
        : `<span class="cube-icon">🏛️</span>`;

    card.innerHTML = `
        <div class="card-preview static-preview">
            ${previewContent}
        </div>
        <div class="card-title">${model.name}</div>
    `;
    
    card.onclick = () => open3D(model.url);
    gallery.appendChild(card);
});

async function open3D(url) {
    modal.classList.remove('hidden');
    loading.classList.remove('hidden');
    
    viewer.init();

    try {
        const model = await getModel(url);
        loading.classList.add('hidden');
        viewer.displayModel(model);
    } catch (e) {
        loading.innerHTML = "Erro ao carregar.";
    }
}

document.getElementById('close-btn').onclick = () => modal.classList.add('hidden');