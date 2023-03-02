pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    environment { 
        CI = 'false'
    }
     stages {
        stage('Build') {
            steps {
                echo 'Building...'
                configFileProvider([configFile(fileId: "2cba4e18-1c87-4884-b354-66ad73c5d3a1", targetLocation: '.env', variable: 'ENV_CONFIG')]) {
                    load "env.groovy";
                    sh 'npm install'
                    sh 'npm run build'
                }
                
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
                sh ''' 
                    echo "checking for container react-ce installation and status"
                    if [ $( sudo docker ps -a | grep react-ce | wc -l ) -gt 0 ] 
                    then   
                        sudo docker stop react-ce
                        sudo docker rm react-ce
                    fi
                '''
                echo 'Build dockerfile...'
                sh 'sudo docker buildx build . -f Dockerfile --tag react-ce'
                echo 'starting docker container react-ce'
                sh 'sudo docker run --env-file .env --name react-ce -d --publish 3000:3000 react-ce'
            }
        }
    }
}
