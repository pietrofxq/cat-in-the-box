import { Player, TricksToPredict } from './game'

type RemoveInitialCardEvent = {
  type: 'REMOVE_INITIAL_CARD'
  card: number
}

type Predict = {
  type: 'PREDICT'
  prediciton: TricksToPredict[number]
}

type PredictionsMadeEvent = {
  type: 'PREDICTIONS_MADE'
}

type PlayedCardEvent = {
  type: 'PLAYED_CARD'
  player: Player
  card: number
}

type TrickEvaluatedEvent = {
  type: 'TRICK_EVALUATED'
}

type ParadoxOccurredEvent = {
  type: 'PARADOX_OCCURRED'
}

type AllCardsPlayedEvent = {
  type: 'ALL_CARDS_PLAYED'
}

type ScoresCalculatedEvent = {
  type: 'SCORES_CALCULATED'
}

type NextRoundEvent = {
  type: 'NEXT_ROUND'
}

type RoundInitializedEvent = {
  type: 'ROUND_INITIALIZED'
}

type LastRoundPlayedEvent = {
  type: 'LAST_ROUND_PLAYED'
}

export type Events =
  | RemoveInitialCardEvent
  | PredictionsMadeEvent
  | PlayedCardEvent
  | TrickEvaluatedEvent
  | ParadoxOccurredEvent
  | AllCardsPlayedEvent
  | ScoresCalculatedEvent
  | NextRoundEvent
  | RoundInitializedEvent
  | LastRoundPlayedEvent
