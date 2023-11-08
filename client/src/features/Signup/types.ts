// client/src/features/Signup/types.ts

export interface SignupState {
    slots: { [key: string]: string[] }; // Assuming raceId as number and storing an array of userIds
    loading: boolean;
    error: any;
  }
  
  export interface RaceSignup {
    raceId: number;
    userId: number;
  }
  