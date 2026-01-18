/**
 * Sports Roster Module
 *
 * Fetches current rosters from MLB Stats API with fallback to cached data.
 * Uses in-memory cache to prevent rate limiting.
 */
import { TeamInfo } from './teamResolver.js';
export interface Player {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    position: string;
    jerseyNumber?: string;
    imageUrl?: string;
}
export interface RosterResponse {
    team: TeamInfo;
    players: Player[];
    source: 'api' | 'fallback';
    cached: boolean;
}
export declare const positionNames: Record<string, string>;
/**
 * Get roster for a team (with caching and fallback)
 */
export declare function getRoster(team: TeamInfo): Promise<RosterResponse>;
/**
 * Clear the roster cache
 */
export declare function clearRosterCache(): void;
/**
 * Generate team-themed items for cards (stadium, mascot, gear, etc.)
 */
export declare function getTeamThemedItems(team: TeamInfo): string[];
