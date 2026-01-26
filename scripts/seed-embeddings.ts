import { embed } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY;
const googleApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!supabaseUrl || !supabaseServiceKey || !googleApiKey) {
    console.error('❌ ERROR: Missing one or more environment variables in .env.local:');
    if (!supabaseUrl) console.error('   - NEXT_PUBLIC_SUPABASE_URL is missing');
    if (!supabaseServiceKey) console.error('   - SUPABASE_SERVICE_ROLE_KEY is missing');
    if (!googleApiKey) console.error('   - GOOGLE_GENERATIVE_AI_API_KEY is missing');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
    const knowledgePath = path.join(process.cwd(), 'data/chatbot/knowledge.md');
    const content = fs.readFileSync(knowledgePath, 'utf8');

    // Simple chunking by sections (splitting by ##)
    const chunks = content.split('##').filter(c => c.trim().length > 0).map(c => '##' + c);

    console.log(`Processing ${chunks.length} chunks...`);

    for (const chunk of chunks) {
        try {
            console.log(`Embedding chunk: ${chunk.substring(0, 50)}...`);

            const { embedding } = await embed({
                model: google.textEmbeddingModel('text-embedding-004'),
                value: chunk,
            });

            const { error } = await supabase
                .from('documents')
                .insert({
                    content: chunk,
                    embedding,
                    metadata: { source: 'knowledge.md' }
                });

            if (error) {
                console.error('Error inserting into Supabase:', error);
            } else {
                console.log('Success!');
            }
        } catch (err) {
            console.error('Embedding failed:', err);
        }
    }

    console.log('Seeding completed.');
}

seed();
