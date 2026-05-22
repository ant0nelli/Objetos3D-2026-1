import { getModel } from './utils/ModelManager.js';
import { Viewer3D } from './utils/Viewer3D.js';

const viewer = new Viewer3D('modal-canvas-container');
const modal = document.getElementById('modal');
const loading = document.getElementById('modal-loading');

// Lista de modelos. 
const models = [
    { name: 'Arma', url: '/models/armaOtimizado2.glb', img: '/public/img/arma.webp' },
    { name: 'Balaio', url: '/models/balaioOtimizado2.glb', img: '/public/img/balaio.webp'},
    { name: 'Barro', url: '/models/barroOtimizado2.glb', img: '/public/img/barro.webp' },
    { name: 'Bule', url: '/models/buleOtimizado2.glb', img: '/public/img/bule.webp' },
    { name: 'Cadeira', url: '/models/cadeiraOtimizado2.glb', img: '/public/img/cadeira.webp' },
    { name: 'Caixa Registradora', url: '/models/caixaRegistradoraOtimizado2.glb', img: '/public/img/caixaRegistradora.webp' },
    { name: 'Canoa', url: '/models/canoaOtimizado2.glb', img: '/public/img/canoa.webp' },
    { name: 'Carranca', url: '/models/carrancaOtimizado2.glb', img: '/public/img/carranca.webp' },
    { name: 'Chaleira', url: '/models/chaleiraOtimizado2.glb', img: '/public/img/chaleira.webp' },
    { name: 'Chapéu', url: '/models/chapeuOtimizado2.glb', img: '/public/img/chapeu.webp' },
    { name: 'Charrete', url: '/models/charreteOtimizado2.glb', img: '/public/img/charrete.webp' },
    { name: 'Coador de Café', url: '/models/coadorCafeOtimizado.glb', img: '/public/img/coadorCafe.webp' },
    { name: 'Cocar Indígena', url: '/models/cocarIndigenaOtimizado.glb', img: '/public/img/cocarIndigena.webp' },
    { name: 'Crânio de Onça', url: '/models/cranioOncaOtimizado.glb', img: '/public/img/cranioOnca.webp' },
    { name: 'Digitalizadora', url: '/models/digitalizadoraOtimizado.glb', img: '/public/img/digitalizadora.webp' },
    { name: 'Espírito Santo', url: '/models/espiritoSantoOtimizado.glb', img: '/public/img/espiritoSanto.webp' },
    { name: 'Ferro', url: '/models/ferroOtimizado.glb', img: '/public/img/ferro.webp' },
    { name: 'Incenso', url: '/models/incensoOtimizado.glb', img: '/public/img/incenso.webp' },
    { name: 'Jarro de Barro', url: '/models/jarroBarroOtimizado.glb', img: '/public/img/jarroBarro.webp' },
    { name: 'Jarro de Metal', url: '/models/jarroMetalOtimizado.glb', img: '/public/img/jarroMetal.webp' },
    { name: 'Lampião', url: '/models/lampiaoOtimizado.glb', img: '/public/img/lampiao.webp' },
    { name: 'Máquina de Costura', url: '/models/maquinaCosturaOtimizado.glb', img: '/public/img/maquinaCostura.webp' },
    { name: 'Máquina de Vídeo', url: '/models/maquinaVideoOtimizado.glb', img: '/public/img/maquinaVideo.webp' },
    { name: 'Máscara de Homem', url: '/models/mascaraHomemOtimizado.glb', img: '/public/img/mascaraHomem.webp' },
    { name: 'Máscara de Macaco', url: '/models/mascaraMacacoOtimizado.glb', img: '/public/img/mascaraMacaco.webp' },
    { name: 'Mesa e Cadeira', url: '/models/mesaCadeiraOtimizado.glb', img: '/public/img/mesaCadeira.webp' },
    { name: 'Pilão', url: '/models/pilaoOtimizado.glb', img: '/public/img/pilao.webp' },
    { name: 'Telefone de Mesa', url: '/models/telefoneMesaOtimizado.glb', img: '/public/img/telefoneMesa.webp' },
    { name: 'Telefone de Parede', url: '/models/telefoneParedeOtimizado.glb', img: '/public/img/telefoneParede.webp' },
    { name: 'Tigre', url: '/models/tigreOtimizado.glb', img: '/public/img/tigre.webp' },
    { name: 'Vela de Mesa', url: '/models/velaMesaOtimizado.glb', img: '/public/img/velaMesa.webp' },
    { name: 'Xícara', url: '/models/xicaraOtimizado.glb', img: '/public/img/xicara.webp' }

];

const gallery = document.getElementById('gallery');

models.forEach(model => {
    const card = document.createElement('div');
    card.className = 'card';

    // Verifica: se tiver a propriedade 'img', coloca a foto. Senão, põe o ícone.
    const previewContent = model.img
        ? `<img src="${model.img}" style="width:100%; height:100%; object-fit:contain; border-radius: 12px 12px 0 0;">`
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