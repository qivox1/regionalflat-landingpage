# Woran erkennst du, dass GEO wirkt? So misst du KI-Sichtbarkeit ohne Agentur-Dashboard

> Analytics zeigt fast nichts, die Search Console keine Klicks – so misst du als regionaler Betrieb trotzdem sauber, ob deine KI-Sichtbarkeit wächst.

**Autorin:** Anja (Gründerin & Inhaberin von regionalflat) · **Veröffentlicht:** 21. September 2026 · **Lesezeit:** 12 Min.
**Quelle:** https://regionalflat.de/impulse/ki-sichtbarkeit-messen-woran-du-erkennst-dass-geo-wirkt/

---

## Warum siehst du in deinen Zahlen fast nichts, obwohl die KI dich empfiehlt?

Stell dir einen Elektromeister vor, nennen wir ihn Thomas, vier Mitarbeiter, ein Standort. Seit drei Monaten lässt er etwas für seine KI-Sichtbarkeit tun. Profile aufgeräumt, Leistungsseiten neu geschrieben, Bewertungen eingesammelt. Jetzt sitzt er abends vor Google Analytics, klickt sich durch die Berichte und findet: 14 Besuche aus ChatGPT. Vierzehn. In drei Monaten.

Sein erster Gedanke ist der naheliegende: Das war rausgeworfenes Geld.

Sein zweiter Gedanke wäre der richtige: Vielleicht misst er die falsche Zahl.

**Der Traffic, den KI-Systeme direkt auf deine Website schicken, ist 2026 noch sehr klein – und er ist auch nicht das, was GEO leisten soll.** Die Auswertung von 101.574 Websites, die SE Ranking im Juni 2026 veröffentlicht hat, zeigt: KI-Suchmaschinen stehen weltweit für **0,32 Prozent aller Website-Besuche**. Das ist rund einer von 312 Besuchen. Gewachsen ist das gewaltig – von 0,02 Prozent 2024 über 0,24 Prozent 2025 auf jetzt 0,32 Prozent, also das Sechzehnfache in weniger als zwei Jahren. Aber die absolute Zahl bleibt klein. Bei einer Handwerker-Website mit 800 Besuchen im Monat sind 0,32 Prozent genau zweieinhalb Besuche.

Wer also in Analytics nachschaut und dort den Beweis sucht, wird ihn nicht finden. Nicht, weil nichts passiert, sondern weil die Wirkung an einer anderen Stelle entsteht: Jemand fragt die KI nach einem Elektriker, bekommt drei Namen genannt, merkt sich einen – und ruft am nächsten Tag an oder tippt den Firmennamen bei Google ein. Dieser Weg hinterlässt in deinem Analytics keine Spur, die „ChatGPT" heißt.

Das ist die unbequeme Grundlage jeder ehrlichen Messung: **KI-Sichtbarkeit wirkt überwiegend als Empfehlung, nicht als Klick.** Und Empfehlungen misst man anders.

## Was kannst du überhaupt messen – und was nicht?

Es hilft, sich die vier Messpunkte einmal nebeneinanderzulegen. Jeder zeigt etwas anderes, keiner zeigt alles.

