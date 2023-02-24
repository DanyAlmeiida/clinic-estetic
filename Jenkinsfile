pipeline {
    agent any
    tools {
        nodejs '19.7.0'
    }
    environment { 
        CI = 'false'
    }
     stages {
        stage('Build') {
            steps {
                echo 'Building...'
                configFileProvider([configFile(fileId: "945663d9-c945-47db-a996-5d9ee6ce3401", targetLocation: 'env.groovy', variable: 'ENV_CONFIG')]) {
                    load "env.groovy";
                }
                sh 'npm install'
                sh 'npm run build'
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
                sh 'sudo docker run --name react-ce -d --publish 3000:3000 react-ce'
            }
        }
    }
}
