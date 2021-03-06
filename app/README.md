This project was bootstrapped with an `ejected` [Create React App](https://github.com/facebook/create-react-app) and typed with `typescript`.

## Libraries

| Library | Function         | Links                             |
| ------- | ---------------- | --------------------------------- |
| React   | UI Library       | https://github.com/facebook/react |
| Mobx    | State Management | https://github.com/mobxjs/mobx    |
| Jest    | Testing          | https://github.com/facebook/jest  |

## Docker

#### Creating the container

Basics on creating docker and other useful commands

```
# on directory with existing dockerfile, build image with tag docker-currency
$ docker build -t docker-currency .

# see list of build images
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
docker-currency      latest              2cbc9e9291ef        8 hours ago         16.9MB
node                8-alpine            e8ae960eaa9e        5 days ago          66.3MB
nginx               1.12-alpine         24ed1c575f81        13 months ago       15.5MB

# run command in a new container with mapped port 8000
$ docker run -p 8000:80 docker-currency

# list containers
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
385d9cdd018a        docker-currency      "nginx -g 'daemon of…"   30 minutes ago      Up 30 minutes       0.0.0.0:5000->80/tcp   amazing_murdock

# stop container
$ docker stop amazing_murdock
```

#### Running the container

Assuming that `docker-machine` has previously been set up with virtualbox and started,
Run container through `docker-machine` with following guides:

```
# see list of docker virtual machine on the local box
$ docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER     ERRORS
default   *        virtualbox   Running   tcp://192.168.99.101:2376           v18.09.1

# see the virtual machine's IP
$ docker-machine ip
192.168.99.101

# see status of docker-machine
$ docker-machine default
Running

# run a command on the machine using 'ssh'
# the commanmd runs image 'docker-currency' with mapped port 8000
$ docker-machine ssh default "docker run -p 8000:80 docker-currency"

# check/make a request to the app running inside the container
$ curl 192.168.99.101:8000
<!-- response here -->

# access through http://localhost:8000
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
