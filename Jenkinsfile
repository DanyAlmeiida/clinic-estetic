pipeline {
    agent {
        docker {
            image 'node'
            args '-p 3100:3100 -v $(which docker):/usr/bin/docker'
        }
    }
    environment { 
        CI = 'true'
    }
     stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'docker stop react-ce'
                sh 'docker rm react-ce'
                sh 'docker buildx build . -f Dockerfile --tag react-ce'
                sh 'docker run -d --publish 3000:3000 react-ce'
            }
        }
    }
}
