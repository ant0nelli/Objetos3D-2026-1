# Sprint 3 — Visualização 3D e Integração com o Acervo

## Objetivos

- Classificar os modelos 3D disponíveis por estado de qualidade
- Implementar carregamento dos modelos em segundo plano na página do acervo
- Implementar cache em memória dos modelos na página de visualização 3D

---

## Classificação dos Modelos

O objetivo foi classificar os modelos já disponíveis no site por meio de uma tabela, possibilitando melhor organização e separando os modelos em bons e modelos que precisam de correção. A tabela serve como registro do estado atual do acervo.

| Objeto | Avaliação | Obs | Tem no acervo? |
|--------|-----------|-----|----------------|
| Arma | Ok | — | Sim |
| Balaio | Ok | — | Sim |
| Barro | Ok | — | Sim |
| Bule | Ok | — | Sim |
| Cadeira | Melhorar | Retirar papel do banco | Sim |
| Caixa Registradora | Melhorar | Retirar madeira de baixo | Não |
| Canoa | Melhorar | Uniformizar fundo | Não |
| Carranca | Ok | — | Sim |
| Chaleira | Melhorar | Retirar falha na alça | Sim |
| Chapéu | Ok | — | — |
| Charrete | Ok | — | — |
| Coador de Café | Ok | — | — |
| Cocar Indígena | Ok | — | — |
| Crânio de Onça | Ok | — | — |
| Máquina de Escrever | Melhorar | Retirar madeira de baixo | — |
| Espírito Santo | Ok | — | — |
| Ferro | Ok | — | — |
| Incensário | Ok | — | — |
| Jarro de Barro | Melhorar | Arrumar internamente | — |
| Jarro de Metal | Ok | — | — |
| Lampião | Ok | — | — |
| Máquina de Costura | Melhorar | Retirar madeira de baixo | — |
| Máquina de Vídeo | Ok | — | — |
| Máscara Homem | Ok | — | — |
| Máscara Macaco | Ok | — | — |
| Mesa e Cadeira | Melhorar | Retirar falha no encosto | — |
| Pilão | Ok | — | — |
| Telefone de Mesa | Melhorar | Arrumar fio | — |
| Telefone de Parede | Melhorar | Arrumar fio | — |
| Tigre | Ok | — | — |
| Vela de Mesa | Ok | — | — |
| Xícara | Melhorar | Retirar erro na alça | — |



---

## Carregamento em Segundo Plano

Ao acessar a página do acervo e abrir um objeto, é possível visualizá-lo em 3D diretamente no pop-up, sem precisar navegar até a página de modelos 3D.

O fluxo funciona assim: ao abrir o pop-up de um objeto, o download do arquivo `.glb` é disparado silenciosamente em background enquanto o usuário lê os metadados. Quando o botão "Visualizar em 3D" é clicado, o modelo já está (ou está quase) carregado, tornando a transição praticamente instantânea.

### Reestruturação de Arquivos

Como não tínhamos acesso ao código da página do acervo, foi criada uma página genérica (`acervo.html`) para testar a implementação. Isso exigiu separar melhor os arquivos do projeto:

**Antes:**
```text
/
├── node_modules/
├── public/
├── src/
│   ├── main.js
│   └── style.css
└── index.html
```
**Depois:**
```text
/
├── node_modules/
├── public/
├── src/
│   ├── utils/
│   │   ├── ModelManager.js   ← lógica de carregamento e cache
│   │   └── Viewer3D.js       ← configuração da cena Three.js
│   ├── acervo.js             ← lógica do pop-up com preload
│   ├── main.js               ← página de listagem dos modelos 3D
│   └── style.css
├── 3d-models.html
├── acervo.html
└── index.html
```

A pasta `src/utils/` agrupa os módulos reutilizados em mais de uma página:

- **`ModelManager.js`** — configura o loader GLTF com suporte a Draco (necessário para os modelos otimizados do sprint 2) e gerencia o cache em memória. Exporta `preloadModel` e `getModel`.
- **`Viewer3D.js`** — encapsula toda a configuração Three.js: cena, câmera perspectiva, iluminação (hemisférica + direcional), OrbitControls e redimensionamento responsivo. Expõe o método `displayModel`, que centraliza automaticamente qualquer modelo via `Box3`.

A lógica do carregamento em background está em `acervo.js`: ao abrir o modal, `preloadModel(url)` é chamado imediatamente. O download ocorre em segundo plano sem bloquear a UI. Ao clicar em "Visualizar em 3D", `getModel(url)` aguarda a Promise (que já pode estar resolvida) e exibe o modelo — com uma tela de loading caso o download ainda esteja em andamento.

---

## Cache dos Modelos

Na página de listagem 3D (`main.js`), ao fechar o pop-up de um modelo e reabri-lo, o download não é refeito — o modelo é recuperado do cache instantaneamente.

### Implementação

O cache é um `Map` JavaScript em `src/utils/ModelManager.js`. A chave é a URL do modelo e o valor é uma `Promise` que resolve para a cena carregada.

Esse design tem uma propriedade importante: mesmo que dois componentes peçam o mesmo modelo ao mesmo tempo, apenas um download é iniciado. O segundo `getModel` encontra a Promise já no Map e aguarda o mesmo resultado, evitando requisições duplicadas.

```js
// Guarda a Promise no cache assim que o download começa
modelCache.set(url, promiseDoCarregamento);

// Qualquer chamada posterior reaproveita a mesma Promise
const scene = await modelCache.get(url);
```

> **Nota:** este cache vive na memória RAM da aba do navegador. Ao fechar ou recarregar a página, os modelos precisam ser baixados novamente. Cache persistente entre sessões (via IndexedDB ou Service Worker) ainda não foi realizado.