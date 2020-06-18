@Library('playbuzz-jenkins-pipeline') _

import groovy.json.JsonSlurperClassic
import com.playbuzz.utils.Slack

 def notifySlack(script, String buildStatus = 'STARTED') {
  buildStatus = buildStatus ?: 'SUCCESS'
  def channels = 'client-deployments'
  
  Slack.sendBuildNotification(script, channels.split(','), buildStatus, script.env.ENVIRONMENT_TYPE)
}


node('spot-linux') {
  try {
    stage('Checkout'){
      checkout scm
      sh "cat package.json | jq .name > pb-service-name"
      sh "git rev-parse --short HEAD > ./git_rev"
    }
    stage('Prebuild'){
      sh "aws s3 presign s3://pb-github/id_rsa --expires-in 300 > ./id_rsa_url"
      sh "aws ecr get-login --no-include-email | bash"
    }
    stage("Build"){
      def service_name = readFile('pb-service-name').trim()
      def commit_hash = readFile('git_rev').trim()
      def id_rsa_url = readFile('id_rsa_url').trim()
      sh "wget '$id_rsa_url' -q -O - > ./ssh_key"
      echo "Running Build Container"
      ansiColor('xterm') {
        sh "docker build . --build-arg ENVIRONMENT_TYPE=$ENVIRONMENT_TYPE -t ${service_name}:${commit_hash}"
      }
    }
    stage('Test'){
      def service_name = readFile('pb-service-name').trim()
      def commit_hash = readFile('git_rev').trim()
      echo "Running Tests"
      ansiColor('xterm') {
        sh "docker run -e ENVIRONMENT_TYPE=$ENVIRONMENT_TYPE -e BRANCH_NAME=$BRANCH_NAME -t ${service_name}:${commit_hash} test"
      }
    }
    stage('Deploy'){
      def service_name = readFile('pb-service-name').trim()
      def commit_hash = readFile('git_rev').trim()      
      echo "Running Deployments"
      ansiColor('xterm') {
        sh "docker run -e ENVIRONMENT_TYPE=$ENVIRONMENT_TYPE -e BRANCH_NAME=$BRANCH_NAME -t ${service_name}:${commit_hash} deploy"
      }
    }

     // //Use this when api deployment is needed
    // stage('Trigger Service Update'){

    //   if (['development', 'staging', 'production'].contains(ENVIRONMENT_TYPE) && REFRESH_SERVER == 'true'){

    //     // set envPrefix
    //     def envPrefix
    //     switch(ENVIRONMENT_TYPE) {
    //       case "development":
    //         envPrefix = 'dev'
    //       break
    //       case "staging":
    //         envPrefix = 'stg'
    //       break
    //       case "production":
    //         envPrefix = 'prd'
    //       break
    //       default:
    //         envPrefix = 'dev'
    //       break
    //     }

    //     build job: "Microservices/embed/deploy-${envPrefix}"

    //   } else {
    //     echo "environment selected was: ${ENVIRONMENT_TYPE}, skipping stage"
    //   }


    // }

    // Use this stage when url purge needed
    // stage('Purge CDN'){
    //   if ( ENVIRONMENT_TYPE == "production") {
    //     withCredentials([string(credentialsId: 'fastly_token', variable: 'TOKEN')]) {
    //       sh """
    //         set +x
    //         curl -XPURGE -H "Fastly-Key: ${TOKEN}" http://somedomain.playbuzz.com > output
    //       """
    //     }
    //   } else {
    //     withCredentials([string(credentialsId: 'fastly_token', variable: 'TOKEN')]) {
    //       sh """
    //         set +x
    //         curl -XPURGE -H "Fastly-Key: ${TOKEN}" http://stg-somedomain.playbuzz.com > output
    //       """
    //     }
    //   }
    // }
  } catch (err) {
    currentBuild.result = 'FAILURE'
    throw(err);
  } finally {
    stage('Notify'){
      notifySlack(this, currentBuild.result)
    }
  }
}


   