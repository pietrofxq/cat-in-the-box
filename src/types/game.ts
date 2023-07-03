export type NumberOfPlayers = 3 | 4 | 5

export type TricksToPredict = [1, 3, 4] | [1, 2, 3]

export type Player = {
  hasRed: boolean
  hasBlue: boolean
  hasGreen: boolean
  hasYellow: boolean
  handOfCards: number[]
  tricksToPredict: TricksToPredict
  predicted?: TricksToPredict[number]
  name: string
  id: string
  isRoundStartPlayer: boolean
  score: number
}

type ResearchBoardRow = {
  value: number
  hasToken: boolean
}

export type ResearchBoard = {
  redTrack: ResearchBoardRow[]
  blueTrack: ResearchBoardRow[]
  greenTrack: ResearchBoardRow[]
  yellowTrack: ResearchBoardRow[]
}

export type Score = Record<string, number>
