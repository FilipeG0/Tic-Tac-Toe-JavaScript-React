import { useState } from 'react'
import { adicionarJogada, obterJogadasPossiveis, verificarVencedor, obterLinhas, verificarFimDoJogo } from './jogo-do-galo'

const NOVO_JOGO = {
    tabuleiro: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ],
    jogadorAtual: 'X'
}

export function JogoDoGalo() {
    const [jogo, setJogo] = useState(NOVO_JOGO)
    const reiniciaJogo = () => setJogo(NOVO_JOGO)

    const trataClique = (linha, coluna) => setJogo(j => {
        //muda o tabuleiro
        const jogoTerminado = verificarFimDoJogo(j)
        if (jogoTerminado) { return j; }
        return {
            tabuleiro: adicionarJogada(j, j.jogadorAtual, linha, coluna).tabuleiro,
            jogadorAtual: j.tabuleiro[linha][coluna] === "" ? (j.jogadorAtual == "X" ? "O" : "X") : j.jogadorAtual
        }
    })


    const jogoTerminado = verificarFimDoJogo(jogo)
    const jogadorAtual = jogo.jogadorAtual
    const vencedor = verificarVencedor(jogo)

    return (
        <div className="tudo">
            <h1 className="titulo">Jogo do Galo</h1>
            {

                !jogoTerminado && (
                    <div className="jogadorAtual">

                        <div className={"ativo " + (jogadorAtual === "O" ? "other" : "")}></div>
                        <div className={jogadorAtual === "O" ? "active" : ""}>
                            <span className={jogadorAtual === "O" ? "turn" : "next-turn"} data-testid={jogadorAtual === "O" ? "turn" : "next-turn"}>O</span>
                        </div>

                        <div className={jogadorAtual === "X" ? "active" : ""}>
                            <span className={jogadorAtual === "X" ? "turn" : "next-turn"} data-testid={jogadorAtual === "X" ? "turn" : "next-turn"}>X</span>
                        </div>
                    </div>
                )
            }
            {
                jogoTerminado && (
                    <div className="gameOver"
                        data-testid="gameover">
                        Jogo Terminado!
                    </div>
                )
            }
            {
                vencedor && (
                    <div className="vencedor">
                        Vencedor: <span data-testid="winner">{vencedor}</span>
                    </div>
                )
            }
            <br></br>
            <table className="jogo-do-galo">
                <tbody>
                    {
                        jogo.tabuleiro.map((l, i) => (
                            <tr key={i}>
                                {
                                    l.map((c, j) => (
                                        <td className="click"
                                            onClick={() => trataClique(i, j)}
                                            data-testid={`l${i}c${j}`}
                                            key={j}>
                                            {c === "_" ? "" : c}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <br></br>
            <button
                className="butRestart"
                data-testid="restart"
                onClick={reiniciaJogo}>
                Reiniciar
            </button>

        </div>
    )
}