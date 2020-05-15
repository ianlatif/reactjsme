pipeline {
   agent any
   stages {
        stage('Build') {
            when { branch 'master' }
            agent { docker { image 'node:12.14' } }  
            steps {
                echo 'Building...'
                // deleteDir() untuk delete cache
                sh 'yarn install' 
                sh 'yarn test'
            }
        }

        // stage('Test') {
        //     when { branch 'master' }
        //     agent { docker { image 'node:12.14' } }
        //     steps {
        //         sh 'yarn test'
        //     }
        // }

        stage('Build_Image') {
            when { branch 'master' }
            steps {
                sh 'docker build -t docker.sysadminroot.com/reactjsme -f Dockerfile .'
                sh 'docker images' 
            }
        }
    }
}