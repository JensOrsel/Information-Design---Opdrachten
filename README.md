# Information Design - Individueel Project - Opdrachten

## Inleiding

Deze repo dient als inleverpunt van de opdrachten voor het individuele project dat deel uitmaakt van het project Information Design. Dit project is deel van de studie Communication & Multimedia Design.

Voor het individuele project moeten de studenten twee opdrachten maken, opdracht A en B.

Opdracht A is een opdracht die alles met code te maken heeft - een datavisualisatie moet in code met behulp van d3 geschreven worden. Deze is te vinden op de [GH-page](https://jensorsel.github.io/Information-Design-Opdrachten/) die bij deze repo hoort.

Opdracht B is een meer conceptuele opdracht. De bedoeling van deze opdracht is dat de student een datavisualisatie met een 'beleving' maakt en daarbij niet gelimiteerd wordt door technische vaardigheden. Het prototype is [hier](https://marvelapp.com/56e790d/) te vinden (**maak het prototype fullscreen met F11!**)

## Opdracht A

### Ideeën

De ideeën waarmee ik uiteindelijk aan de slag ging kwamen voort uit werkbladen die wij voor het vak 'Free Space' moesten maken. Hierbij moesten we visualisatievormen bedenken voor de [research case](https://www.gitbook.com/book/jensorsel/rfd/details) die in het vak 'Research for Data' gemaakt is. 

Mijn eerste idee was om zonnestralen als linechart te gebruiken. Hierbij leken kosten en baten mij het interessantst om te tonen, ik ging ervanuit dat dit toch de uiteindelijke reden is dat mensen wel of niet op zonne-energie overgaan. Het idee van de zonnestralen heb ik teruggebracht tot een 'gewone' linechart, aangezien dat idee zich meer voor opdracht B leende. 

Mijn tweede idee was om enquête-data in een zonnepaneel te laten zien. Dit stelt eigenlijk gewoon een pie chart voor, maar dan stelt één cel op een zonnepaneel één procent voor. Nogmaals, dit leek meer geschikt voor opdracht B. Daarom was dit idee eerst teruggebracht naar een pie chart. Omdat dit technisch gezien te moeilijk ging worden, is dit uiteindelijk een horizontale bar chart geworden.

### Data 

Data opschonen is in deze opdracht niet van pas gekomen. Ik heb alles zelf in csv bestanden gezet. De reden hiervoor, is dat het simpelweg niet nodig was. Daarnaast was het in het geval van mijn [eerste bron](https://upload.wikimedia.org/wikipedia/commons/7/71/Price_history_of_silicon_PV_cells_since_1977.svg) ook niet mogelijk, omdat ik alleen de grafiek had, niet de data zelf. Daar was een klein beetje rekenwerk voor nodig - een simpel Excel sommetje werkte goed. $76 was mijn 100 procent. Omdat de grafiek een SVG is kon ik met behulp van de developer tools de exacte hoogte van elke bar zien, door deze hoogten te gebruiken kon ik de prijzen berekenen. Deze heb ik vervolgens met de hand in het csv bestand gezet.

De [tweede](https://www.eia.gov/totalenergy/data/annual/showtext.php?t=ptb0810) en [derde](http://statline.cbs.nl/Statweb/publication/?VW=T&DM=SLNL&PA=82003NED&D1=a&D2=a&D3=a&HD=171106-1412&HDR=T&STB=G1,G2) bron gaven verder geen problemen. Alleen moest ik in mijn derde bron even de waarden door 1000 delen.

Deze bronnen zitten samen in één csv bestand, de [vierde bron (pagina 42)](https://www.scp.nl/Publicaties/Alle_publicaties/Publicaties_2016/Burgerperspectieven_2016_4) zit in een eigen csv bestand. Ik heb deze data moeten aanpassen. Omdat de percentages afgerond zijn, komt de som van deze percentages soms op 99 of 101 uit. Dit werkte niet met mijn grafiek.  

### De werking van de code

De code is in twee stukken opgedeeld. Eerst worden de variabelen voor de eerste svg aangemaakt, dan wordt de bijbehorende data ingeladen, vervolgens wordt de visualisatie gemaakt en dan komt de tweede svg waarvoor hetzelfde gedaan wordt. Dit is niet de optimale wijze, maar wel een overzichtelijke wijze.

De eerste visualisatie is op [dit voorbeeld](https://bl.ocks.org/mbostock/3884955) gebaseerd.
De tweede visualisatie is op [dit voorbeeld](https://bl.ocks.org/Andrew-Reid/0aedd5f3fb8b099e3e10690bd38bd458) gebaseerd.

Op deze voorbeelden zijn voornamelijk visuele veranderingen gemaakt. Bijvoorbeeld de ruimte tussen de bars, de kleuren die gebruikt worden, positie van labels, aantal ticks, gebruik van percentages i.p.v. hoeveelheden, veranderingen in hoogte/breedte/margin van de svg's en ga zo maar door. Natuurlijk moest er daarna gezorgd worden dat beide svg's op dezelfde pagina kunnen werken.

Mijn voornaamste problemen zaten in het veranderen van de labels in de bar chart. Deze wilden maar niet bewegen. Ik had deze graag willen laten 'wrappen', maar dat is mij uiteindelijk niet gelukt. Ik heb ze daarom duidelijk mogelijk proberen te laten zien, door een redelijk groot lettertype te gebruiken en de tekst dikgedrukt te maken.

## Opdracht B

### Link

Opdracht B is [hier](https://marvelapp.com/56e790d/) te vinden.

### Het idee

Tijdens één van mijn coachingmomenten met Jan Jaap kwam dit naar voren. Ik stelde voor om één grafiek als hoofdnavigatie te gebruiken, waarbinnen vervolgens allemaal andere grafieken te vinden zouden zijn. Echter was dit geen echte beleving. Toen werd mij het idee gepresenteerd van een tijdlijn, die zowel op een kronkelende/ronde manier als rechte manier te zien is. Op de as komen 'mijlpalen' te staan, gebeurtenissen die de grafieken die bij de tijdlijn horen (kunnen) beïnvloeden. Dit is het idee waarmee ik ben gaan werken. Het eerste idee was een soort van oneindige 'S', die steeds verder bleef kronkelen, maar het leek mij interessant om met een cirkel verder te gaan. De cirkel doet zowel aan de aarde denken, waar het veel over gaat in de energiediscussie, maar ook aan een klok, wat het besef van tijd duidelijker maakt.

De laatste keuze was om achtergronden te gebruiken die bij de gebeurtenissen horen - terwijl je door de tijd heen gaat, verandert de achtergrond mee, dit zorgt ervoor dat het echt voelt alsof je door de tijd aan het reizen bent.

### Hoe het prototype werkt / zou moeten werken

#### Werkt

Door middel van de pijl beweeg je steeds naar de volgende mijlpaal.

De bedoeling van de checkboxes is het aan- en uitzetten van elke lijn. **Dit kan op de eerste cirkelgrafiek, 1800**.
Ik heb dit voor het eerste scherm gedaan om de gewenste werking te laten zien. Bij de rest van de schermen kunnen alleen alle lijnen aan of uit.

De bedoeling van het prototype in het algemeen is om de gebeurtenissen vergelijken met stijgingen/dalingen in de verschillende grafieken. Daarnaast kan het verschil tussen de cirkelgrafiek en de lijngrafiek best indrukwekkend zijn, omdat je dan ineens een veel beter beeld krijgt van hoe groot de stijging in iedere grafiek is.

#### Zou moeten werken

Het grootste onderdeel van het prototype dat zou moeten werken, maar nog niet werkt, is dat elke lijn per scherm aan en uit gezet moet kunnen worden. Dit zou het aantal schermen dat ik heb echter bijna vertienvoudigen, dus ik besloot dat dit de tijd niet waard was.

Een grote ergenis is de wijze waarop de lijnen (in de cirkelgrafiek) getekend zijn. Ik ben ervan bewust dat deze er enorm amateuristisch en infantiel uit zien. Ik heb geen manier kunnen vinden waarop de grafieken die ik heb gebruikt om een cirkel gevormd kunnen worden. Ik heb deze dus met de hand getekend. Dat zou ik anders gedaan hebben.

Iets wat ik gedaan zou hebben als ik de tijd nog had, was om het schakelen tussen de cirkel- en lijngrafieken écht te laten werken. Bijvoorbeeld, dat terwijl je op de cirkelgrafiek van 2014 staat en dan op de lijngrafiek drukt, dat je dan ook echt de lijngrafiek van 2014 ziet en niet weer helemaal naar het begin gaat.

Wat ik zou willen als ik het zou kunnen maken, is een mooie transitie van de cirkel- naar de lijngrafiek. Dat de lijn van de cirkel platgelegd wordt en vervolgens netjes werkt als lijngrafiek.

### Gebruikte data

De data die ik heb gebruikt, en de data die ik heb getoond, verschillen een klein beetje. Soms was er maar data tot 2014, soms begon het net na 1800, dus dat heb ik voor mijn gemak doorgetrokken. Daarnaast zijn de lijnen in de cirkelgrafiek natuurlijk niet 100% kloppend, aangezien ik deze met de hand heb getekend.

Ik heb gekozen voor uitstoot, energieconsumptie en temperatuur als data om te tonen. Ik denk dat dit de meest interessante getallen zijn voor de gemiddelde gebruiker, daarnaast geven ze ook gelijk een dramatische realiteit mee omdat ze allemaal zo rap aan het stijgen zijn.

## Bronnen

### Opdracht A

* [Terugverkoopprijs kWh data](https://www.eia.gov/totalenergy/data/annual/showtext.php?t=ptb0810)
* [Kosten van zonne-energie data](https://upload.wikimedia.org/wikipedia/commons/7/71/Price_history_of_silicon_PV_cells_since_1977.svg)
* [Aantal zonnepanelen data](http://statline.cbs.nl/Statweb/publication/?VW=T&DM=SLNL&PA=82003NED&D1=a&D2=a&D3=a&HD=171106-1412&HDR=T&STB=G1,G2)
* [Stellingen data](https://www.scp.nl/Publicaties/Alle_publicaties/Publicaties_2016/Burgerperspectieven_2016_4)
* [Horizontal Stacked Bar Chart](https://bl.ocks.org/Andrew-Reid/0aedd5f3fb8b099e3e10690bd38bd458)
* [Multi-Series Line Chart](https://bl.ocks.org/mbostock/3884955)

### Opdracht B

* [Geschiedenis van energie](http://www.ecology.com/2011/09/03/the-history-of-energy-use/)
* [Wikipedia - Windenergie](https://nl.wikipedia.org/wiki/Windenergie)
* [Gemiddelde globale temperatuur](http://assets.climatecentral.org/images/uploads/gallery/4_21_15_EarthDay_GlobalTempRecord.png)
* [Energieconsumptie](https://fractionalflow.files.wordpress.com/2014/10/fig-1-world-total-energy-consumption-1800-to-2013.png)
* [Uitstoot](https://ourworldindata.org/wp-content/uploads/2017/04/Global-CO2-emissions-by-region-since-1751.png)

## Licenties

Multi-Series Line Chart: Released under the [GNU General Public License](https://opensource.org/licenses/GPL-3.0), version 3.
