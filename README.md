# Sea-United

## Beschreibung 
Sea-United dein Traumerlebnis auf See.
Sea-United, die Website auf der atemberaubende Tagesbootsausflüge gebucht werden können und unvergessliche Ausflüge garantieren werden.

## Team
 * 🦸‍♂️ Tobias Hartmann
 * :superhero: Melissa Negele
 * :superhero: Nicole Widmayer 
 * :superhero: Beeke Wiltfang

## Quickstart
### Vorbereitungen
 1. git clone https://github.com/NicoleWidmayer/Sea-United/edit/master/README.md.git
 2. XAMPP Control Panel installieren
 3. Apache und MySQL starten (im XAMPP Control Panel)
 4. MySQL -> Admin -> Neue Datenbank anlegen mit dem Namen "Sea_United"
 5. Sea_United.sql importieren -> aus der Datenbank können auch die bereits angelegten Benutzer mit dazugehörigem Passwort entnommen werden
### Im Visual Studio Code Terminal
 6. node installieren
 7. mithilfe des cd commands in den Sea-United Ordner
 8. Ausführen von cd server
 9. Ausführen von node app.js
### Im Browser
 10. http://localhost:5000 öffnen

## Architektur
Es wurden die Programmiersprachen HTML (Hypertext Markup Language), JavaScript und CSS (Cascading Style Sheets) verwendet. 
Unsere Website ist aufgeteilt in Frontend, Backend und Datenbank.  
Front- und Backend interagieren dabei mit der Fetch-API (Application Programming Interface).

 ### Datenmodell
 Beispiel einer JSON Datei:<br>
 [{​​id: 1, kategorie: "Drunken Sailor", kapazität: 20, datum: "2020-11-08T23:00:00.000Z", preis: "200.00"}​​]

 ### Rest Services
In der app.js werden alle REST-Services durchgeführt. Über die definierte konstante "connection" wird eine Verbindung zur Datenbank aufgebaut. 
Dabei wird bei erfolgreicher Verbindung im Terminal die Meldung "MYSQL Datenbank is connected...." ausgeben.
Bei einem Fehler im Verbindungsaufbau z.B die Datenbank wurde nicht gestartet, die Datenbank existiert nicht oder die Anmeldedaten sind nicht richtig, wird eine Fehlermeldung im Terminal ausgegeben mit der Meldung "MYSQL Datenbank is not connected". Die Datenbank Anmeldedaten sind in der .env Datei einsehbar und können dort auch angepasst werden.

Auf der Webseite werden die REST-Funktionen "get","post","delete" und "patch" verwendet.
Dabei kommen auch die HTTP-Statuscodes (200, 201, 400 & 500) zum Einsatz.
Der Statuscode 200 wird bei erfolgreicher Ausführung zurückgesendet, der Statuscode 201 wenn ein neues Objekt erfolgreich erstellt wurde, wie es z.B beim anlegen neuer Benutzer oder neuer Termine der Fall ist.
Der Statuscode 400 wird verwendet, wenn bei der Rest-Funktion "post", "delete" oder "patch" der SQL Befehl nicht richtig war oder falsch ausgeführt wurde.
Sollte es zu einem Fehler kommen, wird der Fehler zusammen mit dem Statuscode 500 gesendet.

 **1. Startseite (index.html):**
Enthält keine REST-Funktion.
    
 **2. Boote (boote.html)**
Enthält keine REST-Funktion.

 **3. Ausflug (ausflug.html)**
Mit der REST-Funktion "get" werden die Dateninhalte aus der Datenbank angefordert und auf der Ausflugseite wird damit dann die Tabelle befüllt.
Hierbei wird aus den Datenbanktabellen "boot" und "termine" Daten ausgelesen.
Mit der REST-Funktion "patch" ist ein interagieren mit der Webseite und ein buchen von Ausflügen möglich, hierbei wird der ausgewählte Eintrag in der Tabelle "termine" verändert und auf gebucht gesetzt.

 **4. Kontakt (kontakt.html)**
Enthält keine REST-Services.

 **5. Anmelden (Login.html)**
Auf der Anmelden Seite ist ein Anmelden über die REST-Funktion "get" möglich, dabei werden alle Dateninhalte der Benutzer aus der Datenbank Tabelle "benutzer" angefordert und mit den eingegebenen Daten verglichen.

Mit der Rest-Funktion "post" ist hier auch eine Registrierung möglich, dabei werden alle neuen Daten eines Benutzers in die Datenbank Tabelle "benutzer" aufgenommen.

 **6. Buchen (buchen.html)**
Mit der REST-Funktion "get" werden die Dateninhalte aus der Datenbank angefordert und auf der Ausflugseite wird damit dann die Tabelle befüllt.
Hierbei wird aus der Datenbanktabelle "boot" und "termine" Daten ausgelesen.
Mit der REST-Funktion "patch" ist ein interagieren mit der Webseite und ein buchen von Ausflügen möglich, hierbei wird der ausgewählte Eintrag in der Tabelle "termine" verändert und auf gebucht gesetzt.

 **7. Termine (termin.html)**
