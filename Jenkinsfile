#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node'
            args '-p 3000:3000 -v $(which docker):/usr/bin/docker '
        }
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
                sh 'docker build -t react-clinic-estetic -v $(which docker):/usr/bin/docker'
            }
        }
    }
}
