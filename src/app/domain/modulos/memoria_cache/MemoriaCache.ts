import { Linha } from "@/app/domain/modulos/memoria_cache/imp/types/Linha";

export interface MemoriaCache {

  linhas: Linha[]

  buscar: (address: number) => Promise<number>

  getHitRatio: () => number

  getMissRatio: () => number

  //apenas para fins de teste
  salvar: (address: number, value: number) => void
}
