export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      photos: {
        Row: {
          id: number
          created_at: string | null
          uid: string
          name: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          uid: string
          name: string
        }
        Update: {
          id?: number
          created_at?: string | null
          uid?: string
          name?: string
        }
      }
      user_info: {
        Row: {
          id: string
          created_at: string | null
          paid: boolean
          trained: boolean
          in_training: boolean
          start_training: string | null
          end_training: string | null
        }
        Insert: {
          id: string
          created_at?: string | null
          paid?: boolean
          trained?: boolean
          in_training?: boolean
          start_training?: string | null
          end_training?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          paid?: boolean
          trained?: boolean
          in_training?: boolean
          start_training?: string | null
          end_training?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
