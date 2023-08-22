import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import {
  CacheMapeamentoAssociativo,
  OverwritePolice
} from "../../../domain/modulos/memoria_cache/imp/CacheMapeamentoAssociativo";

describe("Cache de mapeamento associativo", function() {


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

  test(`testando salvar e buscar o valor da cache`, () => {
    const cache: MemoriaCache = new CacheMapeamentoAssociativo(4,4, OverwritePolice.FIFO, {self: 100, ram: 1000}, 512)
    cache.salvar(2, 15)
    cache.buscar(2).then( val => {
      expect(val).toBe(15)
    })
  })

  test('testando algoritmo de sobreescrita FIFO', () => {
    const cache: MemoriaCache = new CacheMapeamentoAssociativo(4,4,OverwritePolice.FIFO, {self: 100, ram: 1000}, 512)

    for (let i = 0; i < 16; i++) {
      cache.salvar(i, i*2)
    }


  })
});
