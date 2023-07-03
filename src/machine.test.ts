import { interpret } from 'xstate'
import { createCatInTheBoxMachine } from './machine'
import { Player } from './types/game'
import { nanoid } from 'nanoid'

describe('Cat in the box machine', () => {
  describe('Initial state', () => {
    describe('3 players', () => {
      const threePlayers = ['Player 1', 'Player 2', 'Player 3']

      it('should initialize game state', () => {
        const { context, initialState } = createCatInTheBoxMachine(threePlayers)
        expect(context.researchBoard.redTrack.length).toBe(6)
        expect(context.researchBoard.blueTrack.length).toBe(6)
        expect(context.researchBoard.greenTrack.length).toBe(6)
        expect(context.researchBoard.yellowTrack.length).toBe(6)
        expect(context.players.length).toBe(3)
        expect(context.turnOrder.length).toBe(3)
      })
    })

    describe('4 players', () => {
      const fourPlayers = ['Player 1', 'Player 2', 'Player 3', 'Player 4']

      it('should initialize game state', () => {
        const { context } = createCatInTheBoxMachine(fourPlayers)
        expect(context.researchBoard.redTrack.length).toBe(8)
        expect(context.researchBoard.blueTrack.length).toBe(8)
        expect(context.researchBoard.greenTrack.length).toBe(8)
        expect(context.researchBoard.yellowTrack.length).toBe(8)
        expect(context.players.length).toBe(4)
        expect(context.turnOrder.length).toBe(4)
      })
    })

    describe('5 players', () => {
      const fivePlayers = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5']

      it('should initialize game state', () => {
        const { context } = createCatInTheBoxMachine(fivePlayers)
        expect(context.researchBoard.redTrack.length).toBe(9)
        expect(context.researchBoard.blueTrack.length).toBe(9)
        expect(context.researchBoard.greenTrack.length).toBe(9)
        expect(context.researchBoard.yellowTrack.length).toBe(9)
        expect(context.players.length).toBe(5)
        expect(context.turnOrder.length).toBe(5)
      })
    })
  })

  describe('Game logic', () => {
    describe('3 players', () => {
      const threePlayers = ['Player 1', 'Player 2', 'Player 3']

      it('should play preparation phase', () => {
        const machine = createCatInTheBoxMachine(threePlayers)
        const { context, initialState } = machine

        expect(initialState.value).toEqual({
          round: {
            preparationPhase: 'removeSingleCardStep',
          },
        })

        const initial = machine.transition(initialState, {
          type: 'REMOVE_INITIAL_CARD',
          card: context.turnOrder[0].handOfCards[0],
        })

        expect(initial.context.players[0].handOfCards.length).toBe(9)
        expect(initial.context.turnOrder.length).toBe(2)

        const second = machine.transition(initial, {
          type: 'REMOVE_INITIAL_CARD',
          card: initial.context.turnOrder[0].handOfCards[0],
        })

        const final = machine.transition(second, {
          type: 'REMOVE_INITIAL_CARD',
          card: second.context.turnOrder[0].handOfCards[0],
        })

        expect(final.context.turnOrder.length).toBe(0)
        expect(final.value).toEqual({
          round: {
            preparationPhase: 'predictionStep',
          },
        })
        console.log(final)
      })
    })
  })
})
