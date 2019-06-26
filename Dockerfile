FROM node:11-alpine

RUN apk add --no-cache \ 
    jq \ 
    curl \
    git \
    openssh-client \
    rsync

COPY src/ /srv
COPY run.sh /srv/
RUN chmod 755 /srv/run.sh

# Cache npm install in the container
# Node package versions for this site won't change frequently during
# site development
RUN cd /srv/src/app && npm install

# Install Hugo
# Ref: https://hub.docker.com/r/jguyomard/hugo-builder/dockerfile
ENV VERSION 0.55.6
RUN mkdir -p /usr/local/src \
    && cd /usr/local/src \

    && curl -L https://github.com/gohugoio/hugo/releases/download/v${VERSION}/hugo_${VERSION}_linux-64bit.tar.gz | tar -xz \
    && mv hugo /usr/local/bin/hugo \

    && curl -L https://bin.equinox.io/c/dhgbqpS8Bvy/minify-stable-linux-amd64.tgz | tar -xz \
    && mv minify /usr/local/bin/ \

    && addgroup -Sg 1000 hugo \
    && adduser -SG hugo -u 1000 -h /src hugo

WORKDIR /srv/

EXPOSE 1313

# run.sh accepts arguments to build, test, and release the site
ENTRYPOINT ["run.sh"]
