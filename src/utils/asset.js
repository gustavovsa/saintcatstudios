// Monta o endereço de um arquivo de public/ respeitando a base do site
// (no GitHub Pages o site fica em /saintcatstudios/, não na raiz)
export function asset(path) {
  if (!path) return path;
  return encodeURI(import.meta.env.BASE_URL + path.replace(/^\//, ""));
}
