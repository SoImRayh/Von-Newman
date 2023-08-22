import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import { MemRAM } from "../../memoria_ram/MemRAM";
import { Linha } from "./types/Linha";

export class CacheMapeamentoAssociativoPorConjunto implements MemoriaCache {
    restart: () => void;
    _total_de_hits: number;
    _total_de_misses: number;
    _total_de_buscas: number;
    linhas: Linha[];
    ram: MemRAM;
    latencias: { self: number; ram: number; };
    buscar: (address: number) => Promise<number>;
    getHitRatio: () => number;
    getMissRatio: () => number;
    salvar: (address: number, value: number) => Promise<void>;

}
