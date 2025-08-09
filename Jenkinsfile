pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "your-dockerhub-username/jenkins-k8s-demo"
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub-credentials' 
        KUBECONFIG_CREDENTIALS_ID = 'kubeconfig'           
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/KiKSmArT/jenkins-k8s-demo'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKERHUB_CREDENTIALS_ID) {
                        docker.image(DOCKER_IMAGE).push('latest')
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: KUBECONFIG_CREDENTIALS_ID]) {
                    sh 'kubectl apply -f k8s/deployment.yaml'
                    sh 'kubectl apply -f k8s/service.yaml'
                    sh 'kubectl apply -f k8s/ingress.yaml'
                }
            }
        }
    }
}
