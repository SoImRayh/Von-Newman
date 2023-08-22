import { Linha } from "@/app/domain/modulos/memoria_cache/imp/types/Linha";
import { MemRAM } from "@/app/domain/modulos/memoria_ram/MemRAM";

export interface MemoriaCache {

    _total_de_hits: number;
    _total_de_misses: number;
    _total_de_buscas: number;
    linhas: Linha[]
    ram: MemRAM
    latencias: {
        self: number,
        ram: number
    }

  buscar: (address: number) => Promise<number>
  salvar: (address: number, value: number) => Promise<void>
  restart: () => void

}
