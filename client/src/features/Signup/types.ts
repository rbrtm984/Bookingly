// client/src/features/Signup/types.ts

export interface SignupState {
  time: {
      [timeId: string]: {
          [slotId: string]: string[];
      };
  };
  loading: boolean;
  error: any;
}

  
  export interface RaceSignup {
    [timeId: string]: {
      [slotId: string]: string[];
    };
  }
  