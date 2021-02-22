# Shyft Client
A bike sharing marketplace.
![Shyft Home Page Screenshot](https://i.imgur.com/NV0x5ph.png "Shyft Home Page Screenshot")

### Links
- [Backend Repository](https://github.com/pvallerie/shyft-api)
- [Deployed API](https://git.heroku.com/shyft-api.git)
- [Deployed Frontend](pvallerie.github.io/shyft-client/)

### Technologies Used
- JavaScript/React.js
- Axios
- React Bootstrap
- CSS
- HTML/JSX

### Future of Shyft

### Planning Process
The concept of consumers sharing assets like cars ([Turo](https://turo.com/ "Turo")) and even their own homes ([AirBnb](https://www.airbnb.com/ "AirBnb") and [Vrbo](https://www.vrbo.com/ "Vrbo")) has become extremely popular in the past 10 or so years. When visiting a new place, it's not always easy to bring your own bike with you or find a shop that rents them. Shyft is the answer to that need!

After drumming up the high level concept, my first step was listing out the user stories for the app:

auth:
- as a user I want to be able create a new account, so I can use the app
- as a user I want to be able to sign in, so I can access my account
- as a user I want to be able to sing out, so no one else can access my account from my computer
- as a user I want to be able to change my password, so I can keep my account private if my password is leaked

bikes:
- as a user I want to be able to create a bike, so other users can rent it
- as a user I want to be able to see all bikes available for rent, so I can rent one
- as a user I want to be able to see all bikes I have available for rent, so I can update/remove them
- as a user I want to be able to update bikes I have created, so I can keep their information up to date
- as a user I want to be able to delete bikes I have created, so I can remove ones that are no longer available for rent

loans:
- as a user I want to be able to rent a bike, so I can ride it when I'm visiting a new location
- as a user I want to be able to see all loans I have
- as a user I want to be able to see all loans I have, so I can know when to return them or see ones I liked in the past
- as a user I want to be able to see all loans of my bikes I have outstanding, so I can know when they will be available again for rent
- as a user I want to be able to delete my loans (of other peoples' bikes, or of my outstanding bikes), so I can cancel the loan

Once my user stories were thoroughly listed out, I was able to put together a couple wireframes and an ERD:

Home Page
![Shyft Home Page Wireframe](https://i.imgur.com/gSjQBAv.jpg?1 "Shyft Home Page Wireframe")

ShowBike Page
![Shyft ShowBike Page Wireframe](https://i.imgur.com/Dz5tur4.jpg?2 "Shyft ShowBike Page Wireframe")

ERD
![Shyft ERD](https://i.imgur.com/wIHSf3F.jpg?1 "Shyft ERD")

Next, I set out to create a [checklist](https://docs.google.com/spreadsheets/d/1oROvWQjtwXfSTdwvBMJct5d7TljocRhTG15yfotHnDo/edit?usp=sharing "checklist") of what needs to be done to put together the minimum viable product for Shyft. Once the checklist seemed complete, I got started by setting up the backend and frontend repos with the file structure I thought would best fit each project.

Any time I ran into a problem I couldn't solve on the spot, I'd follow this process to solve:
1. console.log or print the data you're working with
2. compare current code to other related components if they exist
3. Google the error message with the language/framework I'm working with
4. check the documentation for the language/framework/technology I'm using for answers
5. take a 5-10 minute break
5. ask a friend if I can walk them through the problem to see if that will tease out an answer in my own brain, or maybe that friend might even have something to contribute
