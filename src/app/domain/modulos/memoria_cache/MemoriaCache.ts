
export interface MemoriaCache {

  buscar: (address: number) => Promise<number>

  getHitRatio: () => number

  getMissRatio: () => number

  //apenas para fins de teste
  salvar: (address: number, value: number) => void
}