Die Seite Termine enthält alle REST-Funktionen, "get", "post", "patch", "delete".
Mit der REST-Funktion "get" werden die Dateninhalte aus der Datenbank angefordert und die Tabelle auf der Terminseite wird befüllt. Aus den Tabellen "boot" und "termine", die in der Datenbank zu finden sind, werden die Daten ausgelesen.
Zusätzlich wird mit der Rest-Funktion "get" das DropDown mit Daten befüllt, hierbei wir die Kennung der Boote aus der Datenbank ausgelesen und in das DropDown Menü geschrieben.
Über die Rest-Funktion "post" ist das Anlegen eines neuen Termines möglich, dafür wird in der Tabelle "termine" ein neuer Termin Eintrag angelegt.
Mit der Rest-Funktion "delete" ist das Löschen eines ausgewählten Termines aus der Datenbank Tabelle "termine" möglich.
Zudem ist es über die Rest-Funktion "patch" möglich, ausgewählte Termine zu bearbeiten. Dabei wir ein Update des Datenbankeintrages durchgeführt.

 **8. Impressum (impressum.html)**
 Enthält keine REST-Funktion.

 ### Frontend
Das Frontend ist gegliedert in 8 Html-Seiten. Auf allen Seiten ist ein Header zu finden, welches den Wechsel zwischen den verscheidenne Html-Seiten ermöglicht (ausgenommen Impressum.html). Ebenfalls enthalten alle Html-Seiten, bevor man sich angemeldet hat, einen Footer. Der Footer gibt Auskunft über wesentliche Bestandteile unseres Unternehmens (Kontakt und Rechtliche Hinweise, auf diese im Falle des Anklickens weitergeleitet wird).  

 **1. Startseite (index.html):**
Enthält ein statisches, cliffhängendes Angebot, das nicht ausgeschlagen werden kann. #WeLoveSailing
    
 **2. Boote (boote.html)**
Unsere Reiseangebote werden auf dieser Seite sichtbar in Bild und Schrift dargestellt. Es zeigt dabei die atemberaubenden Angebote in voller Pracht. Da diese Seite aber statisch ist, haben wir als Unternehmen nicht das Bedürfnis, uns nach neuen anderen Booten umzuschauen. 

 **3. Ausflug (ausflug.html)**
Hier werden unsere Terminangebote, welche durch den eine angemeldete Person eingestellt wurden, dargestellt. Die Termine sind mit allen ihren Details in der Tabelle ersichtlich und dort auch buchbar. Die Daten in der Tabelle stammen aus der Datenbank. Auf dem Button ist ein EventListener der das buchen durchführt. Nach dem buchen ist der gebuchte Termin nicht mehr in der Tabelle einsehbar und kann somit nicht mehr gebucht werden. 

 **4. Kontakt (kontakt.html)**
Bei Fragen bezüglich unserer Ausflüge kann man sich an unser Unternehmen wenden. Aufgrund dessen, dass wir nur ein fiktives Unternehmen sind, besitzen wir keine E-Mail-Adresse. Die Nachricht führt daher ins Leere. Eine Antwort unseres Unternehmens ist somit zu 100% ausgeschlossen.

 **5. Anmelden (Login.html)**
Wir waren innovativ und haben anmelden und registrieren auf eine Html-Seite gepackt. Mit dem Anmelden-/Registrieren-Button kann zwischen Anmelden und Registrieren gewechselt werden. Nach der Registrierung muss sich einmal angemeldet werden, um angemeldet zu sein. Bei falschen Eingaben ist das Ganze mit Fehlermeldungen versehen. 
Da wir uns eine sehr komplizierte Aufgabe gestellt haben für den Zeitraum und unsere Erfahrungen, zwischen einem Admin und einem User zu unterscheiden, haben wir sicherheitstechnische Aspekte nicht ganz so ernst genommen und unterscheiden nicht zwischen Admin und User. 

 **6. Buchen (buchen.html)**
Da man auch buchen können sollten wenn man angemeldet ist, haben wir die Html-Seite buchen.html mit derselben Funktion und Art und Weise wie sie aggiert, wie die ausflug.html Seite ausgestattet. Für weitere Erklärungen bitte bei dem Punkt Ausflug nachschauen. 


 **7. Termine (termin.html)**
Damit unser Unternehmen nicht pleite geht, müssen wir ständig neue Ausflüge einstellen. Dies kann direkt als Erstes auf der Seite gemacht werden. Hierfür muss ein Boot und ein in der Zukunft liegendes Datum ausgewählt werden. Alle anderen Eingaben sind fehlerhaft. In der darunter folgenden Tabelle sind alle aktuellen und in der zukunft liegenden Termine ersichtlich. Auch der Buchungsstand der Termine kann hier eingesehen werden (Gebucht: 0=Nein, 1=Ja). 
Findet ein Termin nicht mehr statt oder wird er nicht mehr benötigt kann dieser in der 2 Spalte von rechts mit dem Delete-Button gelöscht werden. 
Da Menschen und Mitarbeiter nicht perfekt sind, passieren Fehler. Dafür gibt es in der rechten Spalte der Tabelle einen Edit-Button pro Tabelleneintrag. Wenn dieser gedrückt wird, erscheint unterhalb der Tabelle ein Formular, um den Termin in seinen Daten zu ändern (natürlich zukunftsorientiert).

 **8. Impressum (impressum.html)**
Informationen die keiner braucht, ausgenommen unser Gesetz. 

**CSS**
Die CSS wurde für die Gestaltung der HTML-files eingebunden. Dabei kamen mehrer CSS-files zum Einsatz. 
