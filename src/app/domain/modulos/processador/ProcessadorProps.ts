import { CacheTypes } from "@/app/domain/modulos/memoria_cache/CacheTypes";
import { OverwritePolice } from "@/app/domain/modulos/memoria_cache/imp/CacheMapeamentoAssociativo";

export interface VmProps {

    _qtd_linhas: number,
    _tam_bloco: number,
    cacheType: CacheTypes,
    cacheOverride: OverwritePolice
    tempo_cache: number,

    ram_bytesize : number,
    tempo_ram: number,

}
