import { createMachine, assign } from 'xstate'
import { Player, NumberOfPlayers } from './types/game'
import { createResearchBoard, generateCards, initializePlayers } from './utils'
import { Events } from './types/events'
import { Context } from './types/context'

const allPlayersPlayed = (context: Context) => context.turnOrder.length === 0

export const createCatInTheBoxMachine = (playerNames: string[]) => {
  const numOfPlayers = playerNames.length as NumberOfPlayers

  if (numOfPlayers < 3) {
    throw new Error('Game can only be played with 3-5 players')
  }

  const players = initializePlayers(playerNames)
  const cards = generateCards(numOfPlayers)

  const machine = createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAXAkgOwCoAswAhAewA8A6AJxIFdsIKAHKsJ1KjASxOwAV8qWGADEfAEoBRACKYAwrkwB5AHIBlAPoBZAILTJAbQAMAXUSgmJWF3Q9s5kGUQA2AByuKRgMwBWH0YBOAHZnH1cAJnCARgAaEABPRB9IiiifXwAWcKDwgIzQoIBfQri0LDxCUkoaekYWNg5uXgEhUWMzJBBLa1teBycEKOcMzwCfZwCojK8gqecgjLjEhB80zyyjUK8M1wyor1di0owcAmJyajoGZlZ2Tl7+QWFqMABbEgA3MDUubCgAGzAcg4EBEUi0SgAapINJgVJhFDoADIaOQ6cTSdoObo2Oz9RBRKJBTxGUlk8mkrxLRBecJGCj+XxeLxGSLOLxpI4gMqnSoXGrXdBULjIADWLWesHQHHQfH+qHiYCouFoVGwYiROgAmjJUejMaZsVZcX1OgNaQEKOEwj4AkYppMAgFwtTBlE6RRQtEjMkWW4AlyeRVztUrowhSLxU8wBQSOhCFQ5QqlbAVWqNdrdWiMVjOjiHviECEvFb8lFXD5pmFrVSEgT3fSvVEfeE-a4AyVuSdg1VLrUKBGxRKY2APqh-rQMGBcMKxSJcOJ5ABpDSSSHIgCqOlwMlzFmNBbNiGLpec5crvgi6VdTpGOz8ITp3nZHeO5TOvYF4dnUdaFFH46Tug04-mI6J6EoAAaGhKHIcgbuIUgGh0+49HiR6DOEGT0hyGQBG4QSuL4RiuK6zY+MS94soE2RuN4gbdh+-JhgOP7Dv+Y4TlOM6RiIyIotm0iaHwmo6shRpoaaoADO62EULh+GuIRxGkXWCBOs4qTJFh4SuPM3g+gx758qG-awMgJDCn8w4iGochKFImhoki8Gaju4l5ge6HSQSswlkEYw5HsuRTPaZGkj4VqEvkuS7O4SlGbyIZ9tc2BgGQ6DiGGIiamouAaOISgbio0gaCJmYeahJr2BhdJZBQRHOPMF52gsPhkdMJZ4c4uRlhkYQLMUnbYCQEBwA4QZMQMVWHj5CAALSVq680BF1SlEba7gsltiU9sxtQSdVhbRB1kXJIRyTnv6hydpNJkpXUtyNA8w6HbNjguJaFLfZSrqtiW9oUVMwMFLtU0PTcDT3HY7GsO8Xw-H8gLAlQEBvd5H2DEEJa7IEFZ2qtuTzK6GT9Z6ekLPkwWhD4YP3V+kN3E0jx-vUEAirK0bo1JmMZEE9J2lE+FGDkzJ0qpyyrOEnpZHsoU9UMGR08lDODr+wjczVc0TDemwUE6QRBBRHKre2tO3Yx9MsWr7FSjKSaKsqqpa10Xk8zJRLhay8lNU6RG6X6UTK5+1tsdGsbxkqDspmmLv5hjAyVjhtrpERzK2qTZHulEqTYcEXitdMYzB-tgph3+AFccBPFiprhbNkSWnY2eOxEskixqc2RgjHpEwBP7RGbEHFvGSrLHmZZvxQK9nmSS7Mm+la7b5N3qybBRXuRfz3gck1QwF14Jemal6WZWGdcYUpHXMvrFb7yFzIVkf-4MEoABmADiqCvGAF9zRvndsYjG2N4aYDYshESGoUIAA */
      schema: {
        context: {} as Context,
        events: {} as Events,
      },
      predictableActionArguments: true,
      tsTypes: {} as import('./machine.typegen').Typegen0,
      id: 'catInTheBox',
      initial: 'round',
      context: {
        players,
        turnOrder: players,
        researchBoard: createResearchBoard(numOfPlayers),
        currentRound: 0,
      },
      states: {
        round: {
          initial: 'preparationPhase',
          states: {
            preparationPhase: {
              initial: 'removeSingleCardStep',

              states: {
                removeSingleCardStep: {
                  always: [
                    {
                      target: 'predictionStep',
                      cond: 'allPlayersRemovedOneCard',
                    },
                  ],
                  on: {
                    REMOVE_INITIAL_CARD: {
                      target: 'removeSingleCardStep',
                      actions: 'removeSingleCardFromPlayerHand',
                    },
                  },
                },
                predictionStep: {},
              },
              on: {
                PREDICTIONS_MADE: 'trickPhase',
              },
            },
            trickPhase: {
              initial: 'startPlayerTurn',
              states: {
                startPlayerTurn: {
                  on: {
                    PLAYED_CARD: 'otherPlayersTurn',
                    // Other actions
                  },
                },
                otherPlayersTurn: {
                  on: {
                    PLAYED_CARD: 'evaluateTrick',
                    // Other actions
                  },
                },
                evaluateTrick: {
                  on: {
                    TRICK_EVALUATED: 'startPlayerTurn',
                    PARADOX_OCCURRED: '#catInTheBox.round.scoringPhase',
                    ALL_CARDS_PLAYED: '#catInTheBox.round.scoringPhase',
                    // Other actions
                  },
                },
              },
            },
            scoringPhase: {
              on: {
                SCORES_CALCULATED: 'nextRound',
                // Other actions
              },
            },
            nextRound: {
              on: {
                // Other actions
                LAST_ROUND_PLAYED: '#catInTheBox.endOfGame',
              },
            },
          },
        },
        endOfGame: {
          type: 'final',
          // Determine the winner and finalize the game
        },
      },
    },
    {
      actions: {
        removeSingleCardFromPlayerHand: assign({
          players(context, event) {
            const player = context.turnOrder[0]
            return context.players.map(p => {
              if (p.id === player.id) {
                const index = p.handOfCards.indexOf(event.card)
                return {
                  ...p,
                  handOfCards: p.handOfCards.filter((_, i) => i !== index),
                }
              }

              return p
            })
          },
          turnOrder(context, event) {
            const order = [...context.turnOrder]
            order.splice(0, 1)
            return order
          },
        }),
      },
      guards: {
        allPlayersRemovedOneCard(context) {
          const maxCardsInHand = context.players.length === 5 ? 8 : 9
          const isTrue =
            context.players.every(player => player.handOfCards.length === maxCardsInHand) &&
            allPlayersPlayed(context)
          return isTrue
        },
      },
    }
  )

  return machine
}
