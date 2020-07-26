const PROD_URL = "http://ec2-52-67-97-43.sa-east-1.compute.amazonaws.com:8080"
const LOCAL_URL = "http://localhost:8080"

export const fetchUrl = () => {
    if (process.env.NODE_ENV !== 'production') {
        return LOCAL_URL
    } else {
        return PROD_URL
    }
}
