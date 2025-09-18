
export enum GamePhase {
  Intro,
  Phase1,
  Phase1End,
  Phase2,
  Phase2End,
  Phase3,
  Phase3End,
  Phase4,
  EndSuccess,
  EndFailure,
}

export interface Coin {
  id: number;
  position: number; // Position from -15 to 15
}
