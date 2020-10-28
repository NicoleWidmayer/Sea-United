# Sea-United

## Beschreibung 
Sea-United dein Traumerlebnis auf See.
Sea-United, die Website auf der atemberaubende Tagesbootsausflüge gebucht werden können und unvergessliche Ausflüge garantieren werden.

## Team
 * :prince: Tobias Hartmann
 * :princess: Melissa Negele
 * :dancer: Nicole Widmayer 
 * :princess: Beeke Wiltfang

## Quickstart
 1. git clone https://github.com/NicoleWidmayer/Sea-United/edit/master/README.md.git
 2. install XAMPP Control Panel
 3. Apache und MySQL starten
 4. MySQL Admin -> Neue Datenbank anlegen mit dem Namen "Sea_United"
 5. Sea_United.sql importieren
 6. node install
 7. mithilfe von commands in den Sea-United ordner mit cd
 8. cd server
 9. node app.js
 10. http://localhost:5000

## Architektur
Es wurden die Programmiersprachen HTML (Hypertext Markup Language), JavaScript und CSS (Cascading Style Sheets) verwendet. 
Unsere Website ist aufgeteilt in Frontend, Backend und Datenbank.  
Front- und Backend interagieren dabei mit der Fetch-API (Application Programming Interface).

 ### Datenmodell

 ### Rest Services
In der app.js werden alle REST-Services durchgeführt. Über die definierte Konstante "connection" wird eine Verbindung zur Datenbank aufgebaut. 
Dabei wird bei erfolgreicherverbindung in der Temrminal Console "MYSQL Datenbank is connected...." ausgeben.
Bei einem Fehler im Verbindungsaufbau z.B die Datenbank wurde nicht gestartet, die Datenbank exestiert nicht oder die Anmeldedaten sind nicht richtig, wir eine Fehlermdelung in der Terminal Console ausgegeben mit "MYSQL Datenbank is not connected".

Auf der Webseite werden die REST-Funktionen "get","post","delete" und "patch" verwendet.

Mit der REST-Funktion "post" werden die Daten auf der Webseite mit den Daten aus der Datenbank abgeglichen. Dies wird beim Einloggen und dem Registrieren neuer Benutzer verwendet. Zudem hat es die Funktion eingegebene Daten auf der Website, in die Tabellen von der Datenbank einzufügen. Somit kann man auf unserer Seite sich als neuen Benutzer anlegen und neue Rezepte in die Datenbank hinzufügen.

Um Daten aus der Datenbank löschen zu können, wird die Funktion "delete" verwendet. Mit ihr wird eine bestimmte Zeile aus der Datenbank oder mehrere Datenbankinhalte gelöscht. Auf der Website wählt man hier die ID eines Rezeptes aus und über die Funktion wird die Zeile mit der übereinstimmenden ID aus der Datenbank gelöscht.

Damit Daten in der Tabelle auf der Forumseite angezeigt werden, wird die REST-Funktion "get" verwendet. Über diese Funktion kann man Datenbankinhalte anfordern und anzeigen lassen.

**1. Startseite (index.html):**
Enthält keine REST-Services.
    
 **2. Boote (boote.html)**
Enthält keine REST-Services.

 **3. Ausflug (ausflug.html)**
Mit der REST-Funktion "get" werden die Dateninhalte aus der Datenbank angefordert und auf der Ausflugseite damit die Tabelle befüllt.
Hierbei wird aus der Datenbank Tabelle boot und termine daten ausgelesen.

Mit der REST-Funktion "post" ist ein buchen von Ausflügen möglich.

 **4. Kontakt (kontakt.html)**
Enthält keine REST-Services.

 **5. Anmelden (Login.html)**


 **6. Buchen (buchen.html)**
 


 **7. Termine (termin.html)**


 **8. Impressum (impressum.html)**
 Enthält keine REST-Services.




 ### Frontend
Das Frontend ist gegliedert in 8 Html-Seiten. Auf allen Seiten ist ein Header zu finden, welches den Wechsel zwischen den verscheidenne Html-Seiten ermöglicht (ausgenommen Impressum.html). Ebenfalls enthalten alle Html-Seiten, bevor man sich angemeldet hat, einen Footer. Der Footer gibt Auskunft über wesentliche Bestandteile unsere Unternehmens (Kontakt und Rechtliche Hinweise, auf diese im falle des anklickens weitergeleitet wird).  

 **1. Startseite (index.html):**