| Messpunkt | Was er dir zeigt | Was er dir nicht zeigt | Aufwand |
| --- | --- | --- | --- |
| **Prompt-Test** | Wirst du bei echten Kundenfragen genannt? An welcher Stelle? Wer sonst? | Wie viele Menschen diese Frage tatsächlich stellen | 20–40 Min. pro Monat |
| **Search Console (KI-Berichte)** | Wie oft deine Seiten in Googles KI-Antworten als Quelle auftauchen | Klicks – die weist Google hier nicht aus | 5 Min. pro Monat |
| **Analytics (Kanal „AI Assistant")** | Wie viele Menschen aus einem KI-Chat heraus auf deine Seite klicken | Alle, die dich nur gemerkt und später direkt angerufen haben | 5 Min. pro Monat |
| **Anfragen-Herkunft** | Was am Ende zählt: Kommen neue Kunden, und woher? | Den technischen Weg dorthin | 10 Sek. pro Anfrage |

Die vierte Zeile ist die wichtigste und die, die fast niemand konsequent macht. Dazu später mehr.

## Wie liest du die neuen KI-Berichte in der Google Search Console?

Hier ist 2026 tatsächlich etwas passiert, das dir hilft. Google hat im Juni 2026 eigene Berichte für generative KI-Funktionen in der Search Console eingeführt und meldete am **31. August 2026**, dass sie weltweit für alle Websites ausgerollt sind.

Was drinsteht: **Impressionen aus drei KI-Flächen** – AI Overviews (die KI-Antwort über den Suchergebnissen), AI Mode (Googles Chat-Modus) und generative Funktionen in Discover. Aufgeschlüsselt nach Seite, Land, Gerät und Datum. Du siehst also zum ersten Mal schwarz auf weiß, welche deiner Seiten Google für KI-Antworten heranzieht.

Was nicht drinsteht: **Klickdaten.** Google weist in diesen Berichten Impressionen aus, keine Klicks. Das ist keine Lücke, die du durch geschicktes Filtern schließen kannst – die Zahl existiert dort schlicht nicht.

So gehst du praktisch vor:

1. Search Console öffnen, links unter „Leistung" den Bericht für generative KI-Funktionen wählen.
2. Einen festen Zeitraum nehmen, etwa die letzten 28 Tage, und ihn jeden Monat gleich lassen.
3. Zwei Zahlen notieren: Gesamtimpressionen und die drei Seiten mit den meisten Impressionen.
4. Diese drei Seiten sind deine Arbeitsliste. Was Google für KI-Antworten benutzt, funktioniert – davon brauchst du mehr.

Zwei Einschränkungen, die du kennen solltest: Google hat gesagt, dass Seiten mit zu wenigen KI-Impressionen möglicherweise gar keinen Bericht sehen. Und die Hilfeseiten wiesen auch nach dem Rollout noch darauf hin, dass nicht jede Property sofort Zugriff hat. Wenn du den Bericht nicht findest, ist das also nicht automatisch ein schlechtes Zeichen.

## Wie erkennst du KI-Besucher in Google Analytics?

Auch hier hat sich 2026 etwas Handfestes geändert. Seit Mai 2026 hat Google Analytics 4 eine eigene Standard-Kanalgruppe **„AI Assistant"**. Besuche aus erkannten KI-Assistenten – Google nennt ChatGPT, Gemini und Claude als Beispiele – bekommen automatisch das Medium `ai-assistant` und landen nicht mehr im Sammelbecken „Verweise". Du musst dafür nichts einrichten.

Drei Dinge, die du dabei wissen musst, sonst liest du die Zahl falsch:

**Erstens: Nicht alles landet dort.** Perplexity taucht weiter unter „Verweise" auf, Besuche aus Googles AI Overviews zählen als organische Suche, und ein großer Teil des KI-Traffics kommt ganz ohne Referrer an – etwa aus App-internen Browsern oder wenn jemand den Link kopiert. Diese Besuche stehen bei dir unter „Direkt".

**Zweitens: Die Umstellung wirkt nicht rückwirkend.** Was vor Mai 2026 passiert ist, bleibt in den alten Kategorien. Vergleiche mit dem Vorjahr führen dich also in die Irre.

**Drittens – und das ist die praktischste Erkenntnis: Schau auf die Startseite.** Nach der SE-Ranking-Auswertung vom Juli 2026 landen **60 Prozent des KI-Traffics auf der Startseite**, gegenüber nur 17 Prozent bei organischer Suche. KI-Systeme schicken Menschen zur Marke, nicht zum passenden Unterartikel. Wenn deine Startseite also nicht in drei Sekunden beantwortet, was du machst, für wen und wo – dann verlierst du genau die Besucher, die dir die KI geschickt hat.

## Warum ist der Prompt-Test die wichtigste Messung – und wie machst du ihn richtig?

Weil er die einzige Messung ist, die direkt zeigt, was du wissen willst: Wirst du empfohlen?

Alles andere misst Folgen. Der Prompt-Test misst die Sache selbst. Und er kostet dich nichts außer einer halben Stunde im Monat. Den Einstieg dazu haben wir ausführlich in [So testest du deine KI-Sichtbarkeit in 15 Minuten](/impulse/so-testest-du-deine-ki-sichtbarkeit-in-15-minuten/) beschrieben – hier geht es um die Disziplin, die aus einem einmaligen Test eine Messung macht.

**Lege zehn Fragen fest und ändere sie nicht mehr.** Das ist die wichtigste Regel. Eine Messung, deren Fragen sich jeden Monat ändern, ist keine Messung. Nimm Fragen, wie deine Kunden sie stellen würden, nicht wie du sie formulieren würdest: „Wer kann mir in Minden eine Wallbox installieren?" statt „Elektroinstallation Minden".

**Prüfe in mindestens drei Systemen.** ChatGPT, Google-KI und ein drittes nach Wahl. Immer dieselben.

**Nutze ein frisches Fenster ohne Anmeldung.** Sonst antwortet dir die KI auf Basis deiner eigenen Historie – und du misst dich selbst.

**Notiere pro Frage drei Dinge:** Wirst du genannt, ja oder nein? An welcher Stelle, falls ja? Und welche anderen Betriebe werden genannt? Die dritte Spalte ist die, die dir am meisten sagt. Wenn immer dieselben zwei Wettbewerber vorkommen, schau dir an, wo die zitiert werden – das ist deine To-do-Liste.

**Miss immer am selben Tag im Monat.** KI-Antworten schwanken, und zwar erheblich. Eine einzelne Abfrage ist ein Schnappschuss, kein Messwert. Erst die Reihe über vier, fünf, sechs Monate zeigt eine Richtung.

Und die ehrliche Erwartung dazu: **Die erste Bewegung siehst du realistisch nach acht bis zwölf Wochen**, nicht nach zwei. KI-Systeme aktualisieren ihr Bild von deinem Betrieb nicht, weil du am Montag eine Seite geändert hast.

## Welche Zahl zeigt am Ende, ob sich das Ganze rechnet?

Die, die du selbst erheben musst – und die keine Software dir liefert: **Woher kommen deine Anfragen?**

Das ist keine technische Messung, sondern eine organisatorische. Jeder, der bei dir anruft, ein Formular ausfüllt oder in den Laden kommt, bekommt eine Frage gestellt: „Darf ich fragen, wie Sie auf uns gekommen sind?" Die Antwort wird in einer Spalte notiert. Mehr nicht.

Nach drei Monaten hast du etwas, das kein Dashboard dieser Welt hat: die echte Herkunft deiner Kunden. Und die Antworten klingen nie nach „GEO". Sie klingen nach: „Ich hab ChatGPT gefragt und Sie waren dabei." Oder: „Google hat oben so eine Antwort angezeigt, da standen Sie." Oder: „Empfehlung von meinem Nachbarn" – auch das ist ein Ergebnis, nur eben keins, das du dir ans Revers heften kannst.

Der Grund, warum das die entscheidende Messung ist: Sie fängt genau den Weg ein, der dir in Analytics entgeht – Empfehlung merken, später direkt kommen. Wer nur die Kanäle zählt, misst den kleineren Teil der Wirkung.

Was du daraus rechnest, haben wir in [Was kostet GEO wirklich?](/impulse/was-kostet-geo-wirklich-anbieter-check-ki-sichtbarkeit/) durchgerechnet: Auftragswert mal zusätzliche Anfragen gegen die Monatskosten. Ohne die Herkunftsfrage fehlt dir dafür die einzige Zahl, die zählt.

## Wie sieht ein ehrliches Monatsreporting auf einer DIN-A4-Seite aus?

So sieht es aus, wenn es gut gemacht ist – und es passt auf eine Seite:

**Oben: die Prompt-Tabelle.** Zehn Fragen, drei Systeme, ein Häkchen oder ein Strich. Darunter eine einzige Zahl: In wie vielen der 30 Abfragen kamst du vor? Diesen Monat, letzten Monat, vor drei Monaten.

**Darunter: die Wettbewerber.** Welche Namen tauchten wie oft auf? Wer ist neu dazugekommen?

**Dann: zwei Zahlen aus den Google-Werkzeugen.** KI-Impressionen aus der Search Console. Besuche aus dem Kanal „AI Assistant" in Analytics. Beide mit Vormonatsvergleich, beide mit dem Hinweis, dass sie nur einen Ausschnitt zeigen.

**Unten: die Anfragen.** Wie viele, und wie viele davon nannten eine KI als Quelle.

**Und ganz unten: ein Satz, was diesen Monat getan wurde.** Nicht fünf Seiten Maßnahmenbericht – ein Satz.

Was in einem ehrlichen Report **nicht** vorkommt: ein „Sichtbarkeitsindex", den nur der Anbieter berechnen kann. Ein Prozentwert ohne Bezugsgröße. Eine hübsche Kurve, die nach oben zeigt, ohne dass irgendwo steht, was gemessen wurde. Wenn du in einem Report eine Zahl findest, die du nicht selbst nachprüfen könntest, frag nach, wie sie entsteht. Bekommst du darauf keine klare Antwort, ist die Zahl Dekoration.

## Was steckt bei uns hinter dem KI-Sichtbarkeits-Check?

Genau das, was oben steht – als fester Ablauf statt als guter Vorsatz. Definierte Kundenfragen, mehrere KI-Systeme, gleicher Termin jeden Monat, Wettbewerber im Vergleich. Der Check läuft in allen Paketen mit, weil er die Grundlage für alles andere ist: Ohne Messung weißt du nicht, welche der fünf Baustellen bei dir überhaupt die wichtigste ist.

| Paket                                   | Starter    | Professional | Premium   |
| --------------------------------------- | ---------- | ------------ | --------- |
| **Monatspreis**                         | 299 €      | 499 €        | 799 €     |
| **KI-Sichtbarkeits-Check**              | als Basis  | als Basis    | als Basis |
| **Profile & Brancheneinträge \***       | 15         | 40           | 60+       |
| **KI-Texte pro Monat**                  | 2          | 4            | 8         |
| **Bewertungs-Management**               | Starthilfe | aktiv        | aktiv     |
| **Presse, Videos & Wissensdatenbanken** | –          | –            | ✓         |

\* Die angegebenen Profile & Brancheneinträge (15 / 40 / 60+) werden über die gesamte Mindestlaufzeit von 6 Monaten aufgebaut – nicht pro Monat.

Und weil Messung ohne Konsequenz wenig wert ist: Zeigt der KI-Sichtbarkeits-Check nach 90 Tagen keine Bewegung, ist der Rest der Laufzeit kostenlos. Das ist keine Garantie auf eine Nennung – die kann niemand geben –, sondern die Zusage, dass das Risiko nicht allein bei dir liegt.

## Fazit: Zähl nicht die Klicks, zähl die Nennungen

In einem Satz: **KI-Sichtbarkeit misst man nicht am Traffic, sondern daran, ob dein Betrieb bei den Fragen deiner Kunden genannt wird – der Prompt-Test ist die Messung, alles andere ist Kontext.**

Die Lage in drei Zahlen: KI-Suchsysteme schicken 2026 erst 0,32 Prozent aller Website-Besuche, einen von 312 – wer dort den Beweis sucht, sucht am falschen Ort. 60 Prozent dieses Traffics landet auf der Startseite, nicht auf deinen Unterseiten. Und Googles neue KI-Berichte in der Search Console zeigen seit dem 31. August 2026 weltweit Impressionen aus drei KI-Flächen, aber keine Klicks.

Für Thomas, den Elektromeister mit seinen 14 Besuchen, heißt das: Die 14 Besuche sind nicht die Antwort auf seine Frage. Die Antwort steht in einer Tabelle, die er noch nicht angelegt hat – zehn Fragen, drei Systeme, einmal im Monat, und eine Spalte im Auftragsbuch, in der steht, wie der Kunde auf ihn gekommen ist.

Leg beides heute an. In drei Monaten weißt du mehr über deine KI-Sichtbarkeit als die meisten Betriebe in deiner Stadt – und kannst jedes Angebot, das auf deinem Tisch landet, an der einzigen Frage messen, die zählt: Woran zeigt ihr mir, dass es wirkt?

## Häufige Fragen

### Wie messe ich, ob meine KI-Sichtbarkeit besser wird?

Über einen festen Prompt-Test: Leg zehn Fragen fest, wie deine Kunden sie stellen würden, prüfe sie einmal im Monat in ChatGPT, Google-KI und einem dritten System in einem Fenster ohne Anmeldung, und notiere jedes Mal, ob und an welcher Stelle du genannt wirst und wer sonst vorkommt. Entscheidend ist, dass Fragen, Systeme und Termin gleich bleiben – sonst vergleichst du Äpfel mit Birnen. Ergänzend schaust du in die KI-Berichte der Google Search Console und in den Analytics-Kanal „AI Assistant". Die wichtigste Zahl erhebst du aber selbst: Frag jeden neuen Kunden, wie er auf dich gekommen ist.

### Warum sehe ich in Google Analytics kaum Besucher aus ChatGPT?

Weil der direkte Traffic aus KI-Systemen 2026 noch sehr klein ist: Laut einer SE-Ranking-Auswertung von 101.574 Websites vom Juni 2026 stammen 0,32 Prozent aller Website-Besuche aus KI-Suchmaschinen, also etwa einer von 312. Dazu kommt, dass ein großer Teil gar nicht als KI-Besuch erkennbar ist – Besuche ohne Referrer landen unter „Direkt", AI Overviews zählen als organische Suche, und viele Menschen merken sich die Empfehlung und rufen später einfach an. Eine niedrige Zahl in Analytics ist deshalb kein Beweis, dass GEO nicht wirkt.

### Zeigt die Google Search Console jetzt KI-Daten an?

Ja, seit 2026 gibt es eigene Berichte für generative KI-Funktionen. Google hat sie im Juni 2026 eingeführt und am 31. August 2026 gemeldet, dass sie weltweit für alle Websites ausgerollt sind. Sie zeigen Impressionen aus AI Overviews, AI Mode und generativen Funktionen in Discover, aufgeschlüsselt nach Seite, Land, Gerät und Datum. Klickdaten enthalten sie ausdrücklich nicht. Seiten mit sehr wenigen KI-Impressionen sehen unter Umständen gar keinen Bericht.

### Wie lange dauert es, bis GEO messbar wirkt?

Realistisch acht bis zwölf Wochen, bis sich im Prompt-Test etwas bewegt – und auch dann eher als Richtung über mehrere Monate als als Sprung von einem Monat auf den nächsten. KI-Systeme aktualisieren ihr Bild von einem Betrieb nicht tagesaktuell, sondern über Quellen Dritter: Verzeichnisse, Bewertungen, Erwähnungen. Genau deshalb ist die monatliche Messung ab dem ersten Monat wichtig, auch wenn am Anfang nichts passiert: Ohne Startwert kannst du später keine Veränderung zeigen.

### Woran erkenne ich ein unehrliches GEO-Reporting?

An Zahlen, die du nicht selbst nachprüfen könntest. Ein „Sichtbarkeitsindex", den nur der Anbieter berechnet, ein Prozentwert ohne Bezugsgröße, eine steigende Kurve ohne Angabe, was gemessen wurde – das sind Dekorationen, keine Messwerte. Ein ehrlicher Report nennt die geprüften Fragen im Wortlaut, die geprüften Systeme, das Messintervall und die Wettbewerber, die stattdessen genannt wurden. Und er sagt dazu, was die Zahlen nicht zeigen.


## Quellen

- [Google Search Central: Introducing Search Generative AI performance reports in Search Console (Juni 2026, weltweiter Rollout abgeschlossen am 31. August 2026)](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
- [Search Engine Journal: Google Search Console AI Reports Rolled Out Worldwide (31. August 2026)](https://www.searchenginejournal.com/google-search-console-ai-reports-rolled-out-worldwide/587836/)
- [Search Engine Journal: Google Analytics Adds AI Assistant As Default Channel Group (14. Mai 2026)](https://www.searchenginejournal.com/google-analytics-adds-ai-assistant-as-default-channel-group/574974/)
- [SE Ranking: AI traffic grew 16x from 2024 to 2026 – Analyse von 101.574 Websites (18. Juni 2026)](https://seranking.com/blog/ai-traffic-research-study/)
- [SE Ranking: Referral traffic from ChatGPT hit its all-time peak, jumping 36.7% in May 2026 (9. Juli 2026)](https://seranking.com/blog/chatgpt-referral-traffic-may-2026/)

---

© regionalflat.de — Zitieren erwünscht mit Quellenangabe und Link auf https://regionalflat.de/impulse/ki-sichtbarkeit-messen-woran-du-erkennst-dass-geo-wirkt/
