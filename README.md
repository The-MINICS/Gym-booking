# Gym-booking
```Gym's equipment Booking System (The MINICS-Gym Website)```

<hr/>

### รายชื่อผู้รับผิดชอบ

🧘🏻 ``B6321659 วงศธร พยุงสกุล``

🌞 ``B6331894 ชลธิชา วาทโยธา``

<hr/>

&ensp;We used *Typescript* and *Golang* as the main languages 
and some tricky layout fundamentals for the technologies
So, We used:

   * Golang for Backend Language
   * TypeScript for Frontend Language
   * React for FrameWork
   * Vite for Starter Pack
   * Framer Motion for Animations
   * Tailwind CSS and MUI Material for Styling
   * Tailwind Heroicons and Mui Material icons for Icons
   * Pixels Website for Background Images and Graphic page
   * Flaticon Website for vector icons and stickers

<hr/>

***Needed installations for backend running developer***
   1.  _to install Golang, VS code, Node.js and Git_
   2.  _mkdir Backend_
   3.  go mod init github.com/chonticha1844/Gym-booking
   4.  go get -u github.com/gin-gonic/gin
   5.  go get -u gorm.io/gorm
   6.  go get -u gorm.io/driver/sqlite
   7.  go mod tidy

***Additional installations for frontend running developer***
   1.  _npm create vite@latest (to do along with their steps)_
   2.  _cd Frontend(Your Project)_
   3.  npm install
   4.  npm i framer-motion react-anchor-link-smooth-scroll@1.0.12 @heroicons/react
   5.  npm i -D @types/react-anchor-link-smooth-scroll@1.0.2 @types/node
   6.  npm i react-feather
   7.  npm install --save react-router-dom@6.x
   8.  npm install -g npm
   9.  npm install @mui/material @emotion/react @emotion/styled
   10. npm install @mui/material @mui/styled-engine-sc styled-components
   11. npm install @mui/x-date-pickers
   12. npm install dayjs --save

***Run Dev***
+ **Backend:**  -> go build -o main.exe main.go ***and then*** ./main.exe ***,or*** go run main.go
+ **Frontend:** -> npm run dev
