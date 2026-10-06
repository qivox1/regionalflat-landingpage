# GPTBot, ClaudeBot & Co. in Ihrer robots.txt: Was Sie blockieren, ohne es zu wissen

> Ihr Hoster oder eine Cloudflare-Regel kann GPTBot & Co. aussperren, ohne dass Sie es merken. So prüfen Sie in 5 Minuten, wer Ihre Seite lesen darf.

**Autorin:** Anja Miebach (Gründerin & Inhaberin von regionalflat) · **Veröffentlicht:** 28. September 2026 · **Lesezeit:** 9 Min.
**Quelle:** https://regionalflat.de/impulse/ki-crawler-robots-txt-gptbot-was-du-blockierst-ohne-es-zu-wissen/

---

## Warum taucht Ihr Betrieb in der KI-Suche plötzlich nicht mehr auf, obwohl Sie nichts geändert haben?

Stellen Sie sich vor, Sie haben an Ihrer Website seit Monaten nichts angerührt. Kein neuer Text, keine neue Einstellung, kein Update, das Sie bewusst angestoßen haben. Trotzdem taucht Ihr Betrieb im Prompt-Test diesen Monat plötzlich seltener auf als im letzten. Die naheliegende Erklärung – „die KI hat sich eben geändert" – stimmt manchmal. Manchmal stimmt aber eine andere, viel banalere Erklärung: Irgendwo zwischen Ihrem Hoster, einem Sicherheits-Plugin und einer technischen Voreinstellung, von der Sie nie gehört haben, hat sich entschieden, welche KI-Systeme Ihre Seite überhaupt noch lesen dürfen.

Das ist keine Verschwörungstheorie, sondern seit diesem Jahr ein dokumentiertes, mehrfach belegtes Phänomen. Cloudflare hat am **1. Juli 2026** angekündigt, ab dem **15. September 2026** die Voreinstellungen im eigenen Netzwerk zu ändern: Bots, die als „Training" oder „Agent" eingestuft werden, sind auf werbefinanzierten Seiten seither standardmäßig blockiert. Wer nichts getan hat, bekam an diesem Tag automatisch neue Regeln – nicht durch einen Angriff, sondern durch eine neue Voreinstellung des eigenen Sicherheitsdienstleisters. Cloudflare sitzt vor einem großen Teil des Internets als CDN und Bot-Schutz, oft eingebunden von Hostern, ohne dass der Website-Betreiber es aktiv gewählt hat.

Und das ist nur eine von mehreren Stellen, an denen sich still etwas ändern kann. Dieser Artikel zeigt Ihnen, welche KI-Crawler es überhaupt gibt, warum „GPTBot blockiert" und „in ChatGPT nicht mehr zitiert" zwei unterschiedliche Dinge sein können – und wie Sie in wenigen Minuten prüfen, was bei Ihnen tatsächlich passiert.

## Was ist ein KI-Crawler eigentlich – und was hat robots.txt damit zu tun?

Ein Crawler ist ein automatisiertes Programm, das Websites abruft, so wie ein Browser es tun würde, nur ohne Mensch davor. Google macht das seit 25 Jahren mit dem Googlebot, um seinen Suchindex zu bauen. KI-Anbieter tun heute etwas Ähnliches, aber mit unterschiedlichen Zielen: Manche Crawler sammeln Texte, um damit ein Sprachmodell zu trainieren. Andere rufen Ihre Seite in dem Moment ab, in dem ein Nutzer der KI eine Frage stellt, um eine aktuelle, zitierfähige Antwort zu bauen.

Die `robots.txt` ist eine einfache Textdatei im Hauptverzeichnis Ihrer Domain (erreichbar unter `ihre-domain.de/robots.txt`), in der Sie – auf Vertrauensbasis, nicht technisch erzwungen – festlegen, welche Crawler welche Bereiche Ihrer Seite besuchen dürfen. Seriöse Anbieter wie OpenAI, Anthropic oder Perplexity halten sich an diese Datei. Sie ist damit Ihr wichtigster, aber eben auch Ihr einzig sichtbarer Hebel: Was dort steht, können Sie selbst lesen. Was zusätzlich auf Server- oder CDN-Ebene passiert, meistens nicht.

