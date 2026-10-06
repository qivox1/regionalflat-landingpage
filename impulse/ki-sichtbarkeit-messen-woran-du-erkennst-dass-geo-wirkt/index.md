# Woran erkennen Sie, dass GEO wirkt? So messen Sie KI-Sichtbarkeit ohne Agentur-Dashboard

> Analytics zeigt fast nichts, die Search Console keine Klicks – so messen Sie als regionaler Betrieb trotzdem sauber, ob die KI Sie öfter empfiehlt.

**Autorin:** Anja (Gründerin & Inhaberin von regionalflat) · **Veröffentlicht:** 21. September 2026 · **Lesezeit:** 12 Min.
**Quelle:** https://regionalflat.de/impulse/ki-sichtbarkeit-messen-woran-du-erkennst-dass-geo-wirkt/

---

## Warum sehen Sie in Ihren Zahlen fast nichts, obwohl die KI Sie empfiehlt?

Stellen Sie sich einen Elektromeister vor, nennen wir ihn Thomas, vier Mitarbeiter, ein Standort. Seit drei Monaten lässt er etwas dafür tun, dass die KI seinen Betrieb empfiehlt. Profile aufgeräumt, Leistungsseiten neu geschrieben, Bewertungen eingesammelt. Jetzt sitzt er abends vor Google Analytics, klickt sich durch die Berichte und findet: 14 Besuche aus ChatGPT. Vierzehn. In drei Monaten.

Sein erster Gedanke ist der naheliegende: Das war rausgeworfenes Geld.

Sein zweiter Gedanke wäre der richtige: Vielleicht misst er die falsche Zahl.

**Der Traffic, den KI-Systeme direkt auf Ihre Website schicken, ist 2026 noch sehr klein – und er ist auch nicht das, was GEO leisten soll.** Die Auswertung von 101.574 Websites, die SE Ranking im Juni 2026 veröffentlicht hat, zeigt: KI-Suchmaschinen stehen weltweit für **0,32 Prozent aller Website-Besuche**. Das ist rund einer von 312 Besuchen. Gewachsen ist das gewaltig – von 0,02 Prozent 2024 über 0,24 Prozent 2025 auf jetzt 0,32 Prozent, also das Sechzehnfache in weniger als zwei Jahren. Aber die absolute Zahl bleibt klein. Bei einer Handwerker-Website mit 800 Besuchen im Monat sind 0,32 Prozent genau zweieinhalb Besuche.

Wer also in Analytics nachschaut und dort den Beweis sucht, wird ihn nicht finden. Nicht, weil nichts passiert, sondern weil die Wirkung an einer anderen Stelle entsteht: Jemand fragt die KI nach einem Elektriker, bekommt drei Namen genannt, merkt sich einen – und ruft am nächsten Tag an oder tippt den Firmennamen bei Google ein. Dieser Weg hinterlässt in Ihrem Analytics keine Spur, die „ChatGPT" heißt.

Das ist die unbequeme Grundlage jeder ehrlichen Messung: **KI-Sichtbarkeit wirkt überwiegend als Empfehlung, nicht als Klick.** Und Empfehlungen misst man anders.

## Was können Sie überhaupt messen – und was nicht?

Es hilft, sich die vier Messpunkte einmal nebeneinanderzulegen. Jeder zeigt etwas anderes, keiner zeigt alles.

