-- SevakAI Database Schema for Supabase PostgreSQL
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension for user IDs (optional, but recommended)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (compatible with Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    mobile TEXT NOT NULL,
    location TEXT NOT NULL,
    accepted_terms BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create requirements table
CREATE TABLE IF NOT EXISTS requirements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    helper_types JSONB NOT NULL,
    timing TEXT NOT NULL,
    budget TEXT NOT NULL,
    working_days JSONB,
    working_hours TEXT,
    specific_skills JSONB,
    experience_required TEXT,
    language_preferences JSONB,
    accommodation_required BOOLEAN DEFAULT false,
    food_preferences TEXT,
    background_check_required BOOLEAN DEFAULT true,
    proximity_preference TEXT,
    additional_requirements TEXT,
    urgency TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_mobile ON users(mobile);
CREATE INDEX IF NOT EXISTS idx_users_auth_user_id ON users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_requirements_user_id ON requirements(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for requirements table
CREATE TRIGGER update_requirements_updated_at 
    BEFORE UPDATE ON requirements 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE requirements ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = auth_user_id);

-- Requirements policies
CREATE POLICY "Users can view own requirements" ON requirements
    FOR SELECT USING (
        user_id IN (
            SELECT id FROM users WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own requirements" ON requirements
    FOR INSERT WITH CHECK (
        user_id IN (
            SELECT id FROM users WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own requirements" ON requirements
    FOR UPDATE USING (
        user_id IN (
            SELECT id FROM users WHERE auth_user_id = auth.uid()
        )
    );

-- Insert sample data (optional for testing)
-- Uncomment the lines below if you want sample data

-- INSERT INTO users (auth_user_id, full_name, email, mobile, location, accepted_terms) VALUES
-- ('00000000-0000-0000-0000-000000000000', 'Test User', 'test@example.com', '9876543210', 'Bangalore, Karnataka', true);

-- INSERT INTO requirements (user_id, helper_types, timing, budget, working_days, working_hours, experience_required, language_preferences, food_preferences, proximity_preference, urgency) VALUES
-- (1, '["maid", "cook"]', 'fulltime', '15000-25000', '["monday", "tuesday", "wednesday", "thursday", "friday"]', 'morning', '1-2years', '["hindi", "english"]', 'veg', 'within_5km', 'within_week');

-- Create a function to handle user creation after Supabase Auth signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users (auth_user_id, full_name, email, mobile, location, accepted_terms)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'mobile', ''),
        COALESCE(NEW.raw_user_meta_data->>'location', ''),
        true
    );
    RETURN NEW;
END;
$$ language 'plpgsql' security definer;

-- Create trigger to automatically create user profile after signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user(); 