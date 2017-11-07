# Information Design - Individueel Project - Opdrachten

## Inleiding

Deze repo dient als inleverpunt van de opdrachten voor het individuele project dat deel uitmaakt van het project Information Design. Dit project is deel van de studie Communication & Multimedia Design.

Voor het individuele project moeten de studenten twee opdrachten maken, opdracht A en B.

Opdracht A is een opdracht die alles met code te maken heeft - een datavisualisatie moet in code met behulp van d3 geschreven worden. Deze is te vinden op de [GH-page](https://jensorsel.github.io/Information-Design-Opdrachten/) die bij deze repo hoort.

Opdracht B is een meer conceptuele opdracht. De bedoeling van deze opdracht is dat de student een datavisualisatie met een 'beleving' maakt en daarbij niet gelimiteerd wordt door technische vaardigheden.

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

## Bronnen

### Opdracht A

* [Terugverkoopprijs kWh data](https://www.eia.gov/totalenergy/data/annual/showtext.php?t=ptb0810)
* [Kosten van zonne-energie data](https://upload.wikimedia.org/wikipedia/commons/7/71/Price_history_of_silicon_PV_cells_since_1977.svg)
* [Aantal zonnepanelen data](http://statline.cbs.nl/Statweb/publication/?VW=T&DM=SLNL&PA=82003NED&D1=a&D2=a&D3=a&HD=171106-1412&HDR=T&STB=G1,G2)
* [Stellingen data](https://www.scp.nl/Publicaties/Alle_publicaties/Publicaties_2016/Burgerperspectieven_2016_4)
* [Horizontal Stacked Bar Chart](https://bl.ocks.org/Andrew-Reid/0aedd5f3fb8b099e3e10690bd38bd458)
* [Multi-Series Line Chart](https://bl.ocks.org/mbostock/3884955)

### Opdracht B

## Licenties

Multi-Series Line Chart: Released under the [GNU General Public License](https://opensource.org/licenses/GPL-3.0), version 3.
