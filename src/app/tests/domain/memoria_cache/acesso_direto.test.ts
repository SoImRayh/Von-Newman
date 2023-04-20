import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import { CacheAcessoDireto } from "../../../domain/modulos/memoria_cache/imp/CacheAcessoDireto";

describe("memoria cache de Acesso Direto", function() {

  const cache : MemoriaCache = new CacheAcessoDireto({size: 120})


  test('buscar', async () => {
    cache.salvar(21, 10)
    cache.buscar(21).then( data => {
      expect(data).toBe(10);
      expect(cache.getHitRatio()).toBe(1)
      expect(cache.getMissRatio()).toBe(1)
    })
  })
});
