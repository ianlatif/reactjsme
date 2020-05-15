pipeline {
   agent any
   stages {
        stage('Build') {
            when { branch 'master' }
            agent { docker { image 'node:12.14' } }  
            steps {
            echo 'Building...'
            sh 'yarn install' 
            //echo "Running ${env.BUILD_ID} ${env.BRANCH_NAME} on ${env.NODE_NAME} and JOB ${env.JOB_NAME}"
            }
        }

        stage('Develop Build') {
            when { branch 'develop' }
            steps {
                sh 'docker build -t docker.sysadminroot.com/reactjsme -f Dockerfile .'
                sh 'docker images' 
            }
        }

        // // menjalankan golang dari server local jenkins
        // stage('Deploy') { 
        //     when { branch 'docker' }
        //     tools { go 'golang' }
        //     steps {
        //         withEnv(["PATH+EXTRA=${HOME}/go/bin"]){
        //         echo 'Deploying... didalam staging'
        //         sh 'go version'
        //         }
        //     }
        // }
        
        // //runing golang didalam docker 
        // stage('docker') {
        //     when { branch 'docker' }
        //     agent { docker { image 'golang:1.12-alpine' } }
        //     steps {
        //         sh 'go version'
        //     }
        // }
    }
}