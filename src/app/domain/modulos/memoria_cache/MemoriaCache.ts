
export interface MemoriaCache {

  buscar: (adress: number) => Promise<number>

  getHitRatio: () => number

  getMissRatio: () => number

  //apenas para fins de teste

  salvar: (adress: number, value: number) => void
}
