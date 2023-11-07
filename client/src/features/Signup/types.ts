// client/src/features/Signup/types.ts

export interface SignupState {
    slots: { [raceId: number]: number[] }; // Assuming raceId as number and storing an array of userIds
    loading: boolean;
    error: string | null;
  }
  
  export interface RaceSignup {
    raceId: number;
    userId: number;
  }
  