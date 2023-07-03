import { Player, ResearchBoard, Score } from './game'

export type Context = {
  players: Player[]
  turnOrder: Player[]
  researchBoard: ResearchBoard
  currentRound: number
}
