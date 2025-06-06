import { createClient } from '@supabase/supabase-js'

// Hardcoded values for testing - since env vars aren't loading properly
const supabaseUrl = 'https://bzhthpqfiuxxeiefycgq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6aHRocHFmaXV4eGVpZWZ5Y2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMjMyNTcsImV4cCI6MjA2NDY5OTI1N30.xhcONrFfRjI55DbsqdzBhbj_4pirBl4lIhQMoZKXZSc'

console.log('Supabase URL:', supabaseUrl)
console.log('Using Supabase Anon Key:', supabaseAnonKey ? 'Key is set' : 'No key found')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions with better error handling
export const signUp = async (email: string, password: string, metadata: any) => {
  try {
    console.log('Attempting signup with:', email)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    
    if (error) {
      console.error('Signup error:', error)
    } else {
      console.log('Signup successful:', data)
    }
    
    return { data, error }
  } catch (err) {
    console.error('Signup exception:', err)
    return { data: null, error: { message: 'Network or configuration error. Please check your Supabase settings.' } }
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      console.error('Login error:', error)
    }
    
    return { data, error }
  } catch (err) {
    console.error('Login exception:', err)
    return { data: null, error: { message: 'Network or configuration error. Please check your Supabase settings.' } }
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
} 