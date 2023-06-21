import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import { CacheTypes } from "@/app/domain/modulos/memoria_cache/CacheTypes";
import { CacheMapeamentoDireto } from "@/app/domain/modulos/memoria_cache/imp/CacheMapeamentoDireto";
import { VmProps } from "@/app/domain/modulos/processador/ProcessadorProps";
import { CacheMapeamentoAssociativo } from "@/app/domain/modulos/memoria_cache/imp/CacheMapeamentoAssociativo";
import {
    CacheMapeamentoAssociativoPorConjunto
} from "@/app/domain/modulos/memoria_cache/imp/CacheMapeamentoAssociativoPorConjunto";



export const CacheBuilder = {
    createCache(props: VmProps ) : MemoriaCache {
        let cache: MemoriaCache;

        switch (props.cacheType) {
            case CacheTypes.MAPEAMENTO_DIRETO:{
                cache = new CacheMapeamentoDireto()
                break
            }
            case CacheTypes.MAPEAMENTO_ASSOCIATIVO:{
                cache =  new CacheMapeamentoAssociativo(
                    props._qtd_linhas,
                    props._tam_bloco,
                    props.cacheOverride,
                    {self: props.tempo_cache, ram: props.tempo_ram},
                    props.ram_bytesize)
                break
            }
            case CacheTypes.MAPEAMENTO_ASSOCIATIVO_POR_CONJUNTO:{
                cache = new CacheMapeamentoAssociativoPorConjunto()
                break
            }
        }
        return cache;
    }
}
