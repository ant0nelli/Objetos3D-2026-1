import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const modelCache = new Map();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

export function preloadModel(url) {
  if (!modelCache.has(url)) {
    console.log(` Preload iniciado silenciosamente: ${url}`);
    
    //Criando a Promise manualmente usando o loader tradicional
    const promiseDoCarregamento = new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          console.log(` Modelo carregado na memória: ${url}`);
          resolve(gltf.scene); // Avisa o await que pode mostrar o modelo
        },
        (xhr) => {
          // Mostra a porcentagem no console
          const percent = (xhr.loaded / xhr.total) * 100;
          console.log(`Baixando ${url}: ${percent.toFixed(0)}%`);
        },
        (error) => {
          console.error(` Erro ao carregar modelo ${url}:`, error);
          modelCache.delete(url); // Tira do cache se der erro para permitir nova tentativa
          reject(error);
        }
      );
    });

    // Guarda a PROMISE no cache, e não o modelo pronto
    modelCache.set(url, promiseDoCarregamento);
  }
}

export async function getModel(url) {
  if (!modelCache.has(url)) {
    preloadModel(url);
  }
  
  // Se estiver baixando, ele pausa aqui e espera. Se já baixou, passa direto.
  const scene = await modelCache.get(url);
  return scene; 
}