Die wichtigsten Namen, die in einer robots.txt heute auftauchen können:

| Crawler | Betreiber | Zweck |
| --- | --- | --- |
| **GPTBot** | OpenAI | Sammelt Inhalte für das Training zukünftiger Modelle |
| **OAI-SearchBot** | OpenAI | Crawlt für die Websuche in ChatGPT – Grundlage für Zitate in Echtzeit-Antworten |
| **ClaudeBot** | Anthropic | Sammelt Inhalte für das Training von Claude |
| **PerplexityBot** | Perplexity | Crawlt für den Suchindex, aus dem Perplexity-Antworten zitieren |
| **Google-Extended** | Google | Steuert separat von der normalen Google-Suche, ob Inhalte fürs Training von Gemini genutzt werden dürfen |
| **CCBot** | Common Crawl | Öffentlicher Datensatz, der von vielen KI-Anbietern als Trainingsgrundlage genutzt wird |

Der Punkt, der in der Praxis am meisten Verwirrung stiftet: **Trainings-Crawler und Antwort-Crawler sind nicht dasselbe – auch wenn sie vom selben Unternehmen stammen.**

## Warum blockieren so viele Websites GPTBot – und was übersehen sie dabei?

Genau hier liegt der eigentliche Stolperstein, und er ist inzwischen sauber vermessen. Eine Analyse von robots.txt-Regeln im Cloudflare-Netzwerk zeigt für den Stand **31. August 2026**: GPTBot wird **2,33-mal so oft blockiert wie erlaubt**. Website-Betreiber sind beim Trainings-Crawler von OpenAI also mehrheitlich vorsichtig – nachvollziehbar, wenn man nicht will, dass die eigenen Texte unbezahlt in ein Sprachmodell einfließen.

Der auffällige Unterschied: OAI-SearchBot, der Zitier-Crawler für ChatGPTs Websuche, wird laut derselben Auswertung sogar **minimal öfter erlaubt als blockiert** (Verhältnis 0,94:1). Die Betreiber, die beide Bots bewusst unterschiedlich behandeln, tun also offenbar genau das Richtige: Training ablehnen, Zitate in Antworten zulassen.

Das Problem ist die Gruppe, die das nicht bewusst unterscheidet. Eine unabhängige Auswertung der robots.txt-Dateien der 5.000 größten Websites, veröffentlicht am **8. September 2026** und am 19. September noch einmal aktualisiert, kommt zu einem konkreten Ergebnis: 535 der 5.000 Seiten blockieren GPTBot. Von diesen 535 blockieren **238 – also 44,5 Prozent – dabei auch gleich OAI-SearchBot mit**, meist über eine pauschale Regel, die „GPT" oder „OpenAI" als Ganzes sperrt. Die Autorin beschreibt das treffend als „eine pauschale Regel, die niemand bewusst so entschieden hat" – anders als bei großen Plattformen wie Facebook oder Amazon, wo die Trennung offenbar eine bewusste Lizenz-Entscheidung war, wirkt es bei den meisten übrigen Seiten wie ein Versehen.

Für einen regionalen Betrieb heißt das übersetzt: Wer irgendwann eine robots.txt-Regel „gegen ChatGPT" aus einem Blogartikel oder Forenpost kopiert hat, um sein Trainingsdaten-Risiko zu begrenzen, hat mit derselben Zeile möglicherweise auch dafür gesorgt, dass er in aktuellen ChatGPT-Suchantworten gar nicht erst als Quelle infrage kommt.

