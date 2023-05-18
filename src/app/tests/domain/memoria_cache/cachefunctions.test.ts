describe("testando funções implementadas no modulo de memoria cache", function () {
    test("testando calculo de tag", () => {
      const tamanho_do_campo_word: number = 2;
      const tamanho_do_campo_bloco: number = 2;

      function calcular_tag(address: number) {
        return (address >> tamanho_do_campo_word) >> tamanho_do_campo_bloco;
      }

      const address = 0b00000000000000000000000001110101;

      expect(calcular_tag(address)).toBe(0b111);
    });

    test('testando calculo do tamanho dos campos word e bloco', () => {
      function calcular_tamanho_campo_word(tam_bloco: number) {
        return Math.log2(tam_bloco)
      }

      function calcular_tamanho_campo_bloco(qtd_linhas: number) {
        return Math.log2(qtd_linhas)
      }

      expect(calcular_tamanho_campo_bloco(64)).toBe(6)
      expect(calcular_tamanho_campo_word(4)).toBe(2)
    });

    test("calculando as mascaras para os campos", () => {
      const tam_campo_bloco : number = 4
      const tam_campo_word : number = 6

      function calcular_mascara_campo_word(): number {
        let mascara : number = 1
        for (let i = 0; i < ( tam_campo_word - 1 ); i++) {
          mascara = ( mascara << 1) | 1
        }
        return mascara
      }


    function calcular_mascara_campo_bloco(): number {
        let mascara : number = 1
        for (let i = 0; i < (tam_campo_bloco - 1 ); i++) {
          mascara = (mascara << 1) | 1
        }
        mascara = mascara << tam_campo_word
        return mascara
      }
      expect(calcular_mascara_campo_word()).toBe(0b111111)
      expect(calcular_mascara_campo_bloco()).toBe(0b1111000000)
    })
  });
