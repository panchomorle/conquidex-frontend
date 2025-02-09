import type { Database as DB, Tables } from '@/types/database.types'

declare global {
    type Database = DB
    type Member = Tables<'members'>
    type Club = Tables<'clubs'>
    type User = Tables<'auth.users'>
    type Guest = Tables<'guests'>
    type Person = Tables<'persons'>
    type GroupData = UnitGroup | ClassGroup;
    interface UnitGroup{
        unit_id: number;
        club_id: number
        unit_name: string;
        color: string;
        persons: Person[];
      }

    interface ClassGroup {
        class_id: number;
        club_id: number
        class_name: string;
        color: string;
        persons: Person[];
      }

}
