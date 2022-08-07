# Checklist Digitale

Checklist Digitale è una Web Application realizzata in Javascript che consente di gestire la compilazione e l'archiviazione delle checklist delle ambulanze.

![Home](https://raw.githubusercontent.com/RiccardoRiggi/checklist-digitale-fe/main/screenshot/homepage.png)

---

## Database
Il progetto si appoggia ad un database [MySql]. Nel [Backend] sono presenti i model che compongono la base dati.

---

## Backend
Il [backend] è realizzato utilizzando [Node.Js], [Express.Js] e [Sequelize]. L'autenticazione è gestita mediante token JWT, è inoltre presente un file YAML contenente tutti gli endpoint.

##### Installazione e avvio
```sh
$ cd checklist-digitale-be
$ npm install
$ npm start
```

## Frontend 

Il frontend è realizzato in [React], basato su [Bootstrap] 4 e tema [SBAdmin] 2. Dalla sidebar di sinistra è possibile selezionare una delle voci di menu per consultare le relative pagine. 

##### Installazione e avvio
```sh
$ cd checklist-digitale-fe
$ npm install
$ npm start
```
### Autenticazione e logging
![Schermata login](https://raw.githubusercontent.com/RiccardoRiggi/checklist-digitale-fe/main/screenshot/loginPage.png)
L'utente può accedere all'applicazione mediante email e password. Ogni login ed operazione viene registrata su opportune tavole di log.


### Utenti
![Schermata lista utenti](https://raw.githubusercontent.com/RiccardoRiggi/checklist-digitale-fe/main/screenshot/listaUtentiPage.png)
L'applicazione offre una semplice gestione degli utenti. Bisognerà inserire nome, cognome, data di nascita, email, password e ruolo. Il ruolo utente consente solamente di creare, compilare e visionare le checklist. L'utente amministrativo non dispone di alcuna limitazione. Ogni utente può essere modificato ed eliminato.

### Veicoli
![Schermata lista veicoli](https://raw.githubusercontent.com/RiccardoRiggi/checklist-digitale-fe/main/screenshot/listaVeicoliPage.png)
Prima di configurare delle checklist è necessario inserire un veicolo dandogli un nome, un tipo, una selettiva. Ogni veicolo può essere modificato ed eliminato

### Template
![Schermata lista template](https://raw.githubusercontent.com/RiccardoRiggi/checklist-digitale-fe/main/screenshot/templateChecklistPage.png)
Per ogni mezzo possono essere inseriti più template di checklist, il nome renderà facile l'identificazione. Per ogni template è possibile configurare le righe assegnando nome, descrizione e quantità

### Checklit
![Schermata checklist](https://raw.githubusercontent.com/RiccardoRiggi/checklist-digitale-fe/main/screenshot/checklistPage.png)
Dato il mezzo è possibile visualizzare l'elenco delle checklist compilate e salvate, quelle ancora in fase di compilazione e crearne di nuove

![Schermata checklist](https://raw.githubusercontent.com/RiccardoRiggi/checklist-digitale-fe/main/screenshot/checklistDettaglioPage.png)
Per ogni checklist e per ogni mezzo è possibile inserire delle note e confermare le informazioni. Dopo averle confermate non sarà posisbile tornare indietro
---

## Bom / Diba

##### Database e recupero dei dati
* [MySQL]

##### Backend
* [Node.Js]
* [Express.Js]
* [Sequelize]

##### Frontend
* [React] 18
* [SBAdmin] 2
* [Bootstrap] 4
* [FontAwesome] 5

---

## Licenza

Il codice da me scritto viene rilasciato con licenza [MIT]. Framework, temi e librerie di terze parti mantengono le loro relative licenze. 

[MySQL]: <https://www.mysql.com/it/>
[repository ufficiale Covid-19]: <https://github.com/pcm-dpc/COVID-19>
[Node.Js]: <https://nodejs.org/it/>
[Express.Js]: <https://expressjs.com/it/>
[React]: <https://it.reactjs.org/>
[AmCharts]: <https://www.amcharts.com/>
[SBAdmin]: <https://startbootstrap.com/themes/sb-admin-2/>
[Bootstrap]: <https://getbootstrap.com/>
[FontAwesome]: <https://fontawesome.com/>
[CC-BY-4.0]: <https://github.com/pcm-dpc/COVID-19/blob/master/LICENSE>
[MIT]: <https://github.com/RiccardoRiggi/dashboard-covid-italia/blob/master/LICENSE>
[Backend]: <https://github.com/RiccardoRiggi/checklist-digitale-be>