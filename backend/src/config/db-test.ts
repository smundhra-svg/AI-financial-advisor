import type test from 'node:test';
import { query } from './db.js';

async function testConnection(){
    try {
        const result = await query('SELECT NOW()');
        const now = result?.rows?.[0]?.now ?? 'unknown';
        console.log('Successfully connected to PostgreSQL:', now);
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

export default testConnection;