Das wiegt schwer, weil Ihre Website für Google, ChatGPT und andere KI-Systeme die wichtigste Quelle über Ihren Betrieb ist, die Sie selbst vollständig in der Hand haben: Angaben aus Google-Profil, Verzeichnissen und Bewertungen werden immer wieder mit ihr abgeglichen. Darf ein Antwort-Crawler sie nicht lesen, bleibt selbst eine aktuelle, schnelle, fürs Handy gemachte Website mit klaren Leistungstexten ungenutzt – und die KI stützt sich auf das, was andere über Sie schreiben.

## Kann mein Hoster oder ein Plugin KI-Crawler blockieren, ohne dass ich es sehe?

Ja – und das ist der Teil, der sich am wenigsten kontrollieren lässt, weil er unterhalb Ihrer eigenen Einstellungen passiert. Ein dokumentierter Fall aus dem Mai 2026: Beim großen Managed-WordPress-Hoster WP Engine läuft ein „standardmäßig aktiver, für Kunden nicht abschaltbarer" Block bestimmter KI-Bots auf Plattform-Ebene – unterhalb von WordPress-Plugins, unterhalb eines eigenen Cloudflare-Kontos, ohne Schalter im Kundenportal. Die Sperre zeigt sich technisch nicht als klare Ablehnung, sondern als Rate-Limit-Fehler, der eher nach einem Serverproblem aussieht als nach einer bewussten Blockade – wodurch sie in der Fehlersuche leicht übersehen wird. Andere große Anbieter wie Kinsta oder Pressable blockieren nach eigenen Angaben nicht standardmäßig, sondern lassen es die Kundschaft selbst entscheiden.

Der Fall zeigt kein branchenweites Ausmaß – er ist eine dokumentierte Einzelbeobachtung, keine Umfrage unter allen Hostern. Aber er zeigt das Prinzip, das für jeden Website-Betreiber relevant ist: **Ihre robots.txt ist nicht die einzige Stelle, an der über KI-Crawler entschieden wird.** Hoster, Sicherheits-Plugins, ein CDN wie Cloudflare oder ein Firewall-Dienst können zusätzlich – und unabhängig von dem, was in Ihrer robots.txt steht – Zugriffe blockieren oder ausbremsen. Das ist weder böswillig noch ein Fehler des Anbieters, sondern schlicht eine Voreinstellung, die für Sicherheit gedacht war und KI-Crawler in denselben Topf wirft wie Spam-Bots.

## Wie prüfen Sie in 5 Minuten, wer Ihre Website wirklich lesen darf?

Vollständige Sicherheit gibt es ohne technische Unterstützung nicht – aber eine ehrliche erste Einschätzung schon:

