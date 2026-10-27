# Backend-opzet

## Werkende opslag in deze versie

De app bewaart de standaard trainingsroutine lokaal via `src/services/devicePresetStorage.ts`. Die functie gebruikt de AsyncStorage-package die al in het project zat. De routine bevat snelheid, interval, motorstand en lichtstand.

De Bluetooth-bediening loopt rechtstreeks tussen de telefoon en de ESP32. Daarvoor is geen server nodig.

## Mogelijke online vervolgstap

`supabase-schema.sql` beschrijft twee privé-tabellen: persoonlijke apparaat-routines en apparaatsessies. Row Level Security beperkt gebruikers tot hun eigen gegevens. De app heeft op dit moment nog geen Supabase-login en verstuurt geen gegevens naar een online backend.

Voor synchronisatie is later een Supabase-project, loginfunctie, publieke project-URL en anon key nodig. Zet nooit een `service_role`-sleutel in een mobiele app.
