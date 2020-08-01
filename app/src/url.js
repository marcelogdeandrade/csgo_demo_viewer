const PROD_URL = "http://ec2-52-67-97-43.sa-east-1.compute.amazonaws.com:8080"
const LOCAL_URL = "http://back.marcelao.com.br"

export const fetchUrl = () => {
    if (process.env.NODE_ENV !== 'production') {
        return LOCAL_URL
    } else {
        return PROD_URL
    }
}
