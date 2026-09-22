pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'mohammadirfan123'
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/MohammadIrfan03/The-Great-Ottoman-Bank.git'
            }
        }

        stage('Build Images') {
            steps {
                script {
                    def services = [
                        'eureka-service', 'config-server', 'auth-service',
                        'account-service', 'transaction-service',
                        'notification-service', 'audit-service',
                        'api-gateway', 'frontend'
                    ]

                    for (svc in services) {
                        sh "docker build -t \$DOCKERHUB_USERNAME/ottoman-${svc}:\$BUILD_NUMBER -t \$DOCKERHUB_USERNAME/ottoman-${svc}:latest ./${svc}"
                    }
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    def services = [
                        'eureka-service', 'config-server', 'auth-service',
                        'account-service', 'transaction-service',
                        'notification-service', 'audit-service',
                        'api-gateway', 'frontend'
                    ]

                    withDockerRegistry(credentialsId: 'docker-cred') {
                        for (svc in services) {
                            sh "docker push \$DOCKERHUB_USERNAME/ottoman-${svc}:\$BUILD_NUMBER"
                            sh "docker push \$DOCKERHUB_USERNAME/ottoman-${svc}:latest"
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose pull'
                sh 'docker compose up -d'
            }
        }
    }
}
