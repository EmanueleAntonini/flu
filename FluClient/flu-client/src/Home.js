import React from 'react';
 
const Home = () => {
    return (
       <div>
           <br />
           <br />
           <br />
           <h1>Home Page</h1>
           <p><h3>Welcome to flu</h3></p>
           <p><label>"Flu" offre il servizio di poter visulizzare delle analisi di dati, prelevati dai siti GNews e Twitter, </label>
           <br />
           <label> tramite le rispettive API, riguardanti l'andamento di un determinato utente di Twitter. </label>
           <br />
           <label>L'andamento viene misurato in base alla somma dei dati raccolti.</label></p>
           <p><label>Accedendo dal menù a <b>Influencer</b> possiamo ricercare un determinato influencer inserendo </label>
           <label>nome, cognome e username di Twitter negli appositi campi. Clicchiamo il pulsante <b>"Submit"</b>.</label>
           <label>Verranno restituiti i valori relativi all'influencer, oltre nome, cognome, nome completo e username di Twitter, </label> 
           <label>anche i valori dei <b>parametri di Twitter</b>, ovvero la somma del numero di like, condivisioni, retweet e followers su Twitter.</label>
           <label>Nel campo <b>GNewsScore</b> abbiamo il numero di apparizioni di twitterUsername all'interno degli articolo di vari notiziari.</label>
           <label><b>TwitterScore</b> è una media pesata dei parametri di Twitter, infine <b>FluScore</b> è una media pesata dei parametri di Gnews e di Twitter.</label></p>
           <p><label>Accedendo dal menù a <b>Flu Database</b> e cliccando il pulsante <b>"View Flu_database"</b>, verranno restituiti</label>
           <label>il numero di documenti totale e tutti i documenti presenti all'interno del database di couchDB relativi agli influencer cercati nella sezione Influencer.</label></p>
           <br />
           <br />
           <br />
           <p><label><b>Progetto svolto da:</b></label>
           <br />
           <label><i> Emanuele Antonini</i></label>
           <br />
           <label><i> Giorgia D'Armiento</i></label></p>          
       </div>
    );
} 
export default Home;