Enthält ein statisches, cliffhängendes Angebot das nicht ausgeschlagen werden kann.     #WeLOveSailing
    
 **2. Boote (boote.html)**
Unsere Reiseangebot werden auf dieser Seite sichtbar in Bild und Schrift dargestellt. Es zeigt dabei die atemberaubenden Angebote in voller pracht. Da diese Seite aber statisch ist, haben wir als Unternehmen nicht das Bedürfnis uns nach neuen anderen Booten umzuschauen (das ist eine statische Seite). 

 **3. Ausflug (ausflug.html)**
Hier findest du unsere Terminangebote, welche durch den eine angemeldete Person eingestellt wurden. Die Termine sind mit allen ihren Details in der Tabelle ersichtlich und dort auch buchbar. Die Daten in der Tabelle stammen aus der Datenbank und sind mithilfe einer Fetch-Abfrage ersichtlich. Auf dem Button ist ein EventListener der das buchen durchführt. nach dem buchen ist der gebuchte Termin nicht mehr in der Tabelle einsehbar und kann somit nicht mehr gebucht werden. 

 **4. Kontakt (kontakt.html)**
Bei Fragen über unsere Ausflüge kann man sich an unser Unternehmen wenden. Aufgrund dessen, das wir nur ein fiktives Unternehmen sind, besitzen wir keine E-Mail-Adresse. Die Nachricht führt daher ins leere. Eine Antwort unseres Unternehmens ist somit zu 100% ausgeschlossen.

 **5. Anmelden (Login.html)**
Wir waren Innovativ und haben anmelden und registrieren auf eine Html-Seite gepackt. Mit obersten Button kann sow zischen Anmelden und Registrieren gewechselt werden. Beim Anmelden bzw. Registrieren wird ein Event ausgelöst. Nach der Registrierung muss sich einmal angemeldet werden, um angemeldet zu sein. Bei falschen Eingaben ist das ganze mit Fehlermeldungen versehen. 
Da wir uns eine sehr komplizierte Aufgabe gestellt haben für den Zeitraum und unsere Erfahrungen, zwischen einem Admin und einem User zu unterscheiden, haben wir Sicherheitstechnische aspekte nicht ganz so ernst genommen. 

 **6. Buchen (buchen.html)**
Da man auch buchen können sollten wenn man angemeldet ist, haben wir die Html-Seite buchen.html mit der selben Funktion und Art und Weise wie sie aggiert, wie die ausflug.html Seite ausgesattet. Für weitere Erkläungen bitte bei dem punkt Ausflug nachschauen. 


 **7. Termine (termin.html)**
Damit unser Unternehmen nicht pleite geht müssen wir ständig neue Ausflüge einstellen. Dies kann direkt als erstes auf der Seite gemacht werden. Hierfür muss ein Boot udn ein in der Zukunft liegedes datum ausgewählt werden. Alle anderen Eingaben sind fehlerhaft. In der darunterfolgenden Tabelle sind alle aktuellen und in der zukunftliegenden Termine ersichtlich. Auch der Buchungsstand der Termine kann hier eingesehen werden (Gebucht: 0=Nein, 1=Ja). 
Findet ein Termin nicht mehr statt oder wird er nicht mehr benötigt kann dieser in der 2 Spalte von rechts mit dem Delete-Button gelöscht werden. 
Da Menschen und Mitarbeiter nicht perfekt sind passieren Fehler. Dafür gibt es in der rechten Spalte der Tabelle einen Edit-Button pro Tabelleneintrag. Wenn dieser gedrückt wird erscheint unterhalb der Tabelle ein Formular, um den Termin in seinen Daten zu ändern (natürlich Zukunftsorientiert).

 **8. Impressum (impressum.html)**
Informationen die keiner braucht, ausgenommen unser Gesetz. 

**CSS**
Die CSS wurde für die Gestaltung der HTML-files eingebunden. Dabei kamen mehrer CSS-files zum Einsatz. 
