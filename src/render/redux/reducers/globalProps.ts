import { createSlice } from "@reduxjs/toolkit";
import { CacheTypes } from "@/app/domain/modulos/memoria_cache/CacheTypes";
import { OverwritePolice } from "@/app/domain/modulos/memoria_cache/imp/CacheMapeamentoAssociativo";

export const globalProps = createSlice({
    name: 'globalProps',
    initialState: {
        _qtd_linhas: 4,
        _tam_bloco: 4,
        tempo_cache: 100,
        cacheType: CacheTypes.MAPEAMENTO_ASSOCIATIVO,
        cacheOverride: OverwritePolice.FIFO,
        ram_bytesize: 512,
        tempo_ram: 1000,

    },
    reducers: {
        setProps: (state, action) => {
            const {
                ram_bytesize,
                tempo_ram,
                tempo_cache,
                cacheType,
                _qtd_linhas,
                _tam_bloco
            } = action.payload
            state.tempo_cache = tempo_cache
            state.cacheType = cacheType
            state._qtd_linhas = _qtd_linhas
            state._tam_bloco = _tam_bloco
            state.tempo_ram = tempo_ram
            state.ram_bytesize = ram_bytesize
        }
    }
})

export const { setProps} = globalProps.actions
export default globalProps.reducer
