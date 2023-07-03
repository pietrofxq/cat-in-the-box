// This file was automatically generated. Edits will be overwritten

export type Typegen0 = {
  '@@xstate/typegen': true
  internalEvents: {
    '': { type: '' }
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: Record<string, unknown>
  missingImplementations: {
    actions: never
    delays: never
    guards: never
    services: never
  }
  eventsCausingActions: {
    removeSingleCardFromPlayerHand: 'REMOVE_INITIAL_CARD'
  }
  eventsCausingDelays: Record<string, unknown>
  eventsCausingGuards: {
    allPlayersRemovedOneCard: ''
  }
  eventsCausingServices: Record<string, unknown>
  matchesStates:
    | 'endOfGame'
    | 'round'
    | 'round.nextRound'
    | 'round.preparationPhase'
    | 'round.preparationPhase.predictionStep'
    | 'round.preparationPhase.removeSingleCardStep'
    | 'round.scoringPhase'
    | 'round.trickPhase'
    | 'round.trickPhase.evaluateTrick'
    | 'round.trickPhase.otherPlayersTurn'
    | 'round.trickPhase.startPlayerTurn'
    | {
        round?:
          | 'nextRound'
          | 'preparationPhase'
          | 'scoringPhase'
          | 'trickPhase'
          | {
              preparationPhase?: 'predictionStep' | 'removeSingleCardStep'
              trickPhase?: 'evaluateTrick' | 'otherPlayersTurn' | 'startPlayerTurn'
            }
      }
  tags: never
}
