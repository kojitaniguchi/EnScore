FROM node:9.11.1-alpine
WORKDIR /root
ENV NODE_ENV production
ENV PORT 3000

RUN set -x \
  && apk upgrade --no-cache \
  && apk --update add tzdata \
  && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
  && apk del tzdata \
  && rm -rf /var/cache/apk/*

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

ADD ./ .

RUN npm install

EXPOSE 3000

# Run it
ENTRYPOINT ["node", "server.js"]