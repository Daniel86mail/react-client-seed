FROM 475376316304.dkr.ecr.us-east-1.amazonaws.com/playbuzz-node-microservices

ENV PLAYBUZZ_FOLDER=/opt/playbuzz/

ARG ENVIRONMENT_TYPE=production
ARG BRANCH_NAME

RUN mkdir -p $PLAYBUZZ_FOLDER

ADD . $PLAYBUZZ_FOLDER

WORKDIR $PLAYBUZZ_FOLDER

RUN apk add --update --no-cache bash \
                                make \
                                automake \
                                autoconf \
                                gcc \
                                g++ \
                                python && \
    eval "$(ssh-agent -s)" && \
    chmod 700 ./ssh_key && \
    ssh-add ./ssh_key && \
    ssh -o StrictHostKeyChecking=no git@github.com || true && \
    rm -rf node_modules && \
    npm install && \
    npm run lint && \
    rm ./ssh_key && \
    rm -rf ~/.ssh/*

RUN /bin/bash ./scripts/jenkins.sh build

ENTRYPOINT [ "./scripts/jenkins.sh" ]

CMD ["/bin/bash"]