1. **robots.txt direkt aufrufen.** Tippen Sie `ihre-domain.de/robots.txt` in den Browser. Suchen Sie nach den Namen aus der Tabelle oben (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot). Steht dort `Disallow: /` unter einem dieser Namen, blockieren Sie diesen Bot bewusst oder unbewusst vollständig.
2. **Auf Wildcard-Regeln achten.** Eine Zeile wie `User-agent: *` gefolgt von `Disallow: /` blockiert *alle* Bots, die nicht extra genannt werden – das trifft dann auch KI-Crawler, selbst wenn Sie eigentlich nur eine Testumgebung oder eine alte Unterseite sperren wollten.
3. **Beim Hoster nachfragen, ob es eine Bot-Management-Einstellung gibt.** Viele Hosting- und CDN-Anbieter haben eigene Oberflächen für „Bot-Schutz" oder „Firewall-Regeln", die unabhängig von der robots.txt greifen. Eine kurze Support-Anfrage („Blockieren Sie standardmäßig KI-Crawler wie GPTBot oder ClaudeBot?") klärt das schneller als jede Recherche von außen.
4. **Wenn Cloudflare im Spiel ist, die eigenen Bot-Einstellungen prüfen.** Seit dem 15. September 2026 lohnt sich ein Blick in die Sicherheitseinstellungen des Cloudflare-Kontos (oder die Nachfrage beim Hoster, der Cloudflare im Hintergrund nutzt), ob die neuen Voreinstellungen „Training" und „Agent" blockieren – und ob das so gewollt ist.
5. **Unterscheiden, was Sie wirklich wollen.** Wollen Sie grundsätzlich kein Trainingsmaterial liefern? Dann ist das Blockieren von GPTBot, ClaudeBot & Co. eine legitime, bewusste Entscheidung. Wollen Sie in aktuellen KI-Antworten zitiert werden? Dann achten Sie gezielt darauf, dass die Antwort- und Suchcrawler (OAI-SearchBot, PerplexityBot in seiner Antwortfunktion) nicht mitblockiert werden.

Genau diese Unterscheidung – Training versus Antwort – ist der Kern der dritten Stellschraube aus [Die 3 Stellschrauben, mit denen regionale Betriebe in KI-Antworten auftauchen](/impulse/3-stellschrauben-damit-regionale-betriebe-in-ki-antworten-auftauchen/): Technik ist dort bewusst als „Spezialistensache" markiert, weil genau solche Details – ein Bot-Name, eine Wildcard-Regel, eine Voreinstellung beim Hoster – darüber entscheiden, ob die KI Ihren Betrieb überhaupt kennt, ohne dass sie im Tagesgeschäft je auffallen.

## So unterstützt regionalflat Ihren Betrieb

Grundlage jedes regionalflat-Pakets ist Ihre neue Website – und weil das Hosting dazugehört, liegen robots.txt und Server-Einstellungen bei uns statt irgendwo zwischen Hoster und Plugin. Darauf aufbauend achten wir darauf, dass die Antwort-Crawler von ChatGPT & Co. Ihre Seite lesen dürfen – auch dann, wenn sich Voreinstellungen still ändern, wie bei Cloudflare am 15. September 2026.

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

## Fazit: Nachprüfen statt vermuten

In einem Satz: **Ob GPTBot, ClaudeBot oder OAI-SearchBot Ihre Website lesen dürfen, entscheidet heute nicht nur Ihre robots.txt, sondern manchmal auch Ihr Hoster, ein Sicherheits-Plugin oder eine neue Cloudflare-Voreinstellung – und das lässt sich nachprüfen, ohne Fachchinesisch.**

Drei Zahlen zum Mitnehmen: GPTBot wird auf Websites im Cloudflare-Netzwerk 2,33-mal so oft blockiert wie erlaubt, während der Zitier-Crawler OAI-SearchBot sogar leicht öfter erlaubt wird – die bewusste Trennung funktioniert also bei vielen. Bei anderen nicht: 44,5 Prozent der Top-5.000-Websites, die GPTBot blockieren, blockieren dabei versehentlich auch ihre Zitierfähigkeit in ChatGPT mit. Und seit dem 15. September 2026 hat Cloudflare seine eigenen Voreinstellungen geändert – wer nichts tat, hat trotzdem neue Regeln bekommen.

Der nächste Schritt kostet Sie fünf Minuten: Rufen Sie Ihre `robots.txt` auf, schauen Sie, was dort steht, und fragen Sie im Zweifel einmal bei Ihrem Hoster nach. Wenn Sie wissen wollen, ob sich das überhaupt in echten KI-Antworten bemerkbar macht, finden Sie die passende Anleitung dafür in [So testen Sie Ihre KI-Sichtbarkeit in 15 Minuten](/impulse/so-testest-du-deine-ki-sichtbarkeit-in-15-minuten/).

## Häufige Fragen

### Was ist GPTBot und muss ich ihn blockieren?

GPTBot ist der Crawler, mit dem OpenAI Website-Inhalte für das Training seiner Modelle sammelt. Blockieren müssen Sie ihn nicht – das ist eine Wertentscheidung, keine technische Pflicht. Wichtig ist nur: GPTBot ist nicht derselbe Bot, der ChatGPT in Echtzeit-Antworten mit Zitaten aus Ihrer Website versorgt. Dafür ist OAI-SearchBot zuständig. Wer beide pauschal mit derselben Regel blockiert, verliert unter Umständen genau die Sichtbarkeit, die er eigentlich will.

### Was ist der Unterschied zwischen GPTBot und OAI-SearchBot?

GPTBot crawlt für das Training zukünftiger Modelle – die Inhalte fließen langfristig in das allgemeine „Wissen" der KI ein. OAI-SearchBot crawlt dagegen für die Websuche innerhalb von ChatGPT und ist die Grundlage dafür, dass Ihre Seite in einer aktuellen Antwort als Quelle zitiert wird. Beide senden unterschiedliche User-Agent-Kennungen und lassen sich in der robots.txt einzeln steuern. Eine Wildcard-Regel wie „Disallow für alle GPT-Bots" trifft in der Praxis oft beide auf einmal.

### Woher weiß ich, ob mein Hoster oder ein Plugin KI-Crawler blockiert, ohne dass ich es eingestellt habe?

Schauen Sie zuerst in die robots.txt Ihrer Domain (angehängt an die Adresse, z. B. ihre-domain.de/robots.txt) und suchen Sie nach Einträgen wie GPTBot, ClaudeBot, PerplexityBot oder Google-Extended. Das zeigt aber nur die halbe Wahrheit: Manche Hoster und Sicherheits-Dienste blockieren zusätzlich auf Server- oder CDN-Ebene, unterhalb der robots.txt und unterhalb Ihrer Plugins. Das lässt sich nur über die Bot-Management- oder Sicherheitseinstellungen Ihres Hosters bzw. über einen direkten Abruf mit dem passenden User-Agent prüfen – im Zweifel hilft eine kurze Nachfrage beim Support.

### Was hat sich am 15. September 2026 bei Cloudflare geändert?

Cloudflare hat an diesem Tag die Voreinstellung für werbefinanzierte Websites im eigenen Netzwerk umgestellt: Bots, die Cloudflare als „Training" oder „Agent" einstuft, werden seither standardmäßig blockiert, während Such-Crawler weiterhin standardmäßig erlaubt bleiben. Wer nichts unternommen hat, hat seine Regeln an diesem Tag automatisch geändert bekommen – nicht durch einen Angriff oder Fehler, sondern durch eine neue Voreinstellung des eigenen Sicherheitsdienstleisters.

### Sollte ich KI-Crawlern grundsätzlich Zugriff geben?

Das lässt sich nicht pauschal beantworten und ist auch eine Wertefrage: Ob Ihre Texte als Trainingsmaterial verwendet werden sollen, entscheiden nur Sie. Damit Ihr Betrieb in aktuellen KI-Antworten gefunden wird, ist aber vor allem wichtig, dass die Antwort- und Zitier-Crawler (etwa OAI-SearchBot, PerplexityBot in seiner Antwort-Funktion) Zugriff haben. Ein pauschales „alles sperren" schließt Sie genau von den KI-Antworten aus, in denen Sie mit GEO eigentlich vorkommen wollen.


## Quellen

- [Cloudflare Blog: Your site, your rules – new AI traffic options for all customers (1. Juli 2026)](https://blog.cloudflare.com/content-independence-day-ai-options/)
- [TechnologyChecker.io: We Analyzed robots.txt Across Cloudflare's Network (veröffentlicht 3. April 2026, aktualisiert 3. September 2026)](https://technologychecker.io/blog/robots-txt-ai-crawlers-blocking-report)
- [dev.to (Reese Calder): I checked robots.txt on the top 5,000 sites – 238 of them block ChatGPT citations by accident (8. September 2026, aktualisiert 19. September 2026)](https://dev.to/reesecalder/i-checked-robotstxt-on-the-top-5000-sites-238-of-them-block-chatgpt-citations-by-accident-43id)
- [Search Engine Land: Your managed WordPress might be blocking AI bots and you can't see it (6. Mai 2026)](https://searchengineland.com/managed-wordpress-blocking-ai-bots-476510)

---

© regionalflat.de — Zitieren erwünscht mit Quellenangabe und Link auf https://regionalflat.de/impulse/ki-crawler-robots-txt-gptbot-was-du-blockierst-ohne-es-zu-wissen/
