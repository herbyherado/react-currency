# Stage 1
FROM node:8-alpine as init-build

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY ./app ./
RUN yarn && yarn build

# Stage 2
FROM nginx:1.12-alpine
COPY --from=init-build /usr/src/app/build /usr/share/nginx/html

# Expose port of service
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]