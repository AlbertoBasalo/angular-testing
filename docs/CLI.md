# Angular Laboratory CLI journal

```bash
# generate a new project
npx @angular/cli new angulab  --routing=true --style=css
# add eslint with prettier
npm i -D eslint
# plugin and parser for typescript
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
# prettier interaction
npm i -D eslint-config-prettier eslint-plugin-prettier
# Add a bit of style
npm install @picocss/pico
# angular.json : "./node_modules/@picocss/pico/css/pico.min.css",


# add layout components
ng g m components/header
ng g c components/header --export=true
ng g m components/footer
ng g c components/footer --export=true

# add services
ng g s services/api

# install a development server with a fake api
npm i -D json-server json-server-auth
npm run api

# add models
ng g i models/agency
ng g i models/booking
ng g i models/api
ng g i models/app
ng g i models/credentials
ng g i models/guard
ng g i models/trip
ng g i models/user

# add base and api store
ng g class services/base --type=store
ng g class services/api --type=store # make it injectable

# add home page
ng g m routes/home --route=home -m=app
ng g s routes/home
ng g c routes/home/trips --type=list --selector=app-trips-list --flat=true

# add shared components
ng g m components/working
ng g c components/working --export=true
ng g m components/error
ng g c components/error --export=true
ng g m components/link
ng g c components/link --export=true

# add booking page
ng g m routes/book --route=book/:tripId -m=app
ng g s routes/book
ng g c routes/book --type=form --selector=app-book-form --flat=true
```
