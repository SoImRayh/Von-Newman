import { Linha } from "@/app/domain/modulos/memoria_cache/imp/types/Linha";
import { MemRAM } from "@/app/domain/modulos/memoria_ram/MemRAM";

export interface MemoriaCache {

  linhas: Linha[]
  ram: MemRAM

  buscar: (address: number) => Promise<number>

  getHitRatio: () => number

  getMissRatio: () => number

  //apenas para fins de teste
  salvar: (address: number, value: number) => void
}