| Messpunkt | Was er Ihnen zeigt | Was er Ihnen nicht zeigt | Aufwand |
| --- | --- | --- | --- |
| **Prompt-Test** | Werden Sie bei echten Kundenfragen genannt? An welcher Stelle? Wer sonst? | Wie viele Menschen diese Frage tatsächlich stellen | 20–40 Min. pro Monat |
| **Search Console (KI-Berichte)** | Wie oft Ihre Seiten in Googles KI-Antworten als Quelle auftauchen | Klicks – die weist Google hier nicht aus | 5 Min. pro Monat |
| **Analytics (Kanal „AI Assistant")** | Wie viele Menschen aus einem KI-Chat heraus auf Ihre Seite klicken | Alle, die sich Ihren Namen nur gemerkt und später direkt angerufen haben | 5 Min. pro Monat |
| **Anfragen-Herkunft** | Was am Ende zählt: Kommen neue Kunden, und woher? | Den technischen Weg dorthin | 10 Sek. pro Anfrage |

Die vierte Zeile ist die wichtigste und die, die fast niemand konsequent macht. Dazu später mehr.

## Wie lesen Sie die neuen KI-Berichte in der Google Search Console?

Hier ist 2026 tatsächlich etwas passiert, das Ihnen hilft. Google hat im Juni 2026 eigene Berichte für generative KI-Funktionen in der Search Console eingeführt und meldete am **31. August 2026**, dass sie weltweit für alle Websites ausgerollt sind.

Was drinsteht: **Impressionen aus drei KI-Flächen** – AI Overviews (die KI-Antwort über den Suchergebnissen), AI Mode (Googles Chat-Modus) und generative Funktionen in Discover. Aufgeschlüsselt nach Seite, Land, Gerät und Datum. Sie sehen also zum ersten Mal schwarz auf weiß, welche Ihrer Seiten Google für KI-Antworten heranzieht.

Was nicht drinsteht: **Klickdaten.** Google weist in diesen Berichten Impressionen aus, keine Klicks. Das ist keine Lücke, die Sie durch geschicktes Filtern schließen können – die Zahl existiert dort schlicht nicht.

So gehen Sie praktisch vor:

1. Search Console öffnen, links unter „Leistung" den Bericht für generative KI-Funktionen wählen.
2. Einen festen Zeitraum nehmen, etwa die letzten 28 Tage, und ihn jeden Monat gleich lassen.
3. Zwei Zahlen notieren: Gesamtimpressionen und die drei Seiten mit den meisten Impressionen.
4. Diese drei Seiten sind Ihre Arbeitsliste. Was Google für KI-Antworten benutzt, funktioniert – davon brauchen Sie mehr.

Zwei Einschränkungen, die Sie kennen sollten: Google hat gesagt, dass Seiten mit zu wenigen KI-Impressionen möglicherweise gar keinen Bericht sehen. Und die Hilfeseiten wiesen auch nach dem Rollout noch darauf hin, dass nicht jede Property sofort Zugriff hat. Wenn Sie den Bericht nicht finden, ist das also nicht automatisch ein schlechtes Zeichen.

## Wie erkennen Sie KI-Besucher in Google Analytics?

Auch hier hat sich 2026 etwas Handfestes geändert. Seit Mai 2026 hat Google Analytics 4 eine eigene Standard-Kanalgruppe **„AI Assistant"**. Besuche aus erkannten KI-Assistenten – Google nennt ChatGPT, Gemini und Claude als Beispiele – bekommen automatisch das Medium `ai-assistant` und landen nicht mehr im Sammelbecken „Verweise". Sie müssen dafür nichts einrichten.

Drei Dinge, die Sie dabei wissen müssen, sonst lesen Sie die Zahl falsch:

**Erstens: Nicht alles landet dort.** Perplexity taucht weiter unter „Verweise" auf, Besuche aus Googles AI Overviews zählen als organische Suche, und ein großer Teil des KI-Traffics kommt ganz ohne Referrer an – etwa aus App-internen Browsern oder wenn jemand den Link kopiert. Diese Besuche stehen bei Ihnen unter „Direkt".

**Zweitens: Die Umstellung wirkt nicht rückwirkend.** Was vor Mai 2026 passiert ist, bleibt in den alten Kategorien. Vergleiche mit dem Vorjahr führen Sie also in die Irre.

**Drittens – und das ist die praktischste Erkenntnis: Schauen Sie auf die Startseite.** Nach der SE-Ranking-Auswertung vom Juli 2026 landen **60 Prozent des KI-Traffics auf der Startseite**, gegenüber nur 17 Prozent bei organischer Suche. KI-Systeme schicken Menschen zur Marke, nicht zum passenden Unterartikel. Wenn Ihre Startseite also nicht in drei Sekunden beantwortet, was Sie machen, für wen und wo – dann verlieren Sie genau die Besucher, die Ihnen die KI geschickt hat.

Dabei ist die Website mehr als ein Landeplatz: Google, Google Maps und KI-Systeme greifen für ihre Angaben über Ihren Betrieb immer wieder auf sie zurück und gleichen Profil, Einträge und Bewertungen mit ihr ab. Ist sie aktuell, schnell, fürs Handy gemacht und beschreibt sie Ihre Leistungen klar, stützt sie jeden der vier Messpunkte – ist sie veraltet oder lückenhaft, bremst sie alle. Sie ist die Quelle, die Sie selbst vollständig in der Hand haben.

## Warum ist der Prompt-Test die wichtigste Messung – und wie machen Sie ihn richtig?

Weil er die einzige Messung ist, die direkt zeigt, was Sie wissen wollen: Werden Sie empfohlen?

Alles andere misst Folgen. Der Prompt-Test misst die Sache selbst. Und er kostet Sie nichts außer einer halben Stunde im Monat. Den Einstieg dazu haben wir ausführlich in [So testen Sie Ihre KI-Sichtbarkeit in 15 Minuten](/impulse/so-testest-du-deine-ki-sichtbarkeit-in-15-minuten/) beschrieben – hier geht es um die Disziplin, die aus einem einmaligen Test eine Messung macht.

**Legen Sie zehn Fragen fest und ändern Sie sie nicht mehr.** Das ist die wichtigste Regel. Eine Messung, deren Fragen sich jeden Monat ändern, ist keine Messung. Nehmen Sie Fragen, wie Ihre Kunden sie stellen würden, nicht wie Sie sie formulieren würden: „Wer kann mir in Minden eine Wallbox installieren?" statt „Elektroinstallation Minden".

**Prüfen Sie in mindestens drei Systemen.** ChatGPT, Google-KI und ein drittes nach Wahl. Immer dieselben.

**Nutzen Sie ein frisches Fenster ohne Anmeldung.** Sonst antwortet Ihnen die KI auf Basis Ihrer eigenen Historie – und Sie messen sich selbst.

**Notieren Sie pro Frage drei Dinge:** Werden Sie genannt, ja oder nein? An welcher Stelle, falls ja? Und welche anderen Betriebe werden genannt? Die dritte Spalte ist die, die Ihnen am meisten sagt. Wenn immer dieselben zwei Wettbewerber vorkommen, schauen Sie sich an, wo die zitiert werden – das ist Ihre To-do-Liste.

**Messen Sie immer am selben Tag im Monat.** KI-Antworten schwanken, und zwar erheblich. Eine einzelne Abfrage ist ein Schnappschuss, kein Messwert. Erst die Reihe über vier, fünf, sechs Monate zeigt eine Richtung.

Und die ehrliche Erwartung dazu: **Die erste Bewegung sehen Sie realistisch nach acht bis zwölf Wochen**, nicht nach zwei. KI-Systeme aktualisieren ihr Bild von Ihrem Betrieb nicht, weil Sie am Montag eine Seite geändert haben.

## Welche Zahl zeigt am Ende, ob sich das Ganze rechnet?

Die, die Sie selbst erheben müssen – und die keine Software Ihnen liefert: **Woher kommen Ihre Anfragen?**

Das ist keine technische Messung, sondern eine organisatorische. Jeder, der bei Ihnen anruft, ein Formular ausfüllt oder in den Laden kommt, bekommt eine Frage gestellt: „Darf ich fragen, wie Sie auf uns gekommen sind?" Die Antwort wird in einer Spalte notiert. Mehr nicht.

Nach drei Monaten haben Sie etwas, das kein Dashboard dieser Welt hat: die echte Herkunft Ihrer Kunden. Und die Antworten klingen nie nach „GEO". Sie klingen nach: „Ich hab ChatGPT gefragt und Sie waren dabei." Oder: „Google hat oben so eine Antwort angezeigt, da standen Sie." Oder: „Empfehlung von meinem Nachbarn" – auch das ist ein Ergebnis, nur eben keins, das Sie sich ans Revers heften können.

Der Grund, warum das die entscheidende Messung ist: Sie fängt genau den Weg ein, der Ihnen in Analytics entgeht – Empfehlung merken, später direkt kommen. Wer nur die Kanäle zählt, misst den kleineren Teil der Wirkung.

Was Sie daraus rechnen, haben wir in [Was kostet GEO wirklich?](/impulse/was-kostet-geo-wirklich-anbieter-check-ki-sichtbarkeit/) durchgerechnet: Auftragswert mal zusätzliche Anfragen gegen die Monatskosten. Ohne die Herkunftsfrage fehlt Ihnen dafür die einzige Zahl, die zählt.

## Wie sieht ein ehrliches Monatsreporting auf einer DIN-A4-Seite aus?

So sieht es aus, wenn es gut gemacht ist – und es passt auf eine Seite:

**Oben: die Prompt-Tabelle.** Zehn Fragen, drei Systeme, ein Häkchen oder ein Strich. Darunter eine einzige Zahl: In wie vielen der 30 Abfragen kamen Sie vor? Diesen Monat, letzten Monat, vor drei Monaten.

**Darunter: die Wettbewerber.** Welche Namen tauchten wie oft auf? Wer ist neu dazugekommen?

**Dann: zwei Zahlen aus den Google-Werkzeugen.** KI-Impressionen aus der Search Console. Besuche aus dem Kanal „AI Assistant" in Analytics. Beide mit Vormonatsvergleich, beide mit dem Hinweis, dass sie nur einen Ausschnitt zeigen.

**Unten: die Anfragen.** Wie viele, und wie viele davon nannten eine KI als Quelle.

**Und ganz unten: ein Satz, was diesen Monat getan wurde.** Nicht fünf Seiten Maßnahmenbericht – ein Satz.

Was in einem ehrlichen Report **nicht** vorkommt: ein „Sichtbarkeitsindex", den nur der Anbieter berechnen kann. Ein Prozentwert ohne Bezugsgröße. Eine hübsche Kurve, die nach oben zeigt, ohne dass irgendwo steht, was gemessen wurde. Wenn Sie in einem Report eine Zahl finden, die Sie nicht selbst nachprüfen könnten, fragen Sie nach, wie sie entsteht. Bekommen Sie darauf keine klare Antwort, ist die Zahl Dekoration.

## So unterstützt regionalflat Ihren Betrieb

Grundlage jedes regionalflat-Pakets ist Ihre neue Website – aktuell, schnell und mit klaren Leistungstexten. Darauf aufbauend arbeitet das Paket nach demselben Prinzip wie dieser Artikel: Jeden Monat bekommen Sie einen Bericht auf einer Seite – mit Anrufen, Anfragen, Bewertungen und vier Ampeln, die zeigen, ob Ihr Betrieb in Google Maps, in der Google-Suche, in der KI und mit seiner Website die erste Wahl ist. Nachprüfbar statt Fantasie-Index.

| | Starter | Professional | Premium |
| --- | --- | --- | --- |
| **Monatspreis (zzgl. MwSt.)** | 299 € | 499 € | 799 € |
| **Wofür** | ordentlich auftreten | mehr Anfragen | Anfragen und neue Mitarbeiter |
| Website mit Hosting, Sicherheit und Pflege | ✓ | ✓ | ✓ |
| Google-Profil gepflegt | ✓ | ✓ | ✓ |
| Monatsbericht mit vier Ampeln | ✓ | ✓ | ✓ |
| Neue Fachseiten pro Monat | – | 2 | 4 |
| Gefunden werden in ChatGPT & Co. | Grundlage | ✓ | ✓ |
| Mehr Google-Bewertungen (QR-Karten, Erinnerung) | – | ✓ | ✓ |
| Karriereseite | – | ✓ | ✓ |
| Stellen bei Google Jobs | – | – | ✓ |

Website und Hosting sind in jedem Paket enthalten, 0 € vorab. Mindestlaufzeit 12 Monate, danach monatlich kündbar. Feste Plätze bei Google oder in KI-Antworten verspricht niemand seriös – auch wir nicht. Alle Fakten: [regionalflat auf einen Blick](/fakten/) · [Pakete & Preise](/#pakete) · [Kostenloses Gespräch vereinbaren](/#termin)

## Fazit: Nicht die Klicks zählen, sondern die Nennungen

In einem Satz: **KI-Sichtbarkeit misst man nicht am Traffic, sondern daran, ob Ihr Betrieb bei den Fragen Ihrer Kunden genannt wird – der Prompt-Test ist die Messung, alles andere ist Kontext.**

Die Lage in drei Zahlen: KI-Suchsysteme schicken 2026 erst 0,32 Prozent aller Website-Besuche, einen von 312 – wer dort den Beweis sucht, sucht am falschen Ort. 60 Prozent dieses Traffics landet auf der Startseite, nicht auf Ihren Unterseiten. Und Googles neue KI-Berichte in der Search Console zeigen seit dem 31. August 2026 weltweit Impressionen aus drei KI-Flächen, aber keine Klicks.

Für Thomas, den Elektromeister mit seinen 14 Besuchen, heißt das: Die 14 Besuche sind nicht die Antwort auf seine Frage. Die Antwort steht in einer Tabelle, die er noch nicht angelegt hat – zehn Fragen, drei Systeme, einmal im Monat, und eine Spalte im Auftragsbuch, in der steht, wie der Kunde auf ihn gekommen ist.

Legen Sie beides heute an. In drei Monaten wissen Sie mehr darüber, ob die KI Ihren Betrieb empfiehlt, als die meisten Betriebe in Ihrer Stadt – und können jedes Angebot, das auf Ihrem Tisch landet, an der einzigen Frage messen, die zählt: Woran zeigen Sie mir, dass es wirkt?

## Häufige Fragen

### Wie messe ich, ob meine KI-Sichtbarkeit besser wird?

Über einen festen Prompt-Test: Legen Sie zehn Fragen fest, wie Ihre Kunden sie stellen würden, prüfen Sie sie einmal im Monat in ChatGPT, Google-KI und einem dritten System in einem Fenster ohne Anmeldung, und notieren Sie jedes Mal, ob und an welcher Stelle Sie genannt werden und wer sonst vorkommt. Entscheidend ist, dass Fragen, Systeme und Termin gleich bleiben – sonst vergleichen Sie Äpfel mit Birnen. Ergänzend schauen Sie in die KI-Berichte der Google Search Console und in den Analytics-Kanal „AI Assistant". Die wichtigste Zahl erheben Sie aber selbst: Fragen Sie jeden neuen Kunden, wie er auf Sie gekommen ist.

### Warum sehe ich in Google Analytics kaum Besucher aus ChatGPT?

Weil der direkte Traffic aus KI-Systemen 2026 noch sehr klein ist: Laut einer SE-Ranking-Auswertung von 101.574 Websites vom Juni 2026 stammen 0,32 Prozent aller Website-Besuche aus KI-Suchmaschinen, also etwa einer von 312. Dazu kommt, dass ein großer Teil gar nicht als KI-Besuch erkennbar ist – Besuche ohne Referrer landen unter „Direkt", AI Overviews zählen als organische Suche, und viele Menschen merken sich die Empfehlung und rufen später einfach an. Eine niedrige Zahl in Analytics ist deshalb kein Beweis, dass GEO nicht wirkt.

### Zeigt die Google Search Console jetzt KI-Daten an?

Ja, seit 2026 gibt es eigene Berichte für generative KI-Funktionen. Google hat sie im Juni 2026 eingeführt und am 31. August 2026 gemeldet, dass sie weltweit für alle Websites ausgerollt sind. Sie zeigen Impressionen aus AI Overviews, AI Mode und generativen Funktionen in Discover, aufgeschlüsselt nach Seite, Land, Gerät und Datum. Klickdaten enthalten sie ausdrücklich nicht. Seiten mit sehr wenigen KI-Impressionen sehen unter Umständen gar keinen Bericht.

### Wie lange dauert es, bis GEO messbar wirkt?

Realistisch acht bis zwölf Wochen, bis sich im Prompt-Test etwas bewegt – und auch dann eher als Richtung über mehrere Monate als als Sprung von einem Monat auf den nächsten. KI-Systeme aktualisieren ihr Bild von einem Betrieb nicht tagesaktuell, sondern über Quellen Dritter: Verzeichnisse, Bewertungen, Erwähnungen. Genau deshalb ist die monatliche Messung ab dem ersten Monat wichtig, auch wenn am Anfang nichts passiert: Ohne Startwert können Sie später keine Veränderung zeigen.

### Woran erkenne ich ein unehrliches GEO-Reporting?

An Zahlen, die Sie nicht selbst nachprüfen könnten. Ein „Sichtbarkeitsindex", den nur der Anbieter berechnet, ein Prozentwert ohne Bezugsgröße, eine steigende Kurve ohne Angabe, was gemessen wurde – das sind Dekorationen, keine Messwerte. Ein ehrlicher Report nennt die geprüften Fragen im Wortlaut, die geprüften Systeme, das Messintervall und die Wettbewerber, die stattdessen genannt wurden. Und er sagt dazu, was die Zahlen nicht zeigen.


## Quellen

- [Google Search Central: Introducing Search Generative AI performance reports in Search Console (Juni 2026, weltweiter Rollout abgeschlossen am 31. August 2026)](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
- [Search Engine Journal: Google Search Console AI Reports Rolled Out Worldwide (31. August 2026)](https://www.searchenginejournal.com/google-search-console-ai-reports-rolled-out-worldwide/587836/)
- [Search Engine Journal: Google Analytics Adds AI Assistant As Default Channel Group (14. Mai 2026)](https://www.searchenginejournal.com/google-analytics-adds-ai-assistant-as-default-channel-group/574974/)
- [SE Ranking: AI traffic grew 16x from 2024 to 2026 – Analyse von 101.574 Websites (18. Juni 2026)](https://seranking.com/blog/ai-traffic-research-study/)
- [SE Ranking: Referral traffic from ChatGPT hit its all-time peak, jumping 36.7% in May 2026 (9. Juli 2026)](https://seranking.com/blog/chatgpt-referral-traffic-may-2026/)

---

© regionalflat.de — Zitieren erwünscht mit Quellenangabe und Link auf https://regionalflat.de/impulse/ki-sichtbarkeit-messen-woran-du-erkennst-dass-geo-wirkt/
