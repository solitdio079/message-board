#! /usr/bin/env node

import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255),
  message_text VARCHAR(255),
  added DATE
);

INSERT INTO messages (username, message_text, added)
VALUES
  ('Bryan', 'My first user message', '2026-03-22'),
  ('Odin', 'My second user message', '2026-03-23'),
  ('Daemon', 'My third user message', '2026-04-22');
`;
async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://postgres:JSGhqi8jBqubHG-@db.snogtuetsolyxwpqqsmb.supabase.co:5432/postgres",
    ssl:false
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
