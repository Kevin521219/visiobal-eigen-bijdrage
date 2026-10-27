// Hiermee kunnen we een lokale SQLite-database gebruiken.
import * as SQLite from 'expo-sqlite';

// Naam van de database.
// Als deze database nog niet bestaat, maakt SQLite hem automatisch aan.
const DATABASE_NAAM = 'visioball.db';

// Deze functie maakt de database en alle benodigde tabellen aan.
// De app kan deze functie uitvoeren tijdens het opstarten.
export async function maakLokaleDatabaseKlaar() {

  // Open de database.
  // Bestaat deze nog niet? Dan wordt deze automatisch aangemaakt.
  const database = await SQLite.openDatabaseAsync(DATABASE_NAAM);

  // Hieronder maken we alle tabellen aan.
  // "IF NOT EXISTS" voorkomt dat bestaande tabellen worden overschreven.
  await database.execAsync(`

    ----------------------------------------------------------------
    -- TABEL 1: SETTINGS
    ----------------------------------------------------------------
    -- Deze tabel bewaart alle instellingen van de gebruiker.
    -- Hier worden onder andere volume, geluiden, verlichting
    -- en toegankelijkheidsopties opgeslagen.
    ----------------------------------------------------------------

    CREATE TABLE IF NOT EXISTS settings (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      volume INTEGER DEFAULT 50,
      -- Volume van de Visioball (0 t/m 100).

      audio_track TEXT DEFAULT 'default',
      -- Het geselecteerde geluid of audiobestand.

      light_pattern TEXT DEFAULT 'constant',
      -- Het gekozen lichtpatroon.
      -- Bijvoorbeeld: constant, pulse of heartbeat.

      motion_sensitivity INTEGER DEFAULT 5,
      -- Gevoeligheid van bewegingsdetectie.
      -- Bijvoorbeeld een schaal van 1 t/m 10.

      vibration_enabled INTEGER DEFAULT 0,
      -- Trilling uit (0) of aan (1).

      accessibility_mode INTEGER DEFAULT 0,
      -- Toegankelijkheidsmodus uit (0) of aan (1).

      high_contrast INTEGER DEFAULT 1,
      -- Hoog contrast uit (0) of aan (1).

      updated_at TEXT
      -- Tijdstip waarop instellingen voor het laatst zijn gewijzigd.
    );

    ----------------------------------------------------------------
    -- TABEL 2: DEVICE STATUS
    ----------------------------------------------------------------
    -- Deze tabel bewaart de actuele status van de Visioball.
    -- Denk hierbij aan batterijinformatie en verbindingstatus.
    ----------------------------------------------------------------

    CREATE TABLE IF NOT EXISTS device_status (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      battery_level INTEGER,
      -- Batterijniveau van 0 t/m 100.

      connection_status TEXT DEFAULT 'disconnected',
      -- Mogelijke waarden:
      -- connected
      -- disconnected
      -- connecting

      current_audio TEXT,
      -- Het geluid dat momenteel wordt afgespeeld.

      last_seen TEXT
      -- Laatste moment waarop contact met de bal is geweest.
    );

    ----------------------------------------------------------------
    -- TABEL 3: LOGS
    ----------------------------------------------------------------
    -- Alle gebeurtenissen binnen de app worden hier opgeslagen.
    -- Handig voor debugging, foutopsporing en gebruikersanalyse.
    ----------------------------------------------------------------

    CREATE TABLE IF NOT EXISTS logs (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      event_type TEXT NOT NULL,
      -- Soort gebeurtenis.
      -- Bijvoorbeeld:
      -- bluetooth_connected
      -- volume_changed
      -- battery_low

      message TEXT NOT NULL,
      -- Menselijke beschrijving van de gebeurtenis.

      created_at TEXT NOT NULL
      -- Tijdstip waarop de gebeurtenis plaatsvond.
    );

  `);

  // Geef de database terug zodat andere functies deze kunnen gebruiken.
  return database;
}

//////////////////////////////////////////////////////////////////
// LOGGING
//////////////////////////////////////////////////////////////////

// Deze functie voegt een nieuwe gebeurtenis toe aan de logs-tabel.
// Bijvoorbeeld wanneer een gebruiker het volume wijzigt
// of wanneer verbinding wordt gemaakt met de Visioball.
export async function voegLogToe(
  eventType: string,
  message: string
) {

  // Open de database.
  const database = await maakLokaleDatabaseKlaar();

  // Maak een tijdstip aan waarop de gebeurtenis gebeurt.
  const tijdstip = new Date().toISOString();

  // Sla de gebeurtenis op.
  await database.runAsync(
    `
    INSERT INTO logs
      (event_type, message, created_at)
    VALUES (?, ?, ?)
    `,
    eventType,
    message,
    tijdstip
  );
}