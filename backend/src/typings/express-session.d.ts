import * as expressSession from 'express-session';

declare module 'express-session' {
  export interface SessionData extends expressSession.SessionData {
    userId: number;
  }
}
