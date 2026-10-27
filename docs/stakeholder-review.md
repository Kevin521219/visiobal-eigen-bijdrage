# VisioBall — review voor stakeholder

## Concept

VisioBall helpt gebruikers hun trainingsbal te verbinden en te bedienen. De app gebruikt Bluetooth Low Energy voor opdrachten aan de ESP32-bal. De 3D-bal blijft het herkenbare middelpunt; de bediening moet snel en duidelijk zijn.

## Eigen bijdrage in deze versie

- Een eigen mint/teal visuele stijl voor de lichte en donkere modus.
- De nieuwe kleuren zijn doorgevoerd op de start-, scan-, muziek-, instellingen- en bedieningsschermen en op de 3D-bal.
- De gebruiker kan snelheid, interval, motorstand en lichtstand opslaan als persoonlijke routine.
- De routine wordt op het toestel bewaard en bij het openen van de startpagina teruggeladen.
- Een klikbare wireframe staat in `stakeholder-wireframe.html`.

## Vragen voor review

1. Past de mint/teal stijl bij het product en de doelgroep?
2. Is de knop om een routine op te slaan makkelijk te vinden?
3. Welke waarden moeten bij een routine worden opgeslagen?
4. Is synchronisatie tussen telefoons nodig, of is opslag op één toestel voorlopig voldoende?

## Data-opslag en backend

De trainingsroutine werkt zonder internet en wordt lokaal op dit toestel opgeslagen met AsyncStorage. De BLE-verbinding tussen telefoon en ESP32 blijft rechtstreeks. `backend/supabase-schema.sql` is een voorstel voor een latere online backend met gebruikersroutines en sessies. De SQL is nog niet uitgevoerd en de app is nog niet met Supabase verbonden.

## Herkomst

Deze versie bouwt voort op het ontvangen VisioBall-project. BLE-communicatie, navigatie, muziekspeler, 3D-interactie en bestaande talen komen uit de basiscode. Mijn bijdrage in deze versie is de eigen kleurstijl, lokale routineopslag en het voorstel voor het backend-datamodel. Vermeld bij een presentatie of inlevering de oorspronkelijke repository en maker.
