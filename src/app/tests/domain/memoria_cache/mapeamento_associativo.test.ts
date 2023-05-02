import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import {
  CacheMapeamentoAssociativo,
  OverwritePolice
} from "../../../domain/modulos/memoria_cache/imp/CacheMapeamentoAssociativo";

describe("Cache de mapeamento associativo", function() {
  test("testando algumas coisas",()=> {
    const cache: MemoriaCache = new CacheMapeamentoAssociativo(4,4, OverwritePolice.FIFO)
  })
  test("testando qual item sai do vetor no array", () => {
    let vetor: number [] = [ 1, 2, 3, 4]
    vetor.pop()
    expect(vetor.toString()).toBe([1 ,2 ,3].toString())
  })
});
