-- Sevak AI Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
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

-- Insert some sample data (optional)
-- You can uncomment these lines if you want sample data

-- INSERT INTO users (full_name, email, mobile, location, accepted_terms) VALUES
-- ('Priya Sharma', 'priya.sharma@email.com', '9876543210', 'Koramangala, Bangalore', true),
-- ('Raj Patel', 'raj.patel@email.com', '9876543211', 'Bandra, Mumbai', true);

-- INSERT INTO requirements (user_id, helper_types, timing, budget, working_days, working_hours, experience_required, language_preferences, food_preferences, proximity_preference, urgency) VALUES
-- (1, '["maid", "cook"]', 'fulltime', '15000-25000', '["monday", "tuesday", "wednesday", "thursday", "friday"]', 'morning', '1-2years', '["hindi", "english"]', 'veg', 'within_5km', 'within_week'),
-- (2, '["driver"]', 'parttime', '10000-15000', '["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]', 'morning', '3-5years', '["hindi", "marathi"]', 'both', 'within_10km', 'flexible');