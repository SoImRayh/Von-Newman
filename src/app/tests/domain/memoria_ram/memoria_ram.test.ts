import { MemRAM } from "../../../domain/modulos/memoria_ram/MemRAM";

describe("Testando funçoes de implementação da RAM", function() {
  const ram : MemRAM = new MemRAM(64)
  test("testando persistencia do bloco", () => {
    const bloco = [255,255,255,255]
    ram.persistir(0, bloco)

    expect(ram.buscar(0)).toBe(255)
    expect(ram.buscar(1)).toBe(255)
    expect(ram.buscar(2)).toBe(255)
    expect(ram.buscar(3)).toBe(255)
  })


  test("testando a busca do bloco", () => {
    const bloco = [255,255,255,255]

    ram.persistir(0, bloco)

    expect(ram.buscar_bloco(0, 4)).toStrictEqual([255,255,255,255])
  })
});