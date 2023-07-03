import { nanoid } from 'nanoid'
import { ResearchBoard, NumberOfPlayers, Player } from './types/game'
import shuffle from 'lodash/shuffle'

export const generateCards = (numOfPlayers: NumberOfPlayers) => {
  const values: Record<NumberOfPlayers, number[]> = {
    3: [1, 2, 3, 4, 5, 6],
    4: [1, 2, 3, 4, 5, 6, 7, 8],
    5: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  }

  const cards = values[numOfPlayers].map(number => Array(5).fill(number) as number[])

  return shuffle(cards.flatMap(number => number))
}

export const initializePlayers = (playerNames: string[]): Player[] => {
  const numOfPlayers = playerNames.length as NumberOfPlayers
  const cards = generateCards(numOfPlayers)
  const numberOfCardsInHand = cards.length / numOfPlayers
  return playerNames.map(name => ({
    name,
    id: nanoid(),
    hasRed: true,
    hasBlue: true,
    hasGreen: true,
    hasYellow: true,
    tricksToPredict: numOfPlayers === 3 ? [1, 3, 4] : [1, 2, 3],
    handOfCards: cards.splice(0, numberOfCardsInHand),
    predicted: undefined,
    isRoundStartPlayer: false,
    score: 0,
  }))
}

export const createResearchBoard = (numPlayers: NumberOfPlayers): ResearchBoard => {
  const values = (numPlayers === 3 ? Array(6) : numPlayers === 4 ? Array(8) : Array(9)) as number[]

  const tracks = [...values].map((_, i) => ({
    value: i + 1,
    hasToken: false,
  }))
  const board = {
    redTrack: [...tracks],
    blueTrack: [...tracks],
    greenTrack: [...tracks],
    yellowTrack: [...tracks],
  }
  return board
}
