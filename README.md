Hello, just wanted to give you a few tips regarding my project. The codding challange has been done using react, javascript, css, and html for the frontend part and node, express posgres for the backend. 

In order to run the application please do the following steps: 
  1) clone the app
  2) Open 3 terminals, one for Fe, one for Be, and the last one for docker.
      - for Fe run comands: cd montelux-frontend, then npm run start
      - for docker (assuming you have doker installed): cd backend, then docker compose up
      - for be : cd backend, npm run start 
  3) the link to open the app is: http://localhost:3001
     
Ok, now you should be good to go! 

I have created a dump file in docker that is fired up when docker compose up, which will create 3 tables, users, event, user_event and populates them with some initial datas.

When launching the app you can sign up with a new user or login immediately with the email a@com, password: 1234. After you logged you will be navigated to events where you can see all the evens listed along with 2 search bars (title, date range and location). On the top right corner you can see 2 buttons, Logut and Add Event from where you can add events.
On the event card you cand see the information regarding the specifc event, a x red button which deletes the event and a join + button which allows you to join the event, adding you to the participants list. If you click on the Event card a modal opens and you can update the event.

- task accomplished:
    - login with JWT
    - implement form to create/update event
    - CRUD for events
    - authentication, only users which are logged in can use the app (authenticated requests can do CRUD)
    - retrieve list of events basted on title
    - retrieve list of events based on location and date range
    - Databes create tables: event, users, user_event
    - Bonus: added validation in forms (Add/Update) for date to not be in the past.
