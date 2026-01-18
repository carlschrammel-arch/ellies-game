/**
 * Team Resolver Module
 *
 * Maps user input like "Dodgers", "LA Dodgers", etc. to canonical team data
 * Supports MLB teams with expansion to other leagues possible
 */
export interface TeamInfo {
    id: number;
    slug: string;
    name: string;
    fullName: string;
    abbreviation: string;
    city: string;
    league: 'MLB' | 'NBA' | 'NFL' | 'NHL';
    sport: string;
    colors: {
        primary: string;
        secondary: string;
    };
    mascot?: string;
    stadium: string;
}
export declare const mlbTeams: TeamInfo[];
/**
 * Resolve user text to a team
 */
export declare function resolveTeam(userText: string): TeamInfo | null;
/**
 * Detect if user input is asking about a sports team
 */
export declare function detectSportsTeamQuery(input: string): {
    isTeamQuery: boolean;
    team: TeamInfo | null;
};
