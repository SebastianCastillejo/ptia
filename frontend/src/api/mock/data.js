// Datos de ejemplo del prototipo de interfaz. En el backend real esto vive en
// SQLite (recetas) y en el grafo de ingredientes (sinónimos y sustitutos).

export const RECETAS = [
  { id: 'arroz-con-pollo', nombre: 'Arroz con pollo', tiempoMin: 40, principales: ['arroz', 'pollo', 'cebolla larga', 'tomate', 'zanahoria', 'pimentón'], basicos: ['sal', 'aceite'],
    pasos: ['Sofríe la cebolla, el tomate y el pimentón en un poco de aceite.', 'Agrega el pollo en trozos y dóralo por unos minutos.', 'Añade el arroz, la zanahoria rallada y el doble de agua; sazona con sal.', 'Cocina tapado a fuego bajo unos 20 minutos, hasta que el arroz seque.'] },
  { id: 'huevos-pericos', nombre: 'Huevos pericos', tiempoMin: 10, principales: ['huevo', 'tomate', 'cebolla larga'], basicos: ['sal', 'aceite'],
    pasos: ['Pica el tomate y la cebolla finamente.', 'Sofríelos en aceite hasta que el tomate se deshaga.', 'Agrega los huevos batidos con sal y revuelve hasta que cuajen.'] },
  { id: 'arepa-huevo-queso', nombre: 'Arepa con huevo y queso', tiempoMin: 20, principales: ['harina de maíz', 'huevo', 'queso'], basicos: ['sal', 'aceite'],
    pasos: ['Mezcla la harina con agua tibia y sal hasta formar una masa suave.', 'Arma las arepas y ásalas por ambos lados.', 'Ábrelas y rellénalas con huevo revuelto y queso.'] },
  { id: 'pasta-tomate', nombre: 'Pasta en salsa de tomate', tiempoMin: 25, principales: ['pasta', 'tomate', 'cebolla cabezona', 'ajo'], basicos: ['sal', 'aceite'],
    pasos: ['Cocina la pasta en agua con sal.', 'Sofríe ajo y cebolla, agrega el tomate picado y cocina 10 minutos.', 'Mezcla la salsa con la pasta escurrida.'] },
  { id: 'sopa-verduras', nombre: 'Sopa de verduras', tiempoMin: 35, principales: ['papa', 'zanahoria', 'cebolla larga', 'ahuyama', 'cilantro'], basicos: ['sal', 'agua'],
    pasos: ['Pon a hervir agua con la cebolla y sal.', 'Agrega papa, zanahoria y ahuyama en cubos.', 'Cocina 25 minutos y termina con cilantro picado.'] },
  { id: 'tortilla-papa', nombre: 'Tortilla de papa', tiempoMin: 30, principales: ['papa', 'huevo', 'cebolla cabezona'], basicos: ['sal', 'aceite'],
    pasos: ['Fríe la papa en rodajas finas con la cebolla a fuego medio.', 'Escurre y mezcla con los huevos batidos y sal.', 'Cuaja en la sartén por ambos lados.'] },
  { id: 'pollo-ajillo', nombre: 'Pollo al ajillo', tiempoMin: 30, principales: ['pollo', 'ajo', 'limón', 'perejil'], basicos: ['sal', 'aceite'],
    pasos: ['Sazona el pollo con sal y limón.', 'Dóralo en aceite con bastante ajo laminado.', 'Termina con perejil picado.'] },
  { id: 'patacones-hogao', nombre: 'Patacones con hogao', tiempoMin: 25, principales: ['plátano verde', 'tomate', 'cebolla larga'], basicos: ['sal', 'aceite'],
    pasos: ['Fríe el plátano en trozos, aplástalo y vuelve a freír.', 'Prepara el hogao con tomate y cebolla a fuego lento.', 'Sirve los patacones con el hogao encima.'] },
  { id: 'arroz-huevo-maduro', nombre: 'Arroz con huevo y maduro', tiempoMin: 20, principales: ['arroz', 'huevo', 'plátano maduro'], basicos: ['sal', 'aceite'],
    pasos: ['Calienta el arroz (ideal si es del día anterior).', 'Fríe el maduro en tajadas y el huevo.', 'Sirve todo junto.'] },
  { id: 'ensalada-atun', nombre: 'Ensalada de atún', tiempoMin: 10, principales: ['atún', 'lechuga', 'tomate', 'cebolla cabezona', 'limón'], basicos: ['sal', 'aceite'],
    pasos: ['Pica lechuga, tomate y cebolla.', 'Agrega el atún escurrido.', 'Aliña con limón, aceite y sal.'] },
  { id: 'lentejas-arroz', nombre: 'Lentejas con arroz', tiempoMin: 45, principales: ['lentejas', 'arroz', 'zanahoria', 'cebolla larga', 'tomate'], basicos: ['sal', 'agua'],
    pasos: ['Cocina las lentejas en agua hasta que ablanden.', 'Agrega un hogao de cebolla y tomate y la zanahoria picada.', 'Sirve con arroz blanco.'] },
];

// [ingrediente que pide la receta, ingrediente que lo reemplaza, confianza 0-1]
export const SUSTITUTOS = [
  ['cebolla larga', 'cebolla cabezona', 0.9],
  ['pimentón', 'ají', 0.7],
  ['perejil', 'cilantro', 0.8],
  ['limón', 'vinagre', 0.6],
  ['lechuga', 'repollo', 0.7],
  ['ahuyama', 'zanahoria', 0.6],
];

export const SINONIMOS = {
  'cebolla': 'cebolla cabezona', 'cebolla de huevo': 'cebolla cabezona', 'cebolla roja': 'cebolla cabezona', 'cebolla blanca': 'cebolla cabezona',
  'cebolla junca': 'cebolla larga', 'cebollin': 'cebolla larga', 'jitomate': 'tomate', 'pimiento': 'pimentón', 'zapallo': 'ahuyama', 'calabaza': 'ahuyama',
  'coriandro': 'cilantro', 'fideos': 'pasta', 'espagueti': 'pasta', 'spaghetti': 'pasta', 'harina pan': 'harina de maíz', 'platano': 'plátano verde',
  'platano verde': 'plátano verde', 'maduro': 'plátano maduro', 'platano maduro': 'plátano maduro', 'pechuga': 'pollo', 'queso campesino': 'queso',
  'atun': 'atún', 'lenteja': 'lentejas', 'papa criolla': 'papa',
};

export const BASICOS = ['sal', 'aceite', 'agua'];

export const SUGERENCIAS = ['huevo', 'papa', 'plátano verde', 'zanahoria', 'ajo', 'pasta', 'queso', 'cilantro'];
