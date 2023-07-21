FROM node:16.20.1
# FROM public.ecr.aws/lambda/nodejs:16.2023.06.28.12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package.json ./
COPY serverless.yml ./
COPY tsconfig.json ./
COPY src ./src
COPY config ./config
COPY tests ./tests

RUN node -v && rm -rf node_modules && rm -rf package-lock.json && rm -rf .build && npm install --ignore-scripts

# COPY . .

EXPOSE 3000

CMD ["sls", "offline", "--host", "0.0.0.0"]
