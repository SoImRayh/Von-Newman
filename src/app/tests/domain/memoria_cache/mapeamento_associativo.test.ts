import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import {
  CacheMapeamentoAssociativo,
  OverwritePolice
} from "../../../domain/modulos/memoria_cache/imp/CacheMapeamentoAssociativo";

describe("Cache de mapeamento associativo", function() {
  test("testando algumas coisas",()=> {
    const cache: MemoriaCache = new CacheMapeamentoAssociativo(4,4, OverwritePolice.FIFO)
  })
  test(
    `testando se o objeto fruto de um find no
    array persiste alteração no objeto inicial`, () =>{
      const obj_array = [ {num: 1}, {num: 2}, {num: 3}]
      const item = obj_array.find(item => item.num ==1)
      if (item){
        item.num = 9
      }
      expect(obj_array[0].num).toBe(9)
    })
});
