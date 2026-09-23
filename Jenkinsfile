pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'mohammadirfan123'
        AWS_REGION = 'us-west-2'
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

        stage('Fetch Secrets') {
            steps {
                script {
                    def secretJson = sh(
                        script: "aws secretsmanager get-secret-value --secret-id ottoman-bank/prod-secrets --query SecretString --output text --region \$AWS_REGION",
                        returnStdout: true
                    ).trim()

                    def secrets = readJSON text: secretJson

                    env.MYSQL_ROOT_PASSWORD = secrets.MYSQL_ROOT_PASSWORD
                    env.DB_PASSWORD = secrets.DB_PASSWORD
                    env.JWT_SECRET = secrets.JWT_SECRET
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
