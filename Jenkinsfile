pipeline {
  agent any
  tools {
    nodejs "NodeJs12.22.9"
  }
  stages {
    stage('Build') {
      steps {
          echo "No Build"
       }

    }
    stage('Test') {
      steps {
        echo "No Tests"
      }
    }
    stage('Deploy') {
      steps {
        script {
          if (env.BRANCH_NAME == 'master') {
            sh '/usr/local/bin/docker-compose -f docker-compose.yml up -d --build'
          } else if (env.BRANCH_NAME == 'refactor-gurkan') {
            sh '/usr/local/bin/docker-compose -f docker-compose-vnext.yml up -d --build'
          } else if (env.BRANCH_NAME == 'demo-master') {
            sh '/usr/local/bin/docker-compose -f docker-compose-demo.yml up -d --build'
          }
        }
      }
    }
  }
}
